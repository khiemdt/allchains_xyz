import Cookies from "js-cookie";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { ActionType, createCustomAction, getType } from "typesafe-actions";
import { ethereumWindow, providerEthers } from "../../../constants";
import { AppState } from "../../../redux/reducer";
import { WaringDialogParams } from "../../components/WarningDialog";
import { WALL_ADDRESS } from "../../constants";

export type Network = {
  name: string;
  chainId: number;
  ensAddress?: string;
  _defaultProvider?: (providers: any, options?: any) => any;
};
export interface WalletState {
  walletAddress?: string;
  networkInfo?: Network;
}

export const setWalletState = createCustomAction(
  "walletReducer/setWalletState",
  (state: WalletState) => ({
    payload: state,
  })
);

export function connectWallet(
  warningDialog: WaringDialogParams,
  openSnackbar: any,
  callback?: () => void
): ThunkAction<void, AppState, null, AnyAction> {
  return async (dispatch, getState) => {
    if (ethereumWindow) {
      ethereumWindow
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          console.log("result", result);

          openSnackbar({ message: "Wallet Connected" });
          Cookies.set(WALL_ADDRESS, result[0]);
          dispatch(getInfoAccount(result[0]));
          callback && callback();
        })
        .catch((error) => {
          warningDialog.openDialog({
            content: error.message,
          });
        });
    } else if (!ethereumWindow) {
      warningDialog.openDialog({
        content: "Please install MetaMask browser extension to interact",
      });
    }
  };
}

export function getInfoAccount(
  walletAddress: string
): ThunkAction<void, AppState, null, AnyAction> {
  return async (dispatch, getState) => {
    if (providerEthers) {
      await providerEthers
        ?.getBalance(walletAddress)
        .then((balanceResult) => {});
      const networkInfo = await providerEthers.getNetwork();
      dispatch(
        setWalletState({
          walletAddress: walletAddress,
          networkInfo: networkInfo,
        })
      );
    }
  };
}

const actions = {
  setWalletState,
};

type ActionT = ActionType<typeof actions>;

export default function walletReducer(
  state = {},
  action: ActionT
): WalletState {
  switch (action.type) {
    case getType(setWalletState):
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
