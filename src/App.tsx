import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Backdrop, CircularProgress, ThemeProvider } from "@mui/material";
import enLocale from "date-fns/locale/en-US";
import viLocale from "date-fns/locale/vi";
import Cookies from "js-cookie";
import "moment/locale/vi";
import React, { useCallback } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useRoutes } from "react-router";
import "./App.css";
import ConfirmDialogProvider from "./common/components/ConfirmDialogProvider";
import FetchErrorDialog from "./common/components/FetchErrorDialog";
import LoadingIcon from "./common/components/LoadingIcon";
import SnackbarCustom from "./common/components/SnackbarCustom";
import WarningDialogProvider from "./common/components/WarningDialogProvider";
import {
  connectWallet,
  getInfoAccount,
  setWalletState,
} from "./common/connection/reducer/walletReducer";
import { WALL_ADDRESS } from "./common/constants";
import useGeneralHook from "./common/hook/useGeneralHook";
import { initialData } from "./common/reducer/commonReducer";
import { MUITheme } from "./config/setupTheme";
import { ethereumWindow, providerEthers } from "./constants";
import DefaultLayout from "./layout/DefaultLayout";
import { ADMIN_ROUTES } from "./layout/router";
import { AppState } from "./redux/reducer";
import "./scss/svg.scss";

export const localeMap: any = {
  vi: viLocale,
  en: enLocale,
};

function App() {
  const { warningDialog, openSnackbar, dispatch } = useGeneralHook();
  const mode = useSelector(
    (state: AppState) => state.common.mode,
    shallowEqual
  );

  const { loading } = useSelector((state: AppState) => state.common);
  const locale = useSelector(
    (state: AppState) => state.intl.locale,
    shallowEqual
  );

  React.useEffect(() => {
    const walletAddress = Cookies.get(WALL_ADDRESS) || "";
    if (walletAddress) {
      dispatch(getInfoAccount(walletAddress));
    }
  }, [dispatch]);

  const listenChangeAccount = useCallback(() => {
    if (providerEthers) {
      ethereumWindow.on("accountsChanged", async function () {
        dispatch(connectWallet(warningDialog, openSnackbar));
      });
    }
  }, [dispatch, openSnackbar, warningDialog]);

  const listenChangeNetwork = useCallback(() => {
    if (providerEthers) {
      providerEthers.on("network", (newNetwork: any, oldNetwork: any) => {
        dispatch(setWalletState({ networkInfo: newNetwork || oldNetwork }));
        // When a Provider makes its initial connection, it emits a "network"
        // event with a null oldNetwork along with the newNetwork. So, if the
        // oldNetwork exists, it represents a changing network
        if (oldNetwork) {
          // window.location.reload();
        }
      });
    }
  }, [dispatch]);

  React.useEffect(() => {
    listenChangeAccount();
    listenChangeNetwork();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    dispatch(initialData());
  }, [dispatch]);

  const element = useRoutes([
    {
      path: "*",
      element: <DefaultLayout />,
      children: ADMIN_ROUTES,
    },
  ]);

  return (
    <ThemeProvider theme={MUITheme(mode)}>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        locale={localeMap[locale]}
      >
        <ConfirmDialogProvider>
          <WarningDialogProvider>
            <React.Suspense fallback={<LoadingIcon />}>
              {element}
            </React.Suspense>
            <FetchErrorDialog />
            <Backdrop unmountOnExit style={{ zIndex: 2000 }} open={loading}>
              <div style={{ color: "white" }}>
                <CircularProgress variant="indeterminate" color="inherit" />
              </div>
            </Backdrop>
            <SnackbarCustom />
          </WarningDialogProvider>
        </ConfirmDialogProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
