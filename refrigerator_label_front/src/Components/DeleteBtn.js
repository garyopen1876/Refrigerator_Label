import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";
const theme2 = createTheme({
  palette: {
    Button: {
      main: "#363F4E",
    },
  },
});

export default function ResponsiveDialog() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // const handleClosedelete = () => {
  //     setOpen(false);
  //     //delete function
  // };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" style={{height:'60px'}}>
          {"確認刪除該項目？"}
        </DialogTitle>
        <DialogActions>
          <ThemeProvider theme={theme2}>
            <Button
              autoFocus
              onClick={handleClose}
              variant="contained"
              color="Button"
            >
              <Typography color="white">確認</Typography>
            </Button>
            <Button
              onClick={handleClose}
              autoFocus
              variant="outlined"
              color="Button"
            >
              取消
            </Button>
          </ThemeProvider>
        </DialogActions>
      </Dialog>
    </div>
  );
}