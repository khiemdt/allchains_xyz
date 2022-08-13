import "moment/locale/vi";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import ConfirmDialogProvider from "./common/components/ConfirmDialogProvider";
import { setLoading } from "./common/reducer/commonReducer";
import "./index.css";
import ConnectedIntlProvider from "./intl/component/ConnectedIntlProvider";
import { setLocale } from "./intl/redux/intlReducer";
import configureStore from "./redux/configureStore";
import reportWebVitals from "./reportWebVitals";

export const { store, persistor } = configureStore({});

store.dispatch(setLocale("en"));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate
          loading={null}
          persistor={persistor}
          onBeforeLift={() => {
            store.dispatch(setLoading(false));
          }}
        >
          <ConnectedIntlProvider
            formats={{
              number: {
                percentWith2Decimals: {
                  style: "percent",
                  maximumFractionDigits: 2,
                },
              },
            }}
          >
            <ConfirmDialogProvider>
              <App />
            </ConfirmDialogProvider>
          </ConnectedIntlProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
