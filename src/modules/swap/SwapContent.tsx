import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import {
  Avatar,
  Box,
  Button,
  InputBase,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  Typography,
} from "@mui/material";
import React from "react";
import { FormattedMessage, FormattedNumber } from "react-intl";
import { LIST_NETWORK } from "../../common/constants";
import useGetAvatarToken from "../../common/hook/useGetAvatarToken";
import { IconSwap } from "../../svg";
import ControlBox from "./ControlBox";
import DetailQuoteBox from "./DetailQuoteBox";
import SelectTokenDialog from "./SelectTokenDialog";
import TransactionDialog from "./TransactionDialog";
import useSwapLogic from "./useSwapLogic";

interface Props extends ReturnType<typeof useSwapLogic> {}

const SwapContent = (props: Props) => {
  const {
    walletAddress,
    balanceBuyToken,
    balanceSellToken,
    formData,
    quoteRes,
    openDialog,
    loading,
    sellUSDTPrice,
    buyUSDTPrice,
    loadingSellUSDTPrice,
    loadingBuyUSDTPrice,
    setOpenSetting,
    setFormData,
    setOpenDialog,
    onSwap,
    chainId,
    isSameNetWork,
    setChainId,
    changeNetwork,
    appState,
    transactionsData,
    setTransactionsData,
    getBalanceSellToken,
    getBalanceBuyToken,
  } = props;

  const { avatar: avatarSellToken } = useGetAvatarToken({
    symbol: formData?.sellToken?.symbol,
  });
  const { avatar: avatarBuyToken } = useGetAvatarToken({
    symbol: formData?.buyToken?.symbol,
  });

  const riot =
    sellUSDTPrice &&
    buyUSDTPrice &&
    1 - Number(sellUSDTPrice) / Number(buyUSDTPrice);

  return (
    <>
      <Box display="flex" alignItems="center" marginBottom={3}>
        <Typography variant="h6">
          <FormattedMessage id={"swappingOn"} />
        </Typography>
        <Box flex={1} paddingX={4}>
          <Select
            sx={{ width: 200, bgcolor: "grey.300" }}
            value={chainId}
            onChange={(e) => {
              setChainId(Number(e.target.value));
              changeNetwork(Number(e.target.value));
            }}
          >
            {LIST_NETWORK.map((chain) => {
              return (
                <MenuItem key={chain.chainId} value={chain.chainId}>
                  <Box display="flex" alignItems="center">
                    <Avatar
                      style={{
                        height: 20,
                        width: 20,
                        marginRight: 8,
                        display: "inline-flex",
                      }}
                      src={
                        appState.common.configForAll?.chains?.find(
                          (v) => v.id === chain.chainId
                        )?.icon
                      }
                    />
                    <Typography variant="subtitle2" component="span">
                      {chain.name}
                    </Typography>
                  </Box>
                </MenuItem>
              );
            })}
          </Select>
        </Box>
        <Button
          variant="outlined"
          color="inherit"
          sx={{
            padding: 0,
            minWidth: 40,
            marginLeft: 2,
            border: "none",
          }}
          onClick={() => {
            setOpenSetting(true);
          }}
        >
          <SettingsOutlinedIcon />
        </Button>
      </Box>
      <Typography variant="caption" color="textSecondary">
        <FormattedMessage id="yourPay" />
      </Typography>
      <Paper
        variant="outlined"
        style={{
          marginTop: 8,
          padding: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flex={1}
          width="100%"
        >
          <InputBase
            value={formData?.sellAmount || ""}
            onChange={(e) => {
              setFormData({
                sellAmount: e.target.value || undefined,
                buyAmount: "",
                inputType: "sellToken",
              });
            }}
            placeholder={"0.0"}
            type="number"
            inputProps={{
              style: {
                padding: "0px !important",
                fontSize: 24,
              },
            }}
          />
          {formData.sellToken ? (
            <Button
              style={{
                minWidth: 136,
                borderRadius: 36,
                padding: "10px 16px 10px 10px",
              }}
              onClick={() => {
                setOpenDialog({
                  type: "sellToken",
                });
              }}
              variant="outlined"
              startIcon={
                <Avatar
                  style={{ height: 24, width: 24 }}
                  src={avatarSellToken}
                />
              }
              endIcon={
                <ArrowForwardIosRoundedIcon
                  style={{
                    transform: "rotate(90deg",
                    fontSize: 12,
                  }}
                />
              }
            >
              <Box flex={1} color="inherit">
                <Typography variant="subtitle1" color="inherit">
                  {formData.sellToken?.symbol}
                </Typography>
              </Box>
            </Button>
          ) : (
            <Button
              variant="outlined"
              onClick={() => {
                setOpenDialog({
                  type: "sellToken",
                });
              }}
              style={{
                minWidth: 136,
                borderRadius: 36,
                padding: "10px 16px 10px 10px",
              }}
            >
              <FormattedMessage id="selectToken" />
            </Button>
          )}
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          paddingLeft={1}
        >
          <Box>
            {loadingSellUSDTPrice ? (
              <Skeleton width={70} style={{ marginTop: 8 }} />
            ) : (
              sellUSDTPrice && (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{ marginTop: 8 }}
                >
                  ${sellUSDTPrice}
                </Typography>
              )
            )}
          </Box>
          {formData.sellToken && (
            <Typography
              variant="body2"
              color="textSecondary"
              component="div"
              style={{ marginTop: 8 }}
            >
              <FormattedMessage id="balance" />
              :&nbsp;
              {balanceSellToken}
              {Number(balanceSellToken) > 0 && (
                <Button
                  variant="outlined"
                  sx={{
                    border: "none",
                    borderRadius: 32,
                    height: 24,
                    marginLeft: 1,
                  }}
                  size="small"
                  onClick={() => {
                    setFormData({
                      sellAmount: balanceSellToken,
                      buyAmount: "",
                      inputType: "sellToken",
                    });
                  }}
                >
                  <Typography variant="body2" color="primary">
                    <FormattedMessage id="max" />
                  </Typography>
                </Button>
              )}
            </Typography>
          )}
        </Box>
      </Paper>
      <Button
        variant="outlined"
        style={{
          minWidth: "unset",
          borderRadius: 42,
          width: 42,
          height: 42,
          border: "none",
          alignSelf: "center",
          marginTop: 24,
          marginBottom: 8,
          padding: 0,
        }}
        onClick={() => {
          setFormData({
            sellToken: formData.buyToken,
            sellAmount: formData.buyAmount,
            buyToken: formData.sellToken,
            buyAmount: formData.sellAmount,
            inputType:
              formData.inputType === "sellToken" ? "buyToken" : "sellToken",
          });
        }}
      >
        <IconSwap className="svgStroke" />
      </Button>
      <Typography variant="caption" color="textSecondary">
        <FormattedMessage id="youReceive" />
      </Typography>
      <Paper
        variant="outlined"
        style={{
          marginTop: 8,
          padding: 8,
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flex={1}
          width="100%"
        >
          <InputBase
            value={formData.buyAmount || ""}
            onChange={(e) => {
              setFormData({
                buyAmount: e.target.value || "",
                sellAmount: "",
                inputType: "buyToken",
              });
            }}
            placeholder={"0.0"}
            type="number"
            inputProps={{
              style: {
                padding: "0px !important",
                fontSize: 24,
              },
            }}
          />

          {formData.buyToken ? (
            <Button
              style={{
                minWidth: 136,
                borderRadius: 36,
                padding: "10px 16px 10px 10px",
              }}
              onClick={() => {
                setOpenDialog({
                  type: "buyToken",
                });
              }}
              variant="outlined"
              startIcon={
                <Avatar
                  style={{ height: 24, width: 24 }}
                  src={avatarBuyToken}
                />
              }
              endIcon={
                <ArrowForwardIosRoundedIcon
                  style={{
                    transform: "rotate(90deg",
                    fontSize: 12,
                  }}
                />
              }
            >
              <Box flex={1} color="inherit">
                <Typography variant="subtitle1" color="inherit">
                  {formData.buyToken?.symbol}
                </Typography>
              </Box>
            </Button>
          ) : (
            <Button
              style={{
                minWidth: 136,
                borderRadius: 36,
                padding: "10px 16px 10px 10px",
              }}
              variant="outlined"
              onClick={() => {
                setOpenDialog({
                  type: "buyToken",
                });
              }}
            >
              <FormattedMessage id="selectToken" />
            </Button>
          )}
        </Box>
        <Box
          display="flex"
          alignItems="baseline"
          justifyContent="space-between"
          width="100%"
          paddingLeft={1}
        >
          <Box>
            {loadingBuyUSDTPrice ? (
              <Skeleton width={70} style={{ marginTop: 8 }} />
            ) : (
              buyUSDTPrice && (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{ marginTop: 8 }}
                >
                  ${buyUSDTPrice}&nbsp;
                  {
                    <Typography
                      variant="inherit"
                      color="success.main"
                      component="span"
                    >
                      (
                      <FormattedNumber
                        value={riot || 0}
                        maximumFractionDigits={2}
                        style="percent"
                      />
                      )
                    </Typography>
                  }
                </Typography>
              )
            )}
          </Box>
          {formData.buyToken && (
            <Typography
              variant="body2"
              color="textSecondary"
              style={{ marginTop: 8, justifySelf: "flex-end" }}
            >
              <FormattedMessage id="balance" />
              :&nbsp;
              {balanceBuyToken}
            </Typography>
          )}
        </Box>
      </Paper>
      {quoteRes && (
        <DetailQuoteBox
          quoteRes={quoteRes}
          loading={loading}
          formData={formData}
          chainId={chainId}
        />
      )}
      <Box marginY={2}>
        <ControlBox
          walletAddress={walletAddress}
          loading={loading}
          formData={formData}
          balanceSellToken={balanceSellToken}
          onSwap={onSwap}
          quoteRes={quoteRes}
          isSameNetWork={isSameNetWork}
        />
      </Box>
      <SelectTokenDialog
        open={!!openDialog}
        onClose={() => {
          setOpenDialog(undefined);
        }}
        chainId={chainId}
        listCurrency={[formData.sellToken, formData.buyToken]}
        selectedCurrency={openDialog?.type && formData[openDialog?.type]}
        onSelectCurrency={(value) => {
          if (openDialog?.type === "sellToken") {
            setFormData({
              sellToken: value,
              buyToken:
                value.address === formData.buyToken?.address
                  ? formData.sellToken
                  : formData.buyToken,
            });
          } else if (openDialog?.type === "buyToken") {
            setFormData({
              buyToken: value,
              sellToken:
                value.address === formData.sellToken?.address
                  ? formData.buyToken
                  : formData.sellToken,
            });
          }
          setOpenDialog(undefined);
        }}
      />
      <TransactionDialog
        transactionsData={transactionsData}
        open={!!transactionsData}
        onClose={() => {
          setTransactionsData(undefined);
        }}
        onSuccess={() => {
          setFormData({
            sellAmount: "",
            buyAmount: "",
          });
          getBalanceSellToken();
          getBalanceBuyToken();
        }}
      />
    </>
  );
};

export default SwapContent;
