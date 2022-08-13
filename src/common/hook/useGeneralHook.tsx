import { useTheme } from "@mui/material";
import { useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { API_PATHS, GAS_API, OX_NETWORK, OX_PATH } from "../../api/API_App";
import { AppState } from "../../redux/reducer";
import { useConfirmDialog } from "../components/ConfirmDialogProvider";
import { useWarningDialog } from "../components/WarningDialogProvider";
import { some } from "../constants";
import {
  setLoading,
  setOpenSnackbar,
  SnackbarProps,
} from "../reducer/commonReducer";
import { fetchThunk } from "../reducer/thunk";

const useGeneralHook = () => {
  const dispatch: ThunkDispatch<AppState, null, AnyAction> = useDispatch();
  const appState = useSelector((state: AppState) => state);
  const theme = useTheme();
  const confirmDialog = useConfirmDialog();
  const warningDialog = useWarningDialog();
  const location = useLocation();
  const navigate = useNavigate();
  const intl = useIntl();
  const [state, setState] = useState<some>({});

  const setLoadingFnc = (open: boolean) => {
    dispatch(setLoading(open));
  };

  return {
    intl,
    dispatch,
    appState,
    openSnackbar: (val: Omit<SnackbarProps, "isOpen">) =>
      dispatch(setOpenSnackbar(val)),
    theme,
    confirmDialog,
    warningDialog,
    location,
    navigate: navigate,
    fetchThunk: fetchThunk,
    API_PATHS: API_PATHS,
    OX_NETWORK: OX_NETWORK,
    OX_PATH: OX_PATH,
    GAS_API: GAS_API,
    setLoading: setLoadingFnc,
    state,
    isDarkTheme: theme.palette.mode === "dark",
    setState: (value) => setState((old) => (value ? { ...old, ...value } : {})),
  };
};

export default useGeneralHook;
