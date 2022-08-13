import { Avatar, Box, Button, Card, Typography } from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FormattedMessage } from "react-intl";
import ShortText from "../../common/components/ShortText";
import useGeneralHook from "../../common/hook/useGeneralHook";
import { DonateImage, IconCopy } from "../../svg";
const LIST_DONATE = [
  {
    icon: "https://www.covalenthq.com/static/images/icons/display-icons/binance-coin-bnb-logo.png",
    key: "BNB",
    address: "0x2169ce84571a37bf3636ac1bd858987736af6666",
  },
  {
    icon: "https://logos.covalenthq.com/tokens/1/0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0.png",
    key: "MATIC",
    address: "0x2169ce84571a37bf3636ac1bd858987736af6666",
  },
  {
    icon: "https://logos.covalenthq.com/tokens/1/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
    key: "USDT, USDC",
    address: "0x2169ce84571a37bf3636ac1bd858987736af6666",
  },
  {
    icon: "https://www.covalenthq.com/static/images/icons/display-icons/ethereum-eth-logo.png",
    key: "ETH",
    address: "0x2169ce84571a37bf3636ac1bd858987736af6666",
  },
];
interface Props {}

const DonatePage = (props: Props) => {
  const { openSnackbar, intl } = useGeneralHook();
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100%"
      padding={5}
    >
      <Box flex={1}>
        <Typography variant="h4">
          <FormattedMessage id="donate" />
        </Typography>
        <Typography variant="body1" style={{ margin: "24px 0px 40px 0px" }}>
          <FormattedMessage id="donate_content_2" />
        </Typography>
        {LIST_DONATE.map((item, index) => {
          return (
            <Card
              key={index}
              style={{
                padding: "16px 24px",
                display: "flex",
                alignItems: "center",
                marginBottom: 12,
                borderRadius: 12,
                maxWidth: 460,
              }}
            >
              <Avatar
                style={{ height: 46, width: 46, marginRight: 16 }}
                src={item.icon}
              />
              <Typography variant="body2" style={{ flex: 1 }}>
                {item.key}
              </Typography>
              <CopyToClipboard
                text={item.address}
                onCopy={() => {
                  openSnackbar({
                    message: intl.formatMessage({ id: "copied" }),
                  });
                }}
              >
                <Button endIcon={<IconCopy />} size="small" color="info">
                  <Typography variant="caption">
                    <ShortText text={item.address} />
                  </Typography>
                </Button>
              </CopyToClipboard>
            </Card>
          );
        })}
      </Box>
      <Box flex={1}>
        <img src={DonateImage} alt="donateImg" />
      </Box>
    </Box>
  );
};

export default DonatePage;
