import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TokenContext } from "../App.js";
import { Typography, Box, Button, Link } from "@mui/material";

const theme = createTheme({
  palette: {
    white: {
      main: "rgb(255,255,255)",
    },
    Button: {
      main: "#363F4E",
    },
    Log: {
      main: "#5CB4FD",
    },
  },
});

export default function ButtonAppBar(props) {
  let navigate = useNavigate();

  const { setTokenContext } = React.useContext(TokenContext);

  const handleLogout = () => {
    localStorage.removeItem("login_token");
    setTokenContext(null);
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={theme}>
        <AppBar position="static" color="Button">
          <Toolbar>
            <Link href="/" underline="none">
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, fontWeight: 600 }}
                color="White"
              >
                雲端智慧標籤系統
              </Typography>
            </Link>
            <ThemeProvider theme={theme}>
              <Button
                variant="outlined"
                color="white"
                href="/Admins"
                sx={{ mr: "1vw", ml: "auto" }}
              >
                <Typography color="White">管理者列表</Typography>
              </Button>
              <Button
                variant="outlined"
                startIcon={<LogoutIcon />}
                color="white"
                onClick={handleLogout}
                href="/"
              >
                <Typography color="White" sx={{fontSize:"14px"}}>Logout</Typography>
              </Button>
            </ThemeProvider>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box>
  );
}
