import { Box, Button, Dialog, Grid, Typography } from "@mui/material";
import {
  BinanceLogo,
  MetaMaskLogo,
  SavePalLogo,
  WalletConnect,
} from "../../svg";
import useGeneralHook from "../hook/useGeneralHook";
import { connectWallet } from "./reducer/walletReducer";

interface Props {
  open: boolean;
  onClose(): void;
}

const ConnectionWalletDialog = (props: Props) => {
  const { open, onClose } = props;
  const { warningDialog, openSnackbar, dispatch } = useGeneralHook();

  const LIST_WALLET = [
    {
      icon: <img src={MetaMaskLogo} alt="metamask_logo" />,
      name: "Meta Mask",
      onClick: () => {
        dispatch(
          connectWallet(warningDialog, openSnackbar, () => {
            onClose();
          })
        );
      },
    },
    {
      icon: <BinanceLogo />,
      name: "Binance chain Wallet",
    },
    {
      icon: <SavePalLogo />,
      name: "SafePal Wallet",
    },
    {
      icon: <img src={WalletConnect} alt="wallet_connect" />,
      name: "Wallet Connect",
    },
  ];

  return (
    <Dialog
      title="select_wallet"
      open={open}
      onClose={onClose}
      PaperProps={{
        style: { width: 720 },
      }}
    >
      <Box padding={3}>
        <Grid container spacing={4}>
          {LIST_WALLET.map((item, index) => {
            return (
              <Grid item key={index} xs={6}>
                <Button
                  style={{ height: 64 }}
                  fullWidth
                  variant="text"
                  onClick={item.onClick}
                >
                  {item.icon}
                  <Typography variant="subtitle1" style={{ marginLeft: 12 }}>
                    {item.name}
                  </Typography>
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Dialog>
  );
};

export default ConnectionWalletDialog;
