import { Info } from "@mui/icons-material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import {
  Box,
  ButtonBase,
  CircularProgress,
  Collapse,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import { ethers } from "ethers";
import { useState } from "react";
import { FormattedMessage, FormattedNumber } from "react-intl";
import { LIST_ALL_CHAIN, some } from "../../common/constants";
import { ET_FEE, FormInterface } from "./useSwapLogic";

interface Props {
  quoteRes: some;
  loading?: boolean;
  formData: FormInterface;
  chainId: number;
}

const DetailQuoteBox = (props: Props) => {
  const { quoteRes, formData, chainId, loading } = props;
  const [swap, setSwap] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box
        sx={{
          padding: "4px 8px",
          borderRadius: 8,
          marginTop: 2,
          display: "flex",
          alignItems: "center",
          "&:hover": {
            bgcolor: "action.hover",
          },
        }}
      >
        <Box display="flex" alignItems="center" flex={1}>
          {loading ? <CircularProgress size={22.85} /> : <Info />}
          &emsp;
          <ButtonBase
            sx={{
              padding: "2px 8px",
              borderRadius: 8,
            }}
            onClick={() => {
              setSwap(!swap);
            }}
          >
            {swap ? (
              <Typography variant="subtitle2">
                {`1 ${formData.sellToken?.symbol} = ${Number(
                  formData.inputType === "sellToken"
                    ? Number(quoteRes?.price)
                    : 1 / Number(quoteRes?.price)
                ).toFixed(5)} ${formData.buyToken?.symbol} `}
              </Typography>
            ) : (
              <Typography variant="subtitle2">
                {`1 ${formData.buyToken?.symbol} = ${(formData.inputType ===
                "buyToken"
                  ? Number(quoteRes?.price)
                  : 1 / Number(quoteRes?.price)
                ).toFixed(5)} ${formData.sellToken?.symbol} `}
              </Typography>
            )}
          </ButtonBase>
        </Box>
        <Box>
          <Typography variant="subtitle2">
            <FormattedMessage id="feeNetWork" />: &nbsp;
            {ethers.utils.formatUnits(
              ethers.BigNumber.from(quoteRes.gas).mul(
                ethers.BigNumber.from(quoteRes.gasPrice * ET_FEE)
              )
            )}{" "}
            &nbsp;
            <span style={{ textTransform: "uppercase" }}>
              {
                LIST_ALL_CHAIN.find((item) => item.chainId === chainId)
                  ?.nativeCurrency?.name
              }
            </span>
          </Typography>
        </Box>
        <IconButton
          style={{ padding: 2 }}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <KeyboardArrowDownRoundedIcon
            style={{
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "0.3s",
            }}
          />
        </IconButton>
      </Box>
      <Collapse in={open} style={{ paddingTop: 2 }}>
        <Box
          borderRadius={4}
          border={1}
          borderColor="divider"
          paddingY={1}
          paddingX={2}
          marginTop={2}
        >
          <Box width={"100%"} display="flex" justifyContent="space-between">
            <Typography variant="body2">{"Expected Output"}</Typography>
            <Typography variant="body2">
              {loading ? (
                <Skeleton width={100} />
              ) : (
                `${formData.buyAmount} ${formData.buyToken?.symbol}`
              )}
            </Typography>
          </Box>
          <Box width={"100%"} display="flex" justifyContent="space-between">
            <Typography variant="body2">{"Price Impact"}</Typography>
            <Typography variant="body2">
              {loading ? (
                <Skeleton width={70} />
              ) : (
                <FormattedNumber
                  value={1 - Number(quoteRes.guaranteedPrice / quoteRes.price)}
                  style="percent"
                  minimumFractionDigits={2}
                />
              )}
            </Typography>
          </Box>
        </Box>
      </Collapse>
    </>
  );
};

export default DetailQuoteBox;
