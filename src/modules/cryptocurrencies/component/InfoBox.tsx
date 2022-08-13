/* eslint-disable react/style-prop-object */
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import {
  Avatar,
  Button,
  Grid,
  IconButton,
  LinearProgress,
  linearProgressClasses,
  Paper,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box, darken, styled } from "@mui/system";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FormattedMessage, FormattedNumber } from "react-intl";
import CurrencyFormatted from "../../../common/components/CurrencyFormatted";
import ShortText from "../../../common/components/ShortText";
import { some } from "../../../common/constants";
import useGeneralHook from "../../../common/hook/useGeneralHook";
import { IconCopy, MetaMaskLogo } from "../../../svg";

const Chip = styled(Box)(({ theme }) => ({
  backgroundColor: darken(theme.palette.background.paper, 0.2),
  padding: "2px 4px",
  borderRadius: 4,
}));
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.primary.main,
  },
}));

const SkeletonLeft = () => {
  return (
    <Box flex={1}>
      <Skeleton width={50} />
      <Box display="flex" alignItems="center">
        <Skeleton
          variant="rectangular"
          style={{ height: 32, width: 32, marginRight: 16 }}
        />
        <Skeleton width={250} height={36} />
        <Skeleton
          variant="rectangular"
          style={{ height: 36, width: 36, marginLeft: 8 }}
        />
      </Box>
      <Skeleton
        width={250}
        style={{ marginTop: 8, marginBottom: 32, height: 30 }}
      />
      {/* ------- */}
      <Skeleton width={50} style={{ marginTop: 12, marginBottom: 4 }} />
      <Skeleton width={150} height={30} />
      {/* ------- */}
      <Skeleton width={50} style={{ marginTop: 12, marginBottom: 4 }} />
      <Skeleton width={350} height={30} />
      {/* ------- */}
      <Skeleton width={80} style={{ marginTop: 12, marginBottom: 4 }} />
      <Skeleton width={350} height={30} />
      {/* ------- */}
      <Skeleton width={70} style={{ marginTop: 12, marginBottom: 4 }} />
      <Skeleton width={350} height={30} />
      {/* ------- */}
      <Skeleton width={50} style={{ marginTop: 12, marginBottom: 4 }} />
      <Skeleton width={350} height={30} />
    </Box>
  );
};

