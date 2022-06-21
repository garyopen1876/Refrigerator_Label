import * as React from "react";
import { Typography, Box, Paper, TextField, Alert } from "@mui/material";
import "../App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Bar from "../Components/AppBar";
import axios from "../Axios.config.js";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";

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

export default function Register() {
  let navigate = useNavigate();

  const [btnLoading, setBtnLoading] = React.useState(false);
  const [hidden, setHidden] = React.useState(true);
  const [AlertText, setAlertText] = React.useState("");
  const [inputErrorU, setInputErrorU] = React.useState(false);
  const [inputErrorM, setInputErrorM] = React.useState(false);
  const [inputErrorP, setInputErrorP] = React.useState(false);
  const [inputErrorPA, setInputErrorPA] = React.useState(false);

  const [username, setUsername] = React.useState();
  const [mail, setMail] = React.useState();
  const [password, setPassword] = React.useState();
  const [passwordAgain, setPasswordAgain] = React.useState();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeMail = (e) => {
    const mail = e.target.value;
    setMail(mail);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangePasswordAgain = (e) => {
    const passwordAgain = e.target.value;
    setPasswordAgain(passwordAgain);
  };

  //創建使用者功能
  const handleCreateAdmin = async (event) => {
    setInputErrorU(false);
    setInputErrorM(false);
    setInputErrorP(false);
    setInputErrorPA(false);
    event.preventDefault();
    let check = false;
    let alert_text = "請輸入";

    if (!username) {
      console.log("ㄐㄐ");
      setInputErrorU(true);
      alert_text += " 使用者名稱 ";
      check = true;
    }
    if (!mail) {
      setInputErrorM(true);
      alert_text += " 電子郵件 ";
      check = true;
    }
    if (!password) {
      setInputErrorP(true);
      alert_text += " 密碼 ";
      check = true;
    }
    if (!passwordAgain) {
      setInputErrorPA(true);
      alert_text += " 再一次密碼 ";
      check = true;
    }
    //show
    if (check === true) {
      setHidden(false);
      setAlertText(alert_text + "!");
      process.exit();
    } else if (password !== passwordAgain) {
      //not same
      setInputErrorP(true);
      setInputErrorPA(true);
      setAlertText("輸入密碼不一致!");
      process.exit();
    }

    setBtnLoading(true);
    await axios
      .post(
        "/api/admin",
        {
          username: username,
          password: password,
          mail: mail,
        },
        {
          headers: { token: localStorage.getItem("login_token") },
        }
      )
      .then((response) => {
        console.log(response);
        navigate("/Admins");
      })
      .catch((error) => {
        setAlertText(error.response.data["message"]);
      });
    setBtnLoading(false);
  };

  return (
    <div>
      <Bar />
      <Paper
        sx={{
          width: "478px",
          height: "470px",
          m: "20vh auto",
          display: "flex",
        }}
      >
        <Box
          component="form"
          onSubmit={handleCreateAdmin}
          noValidate
          sx={{ m: "0 auto", height: "40px" }}
        >
          <Box sx={{ m: "25px 146px" }}>
            <Typography sx={{ fontSize: "36px", fontWeight: 700 }}>
              新增管理者
            </Typography>
          </Box>
          {!hidden ? (
            <Box sx={{ width: "90%", m: "8px 24px" }}>
              <Alert severity="error" className="Alert" show="false">
                <Typography
                  color="black"
                  variant="body2"
                  sx={{ fontWeight: 700 }}
                >
                  {AlertText}
                </Typography>
              </Alert>
            </Box>
          ) : null}
          <Box sx={{ width: "408px", m: "0 35px" }}>
            <TextField
              error={inputErrorU}
              size="small"
              fullWidth
              placeholder="使用者名稱"
              onChange={onChangeUsername}
            />
            <TextField
              error={inputErrorM}
              size="small"
              fullWidth
              placeholder="電子郵件"
              type="email"
              onChange={onChangeMail}
              sx={{ mt: "11px" }}
            />
            <TextField
              error={inputErrorP}
              size="small"
              fullWidth
              placeholder="密碼"
              type="password"
              onChange={onChangePassword}
              sx={{ mt: "11px" }}
            />
            <TextField
              error={inputErrorPA}
              size="small"
              fullWidth
              placeholder="再次輸入密碼"
              type="password"
              onChange={onChangePasswordAgain}
              sx={{ mt: "11px" }}
            />
          </Box>
          <Box sx={{ width: "408px", m: "55px 35px 71px 35px" }}>
            <ThemeProvider theme={theme}>
              <LoadingButton
                loading={btnLoading}
                type="submit"
                variant="contained"
                fullWidth
                sx={{ height: "44px" }}
                color="Button"
              >
                <Typography
                  sx={{ fontSize: "14px" }}
                  color="White"
                  className="Signup"
                >
                  註冊
                </Typography>
              </LoadingButton>
            </ThemeProvider>
          </Box>
        </Box>
      </Paper>
    </div>
  );
}