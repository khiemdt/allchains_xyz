import { Button, Dialog, DialogContent } from "@mui/material";
import React from "react";
import { FormattedMessage } from "react-intl";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/reducer";
import { setNetworkError, setOpenErrorDialog } from "../reducer/commonReducer";

interface Props {}

const FetchErrorDialog = (props: Props) => {
  const dispatch = useDispatch();
  const networkErrorMsg = useSelector(
    (state: AppState) => state.common.networkErrorMsg,
    shallowEqual
  );
  const openErrorDialog = useSelector(
    (state: AppState) => state.common.openErrorDialog,
    shallowEqual
  );

  return (
    <Dialog
      open={!!networkErrorMsg && openErrorDialog}
      maxWidth="xs"
      style={{ zIndex: 999999 }}
    >
      <DialogContent
        style={{
          padding: "0 32px",
          display: "flex",
          alignContent: "center",
          justifyContent: "space-around",
        }}
      >
        <div
          style={{
            padding: "16px",
            textAlign: "center",
          }}
        >
          <div>
            {networkErrorMsg && <FormattedMessage id={networkErrorMsg} />}
          </div>
          <Button
            style={{
              padding: "1px 0",
              width: "90px",
              marginTop: "20px",
              marginRight: "16px",
            }}
            color="primary"
            variant="contained"
            size="small"
            onClick={() => {
              dispatch(setNetworkError("", true));
            }}
          >
            <FormattedMessage id="retry" />
          </Button>
          <Button
            style={{
              padding: "1px 0",
              width: "90px",
              marginTop: "20px",
            }}
            color="primary"
            variant="outlined"
            size="small"
            onClick={() => {
              dispatch(setOpenErrorDialog(false));
            }}
          >
            <FormattedMessage id="cancel" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FetchErrorDialog;
