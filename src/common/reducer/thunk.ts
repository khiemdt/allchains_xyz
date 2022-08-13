import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { AppState } from "../../redux/reducer";
import { some } from "../constants";
import { setLoading, setNetworkError } from "./commonReducer";

export function fetchThunk(
  url: string,
  method: "delete" | "put" | "get" | "post" | "PATCH" = "get",
  body?: some | FormData | string | some[],
  contentType?: string,
  fallback = { cancelled: false, data: {} }
): ThunkAction<Promise<some | any>, AppState, null, Action<string>> {
  return async (dispatch, getState) => {
    while (true) {
      let res: Response | null = null;
      try {
        res = await fetch(url, {
          method,
          body:
            body instanceof FormData
              ? body
              : typeof body === "object"
              ? JSON.stringify(body)
              : body,
          headers: !url.includes("0x.org")
            ? {
                "Content-Type": contentType || "application/json",
                "Cache-Control": "no-cache",
                // Authorization: `Bearer ${token}`,
                walletAddress: getState().wallet.walletAddress || "",
                host: window.location.host,
              }
            : {
                "Content-Type": contentType || "application/json",
                "Cache-Control": "no-cache",
              },
        });
      } catch (_) {}
      dispatch(setLoading(false));
      if (res) {
        if (res.status === 402 || res.status === 500) {
          throw new Error(await res.text());
        }
        if (res.status === 501) {
          throw new Error(res.statusText);
        }
        if (res.status === 403) {
          // throw new Error("Invalid token");
        }
        if (res.ok) {
          if (fallback.cancelled) {
            return fallback.data;
          }
          if (contentType === "image/jpeg" || contentType === "file") {
            return res.blob();
          }
          const json = await res.json();
          return json;
        }
      }

      let hasInternet = true;
      try {
        await fetch("https://www.google.com", { mode: "no-cors" });
      } catch (_) {
        hasInternet = false;
      }

      dispatch(
        setNetworkError(hasInternet ? "serverProblem" : "unstableNetwork", true)
      );

      do {
        await new Promise((resolve) => setTimeout(resolve, 250));
        if (!getState().common.openErrorDialog) {
          break;
        }
      } while (getState().common.networkErrorMsg);
      if (!getState().common.openErrorDialog) {
        break;
      }
      // break;
      continue;
    }
    return {};
  };
}
