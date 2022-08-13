import CheckRounded from "@mui/icons-material/CheckRounded";
import WarningRounded from "@mui/icons-material/WarningRounded";
import { Box, Button, Dialog, Link, Typography } from "@mui/material";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import { shallowEqual, useSelector } from "react-redux";
import LoadingIcon from "../../common/components/LoadingIcon";
import { some } from "../../common/constants";
import LIST_ALL_CHAIN_TMP from "../../common/LIST_ALL_CHAIN.json";
import { AppState } from "../../redux/reducer";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  transactionsData?: some;
}

const TransactionDialog: React.FunctionComponent<Props> = (props) => {
  const { open, onClose, onSuccess, transactionsData } = props;
  const [status, setStatus] = React.useState("");
  const networkInfo = useSelector(
    (state: AppState) => state.wallet.networkInfo,
    shallowEqual
  );
  const explorersUrl = LIST_ALL_CHAIN_TMP?.find(
    (x) => x.chainId === networkInfo?.chainId
  )?.explorers?.[0]?.url;
  const [loading, setLoading] = React.useState(true);

  return (
    <Dialog
      keepMounted={false}
      open={open}
      TransitionProps={{
        onEnter: async () => {
          setLoading(true);
          setStatus("");
          if (transactionsData) {
            try {
              const res = await transactionsData.wait();
              console.log("res", res);

              if (res) {
                setStatus("success");
              }
            } catch (err) {
              console.log("err", err);

              setStatus("fail");
            } finally {
              setLoading(false);
            }
          }
        },
      }}
      PaperProps={{ style: { width: 420 } }}
    >
      <Box bgcolor={"background.paper"} overflow="auto">
        <Box padding={2} display="flex" justifyContent="center">
          <Typography variant="h6">
            <FormattedMessage
              id={
                loading
                  ? "transactionProcessing"
                  : status === "success"
                  ? "transactionSuccess"
                  : "transactionFail"
              }
            />
          </Typography>
        </Box>
        {loading ? (
          <LoadingIcon style={{ marginTop: -24 }} />
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 16,
              minHeight: 240,
              flex: 1,
              marginTop: -24,
            }}
          >
            {status === "success" ? (
              <CheckRounded color={"success"} style={{ fontSize: "10rem" }} />
            ) : (
              <WarningRounded color={"error"} style={{ fontSize: "10rem" }} />
            )}
          </div>
        )}
        <Box
          display="flex"
          alignItems="center"
          gap={3}
          padding={2}
          justifyContent="center"
        >
          <Link
            href={`${explorersUrl}/tx/${transactionsData?.hash}`}
            underline="none"
            target="_blank"
            style={{ width: "100%" }}
          >
            <Button variant="outlined" size="large" fullWidth>
              <FormattedMessage id={"receipt"} />
            </Button>
          </Link>
          <Button
            size="large"
            fullWidth
            onClick={() => {
              onClose();
              status === "success" && onSuccess();
            }}
          >
            <FormattedMessage id={"newTrade"} />
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};
export default TransactionDialog;