const SkeletonRight = () => {
  return (
    <Box flex={1}>
      <Skeleton width={50} />
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Skeleton width={180} height={36} />
          <Skeleton width={50} style={{ marginLeft: 8 }} />
        </Box>
        <Box>
          {/* <Typography variant="caption" color="textSecondary">
         0.00005406 BTC
       </Typography> */}
        </Box>
      </Box>
      <Box display="flex" alignItems="center" marginTop={2} marginBottom={4}>
        <Skeleton width={100} />
        <Box flex={1} marginX={1}>
          <Skeleton width={"100%"} />
        </Box>
        <Skeleton width={100} />
      </Box>
      <Box
        padding={3}
        bgcolor="grey.200"
        borderRadius={1}
        border={1}
        borderColor={"divider"}
        color="textSecondary"
      >
        <Grid container rowSpacing={2} columnSpacing={10}>
          <Grid
            item
            display="flex"
            alignItems="center"
            flexDirection="row"
            xs={6}
          >
            <Skeleton width={100} />
          </Grid>
          <Grid
            item
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            flexDirection="row"
            xs={6}
          >
            <Skeleton width={150} />
          </Grid>
          <Grid
            item
            display="flex"
            alignItems="center"
            flexDirection="row"
            xs={6}
          >
            <Skeleton width={120} />
          </Grid>
          <Grid
            item
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            flexDirection="row"
            xs={6}
          >
            <Skeleton width={180} />
          </Grid>{" "}
          <Grid
            item
            display="flex"
            alignItems="center"
            flexDirection="row"
            xs={6}
          >
            <Skeleton width={150} />
          </Grid>
          <Grid
            item
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            flexDirection="row"
            xs={6}
          >
            <Skeleton width={100} />
          </Grid>{" "}
          <Grid
            item
            display="flex"
            alignItems="center"
            flexDirection="row"
            xs={6}
          >
            <Skeleton width={100} />
          </Grid>
          <Grid
            item
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            flexDirection="row"
            xs={6}
          >
            <Skeleton width={120} />
          </Grid>{" "}
          <Grid
            item
            display="flex"
            alignItems="center"
            flexDirection="row"
            xs={6}
          >
            <Skeleton width={120} />
          </Grid>
          <Grid
            item
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            flexDirection="row"
            xs={6}
          >
            <Skeleton width={150} />
          </Grid>{" "}
          <Grid
            item
            display="flex"
            alignItems="center"
            flexDirection="row"
            xs={6}
          >
            <Skeleton width={100} />
          </Grid>
          <Grid
            item
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            flexDirection="row"
            xs={6}
          >
            <Skeleton width={150} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
interface Props {
  data?: some;
  priceDetailData?: some;
}
const InfoBox = (props: Props) => {
  const { data, priceDetailData } = props;
  const { openSnackbar, intl } = useGeneralHook();
  const [open, setOpen] = useState(false);
  return (
    <Paper style={{ padding: 16, display: "flex", gap: 40 }}>
      {data ? (
        <Box flex={1}>
          <Typography variant="caption" color="textSecondary">
            <FormattedMessage id="rank" values={{ id: data.market_cap_rank }} />
          </Typography>
          <Box display="flex" alignItems="center">
            <Avatar
              src={data.image?.large}
              style={{ height: 32, width: 32, marginRight: 16 }}
            >
              &nbsp;
            </Avatar>
            <Typography variant="h4">
              {data.name}({data.symbol})
            </Typography>
            <Tooltip
              arrow
              placement="bottom"
              title={
                <Typography variant="body2">
                  <FormattedMessage id="add_to_watch_list" />
                </Typography>
              }
            >
              <Button
                sx={{
                  minWidth: "unset",
                  marginLeft: 1,
                  padding: 0,
                  width: 36,
                  bgcolor: "grey.300",
                }}
                variant="text"
              >
                <StarOutlineRoundedIcon />
              </Button>
            </Tooltip>
          </Box>{" "}
          <Box
            display="flex"
            alignItems="center"
            marginTop={2}
            marginBottom={4}
          >
            <Chip sx={{ marginRight: 1, bgcolor: "grey.200" }}>
              <Typography variant="caption" color="textSecondary">
                Coin
              </Typography>
            </Chip>
            <Chip sx={{ bgcolor: "grey.200" }}>
              <Typography variant="caption" color="textSecondary">
                On 956,848 watchlists
              </Typography>
            </Chip>
          </Box>
          {/* ------- */}
          <Typography
            variant="caption"
            color="textSecondary"
            style={{ marginBottom: 4 }}
            component="div"
          >
            <FormattedMessage id="contract" />
          </Typography>
          <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
            <Button
              startIcon={
                <CopyToClipboard
                  text={data.platforms?.ethereum}
                  onCopy={() => {
                    openSnackbar({
                      message: intl.formatMessage({ id: "copied" }),
                    });
                  }}
                >
                  <IconCopy />
                </CopyToClipboard>
              }
              endIcon={
                data.image?.small && (
                  <Avatar
                    src={MetaMaskLogo}
                    style={{ height: 18, width: 18 }}
                    variant="rounded"
                  >
                    &nbsp;
                  </Avatar>
                )
              }
              size="small"
              color="info"
            >
              <Typography variant="caption">
                <ShortText text={data.platforms?.ethereum} />
              </Typography>
            </Button>
          </Box>
          {/* ------- */}
          <Typography
            variant="caption"
            color="textSecondary"
            style={{ marginTop: 12, marginBottom: 4 }}
            component="div"
          >
            <FormattedMessage id="website" />
          </Typography>
          <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
            {data.links?.homepage?.map((item, index) => {
              return (
                item && (
                  <a href={item} target="_blank" rel="noreferrer" key={item}>
                    <Button size="small" color="info">
                      <Typography variant="caption">{item}</Typography>
                    </Button>
                  </a>
                )
              );
            })}
          </Box>
          {/* ------- */}
          <Typography
            variant="caption"
            color="textSecondary"
            style={{ marginTop: 12, marginBottom: 4 }}
            component="div"
          >
            <FormattedMessage id="explorers" />
          </Typography>
          <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
            {data.links?.blockchain_site
              ?.filter((link) => link)
              .map((item) => {
                return (
                  <a href={item} target="_blank" rel="noreferrer" key={item}>
                    <Button size="small" color="info">
                      <Typography variant="caption">
                        <ShortText text={item} />
                      </Typography>
                    </Button>{" "}
                  </a>
                );
              })}
          </Box>
          {/* ------- */}
          <Typography
            variant="caption"
            color="textSecondary"
            style={{ marginTop: 12, marginBottom: 4 }}
            component="div"
          >
            <FormattedMessage id="community" />
          </Typography>
          <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
            {data.links?.chat_url
              ?.filter((link) => link)
              .map((link: string) => {
                return (
                  <a href={link} target="_blank" rel="noreferrer" key={link}>
                    <Button size="small" color="info">
                      <Typography variant="caption">{link}</Typography>
                    </Button>
                  </a>
                );
              })}
          </Box>
          {/* ------- */}
          <Typography
            variant="caption"
            color="textSecondary"
            style={{ marginTop: 12, marginBottom: 4 }}
            component="div"
          >
            <FormattedMessage id="tag" />
          </Typography>
          <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
            {data.categories
              ?.filter((c) => c)
              .slice(0, open ? undefined : 3)
              .map((item) => {
                return (
                  <Button size="small" color="info" key={item}>
                    <Typography variant="caption">{item}</Typography>
                  </Button>
                );
              })}
            {data.categories?.length > 3 && (
              <Button
                size="small"
                variant="outlined"
                onClick={() => {
                  setOpen(!open);
                }}
              >
                <Typography variant="caption">
                  <FormattedMessage id={open ? "view_less" : "view_all"} />
                </Typography>
              </Button>
            )}
          </Box>
        </Box>
      ) : (
        <SkeletonLeft />
      )}
      {priceDetailData ? (
        <Box flex={1}>
          <Typography variant="caption" color="textSecondary">
            {priceDetailData?.name}({priceDetailData.symbol})
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center">
              <Typography variant="h4">
                <CurrencyFormatted value={priceDetailData.current_price} />
              </Typography>
              <Typography
                variant="body2"
                color={true ? "success.main" : "error.main"}
                display="flex"
                alignItems="center"
              >
                <Box
                  height={0}
                  alignItems="center"
                  display="flex"
                  marginRight={-1}
                >
                  {true ? (
                    <ArrowDropUpRoundedIcon color="inherit" fontSize="large" />
                  ) : (
                    <ArrowDropDownRoundedIcon
                      color="inherit"
                      fontSize="large"
                    />
                  )}
                </Box>
                <FormattedNumber
                  value={
                    (priceDetailData.current_price - priceDetailData.low_24h) /
                    priceDetailData.low_24h
                  }
                  style="percent"
                  maximumFractionDigits={2}
                />
              </Typography>
            </Box>
            <Box>
              {/* <Typography variant="caption" color="textSecondary">
               0.00005406 BTC
             </Typography> */}
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            marginTop={2}
            marginBottom={4}
          >
            <Typography variant="caption" color="textSecondary">
              <FormattedMessage id="low" />
              :&nbsp;
            </Typography>
            <Typography variant="caption">
              <CurrencyFormatted value={priceDetailData.low_24h} />
            </Typography>
            <Box flex={1} marginX={1}>
              <BorderLinearProgress
                variant="determinate"
                value={
                  (priceDetailData.low_24h * 100) / priceDetailData.high_24h
                }
              />{" "}
            </Box>
            <Typography variant="caption" color="textSecondary">
              <FormattedMessage id="high" />
              :&nbsp;
            </Typography>
            <Typography variant="caption">
              <CurrencyFormatted value={priceDetailData.high_24h} />
            </Typography>
          </Box>
          <Box
            padding={3}
            bgcolor="grey.200"
            borderRadius={1}
            border={1}
            borderColor={"divider"}
            color="textSecondary"
          >
            <Grid container rowSpacing={2} columnSpacing={10}>
              <Grid
                item
                display="flex"
                alignItems="center"
                flexDirection="row"
                xs={6}
              >
                <Typography variant="body2" color="textSecondary">
                  <FormattedMessage id="market_cap" />
                </Typography>
                <IconButton style={{ marginLeft: 8, padding: 0 }}>
                  <HelpOutlineOutlinedIcon sx={{ color: "text.secondary" }} />
                </IconButton>
              </Grid>
              <Grid
                item
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
                flexDirection="row"
                xs={6}
              >
                <Box
                  height={0}
                  alignItems="center"
                  display="flex"
                  marginRight={-1}
                >
                  {priceDetailData?.market_cap_change_percentage_24h >= 0 ? (
                    <ArrowDropUpRoundedIcon color="success" fontSize="large" />
                  ) : (
                    <ArrowDropDownRoundedIcon color="error" fontSize="large" />
                  )}
                </Box>
                <Typography
                  variant="caption"
                  color={
                    priceDetailData?.market_cap_change_percentage_24h >= 0
                      ? "success.main"
                      : "error.main"
                  }
                >
                  <FormattedNumber
                    value={
                      priceDetailData.market_cap_change_percentage_24h / 100 ||
                      0
                    }
                    style="percent"
                  />
                </Typography>
                &emsp;
                <Typography variant="subtitle2">
                  <CurrencyFormatted
                    value={priceDetailData?.market_cap_change_24h}
                  />
                </Typography>
              </Grid>
              <Grid
                item
                display="flex"
                alignItems="center"
                flexDirection="row"
                xs={6}
              >
                <Typography variant="body2" color="textSecondary">
                  <FormattedMessage id="trading_volume" />
                </Typography>
                <Box
                  sx={{
                    paddingX: 1,
                    bgcolor: "grey.300",
                    borderRadius: 1,
                    marginLeft: 1,
                  }}
                >
                  <Typography variant="caption">
                    <FormattedMessage id="24h" />
                  </Typography>
                </Box>
                <IconButton style={{ marginLeft: 8, padding: 0 }}>
                  <HelpOutlineOutlinedIcon sx={{ color: "text.secondary" }} />
                </IconButton>
              </Grid>
              <Grid
                item
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
                flexDirection="row"
                xs={6}
              >
                <Box
                  height={0}
                  alignItems="center"
                  display="flex"
                  marginRight={-1}
                >
                  {priceDetailData.total_volume >= 0 ? (
                    <ArrowDropUpRoundedIcon color="success" fontSize="large" />
                  ) : (
                    <ArrowDropDownRoundedIcon color="error" fontSize="large" />
                  )}
                </Box>
                <Typography
                  variant="caption"
                  color={
                    priceDetailData.total_volume >= 0
                      ? "success.main"
                      : "error.main"
                  }
                >
                  <FormattedNumber
                    value={priceDetailData.total_volume || 0}
                    style="percent"
                  />
                </Typography>
                &emsp;
                <Typography variant="subtitle2">
                  <CurrencyFormatted value={priceDetailData.total_volume} />
                </Typography>
              </Grid>{" "}
              <Grid
                item
                display="flex"
                alignItems="center"
                flexDirection="row"
                xs={6}
              >
                <Typography variant="body2" color="textSecondary">
                  <FormattedMessage id="fully_valuation" />
                </Typography>
                <IconButton style={{ marginLeft: 8, padding: 0 }}>
                  <HelpOutlineOutlinedIcon sx={{ color: "text.secondary" }} />
                </IconButton>
              </Grid>
              <Grid
                item
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
                flexDirection="row"
                xs={6}
              >
                <Box
                  height={0}
                  alignItems="center"
                  display="flex"
                  marginRight={-1}
                >
                  {priceDetailData.fully_diluted_valuation >= 0 ? (
                    <ArrowDropUpRoundedIcon color="success" fontSize="large" />
                  ) : (
                    <ArrowDropDownRoundedIcon color="error" fontSize="large" />
                  )}
                </Box>
                <Typography
                  variant="caption"
                  color={
                    priceDetailData.fully_diluted_valuation >= 0
                      ? "success.main"
                      : "error.main"
                  }
                >
                  <FormattedNumber
                    value={priceDetailData.fully_diluted_valuation || 0}
                    style="percent"
                  />
                </Typography>
                &emsp;
                <Typography variant="subtitle2">
                  <CurrencyFormatted
                    value={priceDetailData.fully_diluted_valuation}
                  />
                </Typography>
              </Grid>
              <Grid
                item
                display="flex"
                alignItems="center"
                flexDirection="row"
                xs={6}
              >
                <Typography variant="body2" color="textSecondary">
                  <FormattedMessage id="total_supply" />
                </Typography>
                <IconButton style={{ marginLeft: 8, padding: 0 }}>
                  <HelpOutlineOutlinedIcon sx={{ color: "text.secondary" }} />
                </IconButton>
              </Grid>
              <Grid
                item
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
                flexDirection="row"
                xs={6}
              >
                <Typography variant="subtitle2">
                  <FormattedNumber value={priceDetailData?.total_supply || 0} />
                </Typography>
              </Grid>
              {/*--------- */}
              <Grid
                item
                display="flex"
                alignItems="center"
                flexDirection="row"
                xs={6}
              >
                <Typography variant="body2" color="textSecondary">
                  <FormattedMessage id="circulating_supply" />
                </Typography>

                <IconButton style={{ marginLeft: 8, padding: 0 }}>
                  <HelpOutlineOutlinedIcon sx={{ color: "text.secondary" }} />
                </IconButton>
              </Grid>
              <Grid
                item
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
                flexDirection="row"
                xs={6}
              >
                <Typography variant="subtitle2">
                  <FormattedNumber
                    value={priceDetailData?.circulating_supply || 0}
                  />
                </Typography>
              </Grid>
              {/*--------- */}
              <Grid
                item
                display="flex"
                alignItems="center"
                flexDirection="row"
                xs={6}
              >
                <Typography variant="body2" color="textSecondary">
                  <FormattedMessage id="max_supply" />
                </Typography>

                <IconButton style={{ marginLeft: 8, padding: 0 }}>
                  <HelpOutlineOutlinedIcon sx={{ color: "text.secondary" }} />
                </IconButton>
              </Grid>
              <Grid
                item
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
                flexDirection="row"
                xs={6}
              >
                <Typography variant="subtitle2">
                  <FormattedNumber value={priceDetailData?.max_supply || 0} />
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      ) : (
        <SkeletonRight />
      )}
    </Paper>
  );
};
export default InfoBox;
