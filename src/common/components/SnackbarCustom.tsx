import { Alert } from "@mui/material";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/reducer";
import { setCloseSnackbar } from "../reducer/commonReducer";

const useStyles = makeStyles(() => ({
  icon: { padding: 0 },
  message: { padding: 0 },
  root: { height: "unset", minWidth: 200, alignItems: "center" },
  action: { padding: 0, color: "inherit" },
}));

function TransitionLeft(props) {
  return <Slide {...props} direction="down" />;
}

const SnackbarCustom = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { isOpen, type, message } = useSelector(
    (state: AppState) => state.common.snackbarProps,
    shallowEqual
  );
  // const useSelectorTest = useSelector(state => state.snack)
  // console.log('useSelectorTest==>', useSelectorTest)
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setCloseSnackbar());
  };

  // Type info | success | warning | error
  const severity =
    typeof type === "number"
      ? type === 200
        ? "success"
        : "error"
      : type || "info";

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={isOpen && !!message}
        autoHideDuration={1000}
        onClose={handleClose}
        TransitionComponent={TransitionLeft}
      >
        <Alert
          classes={classes}
          severity={severity}
          sx={{
            border: `1px solid`,
            borderColor: `${severity}.light`,
            height: 48,
          }}
          iconMapping={{
            error: <ErrorRoundedIcon />,
            success: <CheckCircleRoundedIcon />,
            warning: <WarningRoundedIcon />,
            info: <InfoRoundedIcon />,
          }}
          onClose={() => {
            dispatch(setCloseSnackbar());
          }}
          variant="filled"
        >
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default SnackbarCustom;
