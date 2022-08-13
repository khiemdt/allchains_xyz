import { Avatar, Box, Paper, Skeleton, Typography } from "@mui/material";
import { useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router";
import CurrencyFormatted from "../../../common/components/CurrencyFormatted";
import { some, SUCCESS_CODE } from "../../../common/constants";
import useFilterHook from "../../../common/hook/useFilterHook";
import useGeneralHook from "../../../common/hook/useGeneralHook";
import { IconWallet } from "../../../svg";
import { useDataProfile } from "../ProfilePage";
import TableBox from "./TableBox";

interface Props {}

const PortfolioPage = (props: Props) => {
  const { data, listChain, loading, revalidate } = useDataProfile();
  const {
    dispatch,
    API_PATHS,
    fetchThunk,
    openSnackbar,
    confirmDialog,
    intl,
    appState,
  } = useGeneralHook();
  const { filter } = useFilterHook();
  const { walletAddress } = useParams<{ walletAddress: string }>();

  const onSpamToken = useCallback(
    async (value: some) => {
      const confirm = await confirmDialog.promptConfirmation({
        content: intl.formatMessage({ id: "spamTokenAlert" }),
      });
      if (confirm) {
        const json = await dispatch(
          fetchThunk(API_PATHS.spamToken, "post", {
            chaiId: value.chain_id,
            symbol: value.contract_ticker_symbol,
            contract: value.contract_address,
          })
        );
        // if (json.code === SUCCESS_CODE) {
        //   revalidate();
        // }
        openSnackbar({
          message: json.message,
          type: json.code,
        });
      }
      confirmDialog.close();
    },
    [
      API_PATHS.spamToken,
      confirmDialog,
      dispatch,
      fetchThunk,
      intl,
      openSnackbar,
    ]
  );
  return (
    <>
      <Box
        style={{
          padding: "16px 40px",
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
        }}
        bgcolor="background.default"
      >
        {loading
          ? Array(4)
              .fill(0)
              .map((_, idx) => {
                return (
                  <Paper
                    key={idx}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: 160,
                      padding: 16,
                    }}
                  >
                    <Skeleton
                      style={{
                        height: 46,
                        width: 46,
                      }}
                      variant="circular"
                    />
                    <Skeleton
                      width={50}
                      style={{ marginTop: 8, marginBottom: 12 }}
                    />
                    <Skeleton width={120} />
                  </Paper>
                );
              })
          : listChain.map((item) => {
              return (
                <Paper
                  key={item.chain_id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: 160,
                    padding: 16,
                  }}
                >
                  <Avatar
                    style={{
                      height: 46,
                      width: 46,
                    }}
                    src={item.logo_url}
                  />
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    style={{ marginTop: 8, marginBottom: 12 }}
                  >
                    {item.name}
                  </Typography>
                  <Typography variant="h6">
                    <CurrencyFormatted value={item.balance} />
                  </Typography>
                </Paper>
              );
            })}
      </Box>
      <Box
        style={{
          padding: "16px 40px",
        }}
      >
        <Box display="flex" alignItems="center" marginBottom={3}>
          <IconWallet />
          <Typography
            variant="subtitle1"
            color="primary"
            style={{ marginLeft: 16 }}
          >
            <FormattedMessage id="wallet" />
          </Typography>
        </Box>
        <TableBox
          data={data.filter((item) => (filter.chain ? true : item.quote > 0))}
          loading={loading}
          walletAddress={walletAddress}
          onSpamToken={
            appState.wallet.walletAddress
              ? (value) => onSpamToken(value)
              : undefined
          }
        />
      </Box>
    </>
  );
};

export default PortfolioPage;
