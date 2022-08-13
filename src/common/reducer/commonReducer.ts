import { AlertColor, PaletteMode } from "@mui/material";
import Cookies from "js-cookie";
import React from "react";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { ActionType, createCustomAction, getType } from "typesafe-actions";
import { API_PATHS } from "../../api/API_App";
import { AppState } from "../../redux/reducer";
import { MODE_THEME, SUCCESS_CODE } from "../constants";
import { ITokenBase, IConfigForAll } from "../utils";
import { fetchThunk } from "./thunk";

export interface SnackbarProps {
  isOpen: boolean;
  type?: AlertColor | number;
  message?: React.ReactNode | string;
}
export interface CommonState {
  networkErrorMsg?: string;
  openErrorDialog: boolean;
  loading: boolean;
  snackbarProps: SnackbarProps;
  mode: PaletteMode;
  listCoin: ITokenBase[];
  configForAll?: IConfigForAll;
  loadingCoin: boolean;
}

export const setModeTheme = createCustomAction(
  "common/setModeTheme",
  (val: PaletteMode) => ({ val })
);

export const setOpenSnackbar = createCustomAction(
  "common/setOpenSnackbar",
  (val: Omit<SnackbarProps, "isOpen">) => ({ val })
);

export const setCloseSnackbar = createCustomAction("common/setCloseSnackbar");

export const setOpenErrorDialog = createCustomAction(
  "common/setOpenErrorDialog",
  (val: boolean) => ({ val })
);

export const setNetworkError = createCustomAction(
  "common/setNetworkError",
  (errorMsg: string, openErrorDialog: boolean) => ({
    errorMsg,
    openErrorDialog,
  })
);

export const setLoading = createCustomAction(
  "common/setLoading",
  (val: boolean) => ({ val })
);
export const setListCoin = createCustomAction(
  "common/setListCoin",
  (val: ITokenBase[]) => ({ val })
);
export const setConfigForAll = createCustomAction(
  "common/setConfigForAll",
  (val: IConfigForAll) => ({ val })
);

export function initialData(): ThunkAction<
  Promise<void>,
  AppState,
  null,
  AnyAction
> {
  return async (dispatch) => {
    const [searchCurrency, transferConfigsForAll] = await Promise.all([
      await dispatch(fetchThunk(API_PATHS.searchCurrency)),
      await dispatch(fetchThunk(API_PATHS.getTransferConfigsForAll)),
    ]);

    if (searchCurrency.code === SUCCESS_CODE) {
      dispatch(
        setListCoin(
          searchCurrency.data?.coins?.map((one) => ({
            ...one,
            name: `${one.name} (${one.symbol})`,
          }))
        )
      );
    }
    dispatch(setConfigForAll(transferConfigsForAll));
  };
}

const actions = {
  setOpenSnackbar,
  setCloseSnackbar,
  setNetworkError,
  setOpenErrorDialog,
  setLoading,
  setModeTheme,
  setListCoin,
  setConfigForAll,
};

type Action = ActionType<typeof actions>;

export default function reducer(
  state: CommonState = {
    loading: false,
    openErrorDialog: false,
    snackbarProps: { isOpen: false },
    mode: (Cookies.get(MODE_THEME) as PaletteMode) || "dark",
    listCoin: [],
    loadingCoin: true,
  },
  action: Action
): CommonState {
  switch (action.type) {
    case getType(setConfigForAll):
      return { ...state, configForAll: action.val };
    case getType(setModeTheme):
      return { ...state, mode: action.val };
    case getType(setOpenSnackbar):
      return { ...state, snackbarProps: { isOpen: true, ...action.val } };
    case getType(setCloseSnackbar):
      return {
        ...state,
        snackbarProps: { ...state.snackbarProps, isOpen: false },
      };
    case getType(setOpenErrorDialog):
      return { ...state, openErrorDialog: action.val };
    case getType(setNetworkError):
      return {
        ...state,
        networkErrorMsg: action.errorMsg,
        openErrorDialog: action.openErrorDialog,
      };
    case getType(setLoading):
      return { ...state, loading: action.val };
    case getType(setListCoin):
      return { ...state, listCoin: action.val, loadingCoin: false };
    default:
      return state;
  }
}
