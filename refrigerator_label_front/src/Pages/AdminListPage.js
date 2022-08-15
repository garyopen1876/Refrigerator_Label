import * as React from "react";
import { Typography, Box, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Bar from "../Components/NavBar";
import Admins from "../Components/AdminTable";
import { useNavigate } from "react-router-dom";
import axios from "../Axios.config.js";
import { TokenContext } from "../Routers.js";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useTranslation } from "react-i18next";

const theme = createTheme({
  palette: {
    white: {
      main: "rgb(255,255,255)",
    },
    Button: {
      main: "#363F4E",
    },
  },
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AdminListPage() {
  const navigate = useNavigate();
  //token
  const { setTokenContext } = React.useContext(TokenContext);

  // admin_data
  const [adminData, setAdminData] = React.useState([]);

  //snackbar
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const [AlertText, setAlertText] = React.useState("");
  const [Severity, setSeverity] = React.useState("");
  //close Alert
  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const { vertical, horizontal, open } = state;

  const loadingAdmin = React.useCallback(() => {
    const loadAdmin = async () => {
      await axios
        .get("api/admin", {
          headers: { token: localStorage.getItem("login_token") },
        })
        .then((response) => {
          const admin_data = response["data"]["message"];
          setAdminData(admin_data);
        })
        .catch((error) => {
          console.log(error.response.data["message"]);
          //overtime
          if (error.response.status === 402 || 403) {
            localStorage.removeItem("login_token");
            setTokenContext();
            navigate("/");
          }
        });
    };
    loadAdmin();
  }, [navigate, setTokenContext]);

  React.useEffect(() => {
    loadingAdmin();
  }, [loadingAdmin]);

  //刪除管理者
  const handleDeleteAdmin = async (username) => {
    await axios
      .delete("api/admin", {
        headers: { token: localStorage.getItem("login_token") },
        data: { username: username },
      })
      .then((response) => {
        if (response.status === 200) {
          setSeverity("success");
          loadingAdmin();
        } else {
          setSeverity("error");
        }
        setAlertText(t(response.data["message"]));
      })
      .catch((error) => {
        setAlertText(t(error.response.data["message"]));
        setSeverity("error");
      });
    setState({
      isLoading: true,
      open: true,
      ...{
        vertical: "top",
        horizontal: "center",
      },
    });
  };

  //修改密碼功能
  const handleResetPassword = async (username, password) => {
    await axios
      .put(
        "api/reset_password",
        {
          username: username,
          password: password,
        },
        { headers: { token: localStorage.getItem("login_token") } }
      )
      .then((response) => {
        if (response.status === 201) {
          setSeverity("success");
        } else {
          setSeverity("error");
        }
        setAlertText(t(response.data["message"]));
      })
      .catch((error) => {
        setAlertText(t(error.response.data["message"]));
        setSeverity("error");
      });
    setState({
      open: true,
      ...{
        vertical: "top",
        horizontal: "center", //position of popout
      },
    });
  };
  const { t } = useTranslation();

  return (
    <div>
      <Bar />
      <Box sx={{ width: "95%", m: "auto" }}>
        <Box
          sx={{
            height: "44px",
            width: "95%",
            maxWidth: "1167px",
            display: "flex",
            m: "auto",
            mt: "66px",
            mb: "19px",
          }}
        >
          <Typography sx={{ fontSize: "36px", fontWeight: 700 }}>
            {t("Admin")}
          </Typography>
          <ThemeProvider theme={theme}>
            <Button
              variant="outlined"
              color="Button"
              sx={{ ml: "auto", minWidth: "124px", height: "44px" }}
              href="/Register"
            >
              <Typography>{t("Add admin")}</Typography>
            </Button>
            <Button
              variant="outlined"
              color="success"
              sx={{ ml: "1%", minWidth: "124px", height: "44px" }}
              href="/Register"
            >
              <Typography>{t("Update User")}</Typography>
            </Button>
          </ThemeProvider>
        </Box>
        <Box
          sx={{
            width: "95%",
            maxWidth: "1167px",
            height: "470px",
            m: "0 auto",
          }}
        >
          <Admins
            adminData={adminData}
            handleDeleteAdmin={handleDeleteAdmin}
            handleResetPassword={handleResetPassword}
            setAlertText={setAlertText}
            setSeverity={setSeverity}
            setState={setState}
          />
        </Box>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={1500}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity={Severity} sx={{ width: "100%" }}>
          {AlertText}
        </Alert>
      </Snackbar>
    </div>
  );
}
