import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { FormattedMessage } from "react-intl";
import { OpenState } from "../../../common/components/elements";
import ConnectionWalletDialog from "../../../common/connection/ConnectionWalletDialog";
import { some } from "../../../common/constants";
import useGeneralHook from "../../../common/hook/useGeneralHook";
import useGetAvatarToken from "../../../common/hook/useGetAvatarToken";
import { ethereumWindow } from "../../../constants";
import { ReactComponent as IconLink } from "../../../svg/link-icon.svg";

const ChainCard = (props: { data: some }) => {
  const { data } = props;
  const { warningDialog, intl, appState } = useGeneralHook();
  const walletAddress = appState.wallet.walletAddress;
  const networkInfo = appState.wallet.networkInfo;

  const { avatar } = useGetAvatarToken({ symbol: data.chain });

  const changeNetwork = async () => {
    try {
      if (!ethereumWindow) {
        warningDialog.openDialog({
          content: intl.formatMessage({
            id: "no_crypto_wallet_found",
          }),
        });
        throw new Error("No crypto wallet found");
      }
      try {
        await ethereumWindow.request({
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId: `0x${Number(data.chainId).toString(16)}`,
            },
          ],
        });
      } catch (switchError: any) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await ethereumWindow.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainName: data.name,
                  rpcUrls: data.rpc,
                  blockExplorerUrls: data.explorers
                    ? data.explorers.map((v) => v.url)
                    : undefined,
                  nativeCurrency: data.nativeCurrency
                    ? data.nativeCurrency
                    : undefined,
                  chainId: `0x${Number(data.chainId).toString(16)}`,
                },
              ],
            });
            try {
              await ethereumWindow.request({
                method: "wallet_switchEthereumChain",
                params: [
                  {
                    chainId: `0x${Number(data.chainId).toString(16)}`,
                  },
                ],
              });
            } catch (error) {
              warningDialog.openDialog({
                content: intl.formatMessage({
                  id: "switch_network_fail",
                }),
              });
            }
          } catch (addError) {
            console.log("addError", addError);
          }
        }
        // handle other "switch" errors
      }
    } catch (err) {}
  };

  return (
    <Grid item xl={3} lg={4} sm={6}>
      <Paper
        sx={{
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          position: "relative",
          backgroundImage: "none",
        }}
      >
        <Tooltip
          arrow
          placement="bottom"
          title={
            <Typography variant="body2">
              <FormattedMessage id="official_site" />
            </Typography>
          }
        >
          <Box
            sx={{
              position: "absolute",
              right: 12,
              top: 12,
            }}
          >
            <a href={data?.infoURL} target={"__blank"}>
              <IconLink />
            </a>
          </Box>
        </Tooltip>
        <Box
          sx={{
            flexDirection: "column",
            alignItems: "center",
          }}
          width="100%"
          display="flex"
        >
          <Avatar
            sx={{
              height: 60,
              width: 60,
              border: 2,
              borderColor: "divider",
            }}
            src={data.logo || avatar}
          />
          <Box flex={1} marginTop={1}>
            <Typography
              sx={{
                textAlign: "center",
                height: 50,
              }}
              variant="h6"
            >
              {data.name}
            </Typography>
          </Box>
          <Box width="100%" marginTop={2} gap={1}>
            <Box
              flex={1}
              display="flex"
              sx={{ justifyContent: "space-between" }}
            >
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                <FormattedMessage id="chainId" />
              </Typography>
              <Typography variant="subtitle1">{data.chainId}</Typography>
            </Box>
            <Box
              marginTop={2}
              flex={1}
              display="flex"
              sx={{ justifyContent: "space-between" }}
            >
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                <FormattedMessage id="currency" />
              </Typography>
              <Typography variant="subtitle1">{data.chain}</Typography>
            </Box>
          </Box>
        </Box>
        {walletAddress ? (
          <Button
            variant="outlined"
            sx={{ marginTop: 3, width: "100%" }}
            onClick={() => {
              changeNetwork();
            }}
            disabled={data.chainId === networkInfo?.chainId}
          >
            <FormattedMessage id="add_to_wallet" />
          </Button>
        ) : (
          <OpenState>
            {({ open, setOpen }) => {
              return (
                <>
                  <Button
                    variant="outlined"
                    sx={{ marginTop: 3, borderRadius: 40 }}
                    onClick={() => setOpen(true)}
                  >
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
      </Paper>
    </Grid>
  );
};
export default ChainCard;
