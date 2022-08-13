import { Button, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { OpenState } from "../../common/components/elements";
import ConnectionWalletDialog from "../../common/connection/ConnectionWalletDialog";
import { some } from "../../common/constants";
import useGetAllowanceTokens from "../../common/hook/useGetAllowanceTokens";
import ApproveDialog from "./ApproveDialog";
import { FormInterface } from "./useSwapLogic";
interface Props {
  walletAddress?: string;
  loading: boolean;
  isSameNetWork: boolean;
  formData: FormInterface;
  quoteRes?: some;
  balanceSellToken?: string | number;
  onSwap: () => void;
}
const ControlBox = (props: Props) => {
  const {
    walletAddress,
    loading,
    isSameNetWork,
    formData,
    balanceSellToken,
    onSwap,
    quoteRes,
  } = props;
  const {
    isTokenAllowed,
    approveToken,
    approveTransactionData,
    setApproveTransactionData,
    revalidate,
    isValidating,
  } = useGetAllowanceTokens({
    spenderTokenAddress: formData?.sellToken?.address,
    amount: formData?.sellAmount,
    allowanceTarget: quoteRes?.allowanceTarget,
  });

  return (
    <>
      {walletAddress ? (
        <>
          {!isSameNetWork ? (
            <Button
              fullWidth
              variant="outlined"
              size="large"
              color="inherit"
              disabled
            >
              <Typography variant="body1" color="inherit">
                <FormattedMessage id="wrongNetwork" />
              </Typography>
            </Button>
          ) : !formData.sellToken || !formData.buyToken ? (
            <Button
              fullWidth
              variant="outlined"
              size="large"
              color="inherit"
              disabled
            >
              <Typography variant="body1" color="inherit">
                <FormattedMessage id="selectToken" />
              </Typography>
            </Button>
          ) : (
              formData.inputType === "sellToken"
                ? !formData.sellAmount
                : !formData.buyAmount
            ) ? (
            <Button
              fullWidth
              variant="outlined"
              size="large"
              color="inherit"
              disabled
            >
              <Typography variant="body1" color="inherit">
                <FormattedMessage id="enterAmount" />
              </Typography>
            </Button>
          ) : Number(balanceSellToken || 0) < Number(formData.sellAmount) ? (
            <Button
              fullWidth
              variant="outlined"
              size="large"
              color="inherit"
              disabled
            >
              <Typography variant="body1" color="inherit">
                <FormattedMessage
                  id="insufficientBalance"
                  values={{ token: formData.sellToken?.symbol }}
                />
              </Typography>
            </Button>
          ) : !isTokenAllowed && !isValidating && quoteRes ? (
            <Button
              fullWidth
              variant="outlined"
              size="large"
              disabled={Number(formData.sellAmount || 0) === 0}
              onClick={() => approveToken()}
            >
              <Typography variant="body1" color="inherit">
                <FormattedMessage
                  id="approveToken"
                  values={{ token: formData.sellToken.symbol }}
                />
              </Typography>
            </Button>
          ) : (
            <Button
              disabled={loading}
              color={loading ? "inherit" : "primary"}
              fullWidth
              variant="outlined"
              size="large"
              onClick={onSwap}
            >
              <Typography variant="body1" color="inherit">
                <FormattedMessage id="swap" />
              </Typography>
            </Button>
          )}
        </>
      ) : (
        <OpenState>
          {({ open, setOpen }) => {
            return (
              <>
                <Button fullWidth size="large" onClick={() => setOpen(true)}>
                  <Typography variant="subtitle2" color="common.white">
                    <FormattedMessage id="connect_wallet" />
                  </Typography>
                </Button>
                <ConnectionWalletDialog
                  open={open}
                  onClose={() => {
                    setOpen(false);
                  }}
                />
              </>
            );
          }}
        </OpenState>
      )}
      <ApproveDialog
        transactionsData={approveTransactionData}
        open={!!approveTransactionData}
        onClose={() => {
          setApproveTransactionData(undefined);
        }}
        callback={() => revalidate()}
      />
    </>
  );
};
export default ControlBox;
