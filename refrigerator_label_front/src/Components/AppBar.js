import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={theme}>
        <AppBar position="static" color="Button">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,fontWeight : 600}} color="White">
              冰箱物品管理
            </Typography>
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                startIcon={<LogoutIcon/>}
                color="Log"
              >
                <Typography color="White">Logout</Typography>
              </Button>
            </ThemeProvider>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box>
  );
}