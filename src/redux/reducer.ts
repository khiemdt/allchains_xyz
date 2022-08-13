import { History } from "history";
import { combineReducers } from "redux";
import { createAction, getType } from "typesafe-actions";
import walletReducer, {
  WalletState,
} from "../common/connection/reducer/walletReducer";
import commonReducer, { CommonState } from "../common/reducer/commonReducer";
import intlReducer, { IntlState } from "../intl/redux/intlReducer";

export const clearStoreAfterLogout = createAction("clearStoreAfterLogout")();

export interface AppState {
  // router: RouterState;
  intl: IntlState;
  common: CommonState;
  wallet: WalletState;
}

export default function createRootReducer(history: History) {
  const rawRootReducer = combineReducers({
    // router: connectRouter(history),
    intl: intlReducer,
    common: commonReducer,
    wallet: walletReducer,
  });

  return (state: AppState | undefined, action: any): AppState => {
    if (state && action.type === getType(clearStoreAfterLogout)) {
      return rawRootReducer(undefined, action);
    }
    return rawRootReducer(state, action);
  };
}
