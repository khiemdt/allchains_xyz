import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Box,
  Button,
  Collapse,
  IconButton,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { FormattedMessage, FormattedNumber } from "react-intl";
import { Link, createSearchParams } from "react-router-dom";
import useSWR from "swr";
import CurrencyFormatted from "../../../common/components/CurrencyFormatted";
import ShortText from "../../../common/components/ShortText";
import TableCustom from "../../../common/components/TableCustom";
import { DATE_TIME_FORMAT, some } from "../../../common/constants";
import useGeneralHook from "../../../common/hook/useGeneralHook";
import { ROUTES } from "../../../layout/constants";
import ReportRoundedIcon from "@mui/icons-material/ReportRounded";
import { AppState } from "../../../redux/reducer";
import { shallowEqual, useSelector } from "react-redux";
const RowCustom = ({
  data,
  lastChild,
  walletAddress,
  onSpamToken,
  walletAddressMain,
}) => {
  const { dispatch, API_PATHS, fetchThunk } = useGeneralHook();
  const [open, setOpen] = useState(false);

  const { data: transactionsData, isValidating } = useSWR(
    open && walletAddress
      ? API_PATHS.getTransactions(
          data.chain_id,
          walletAddress,
          data.contract_address
        )
      : null,
    async (url) => {
      const json = await dispatch(fetchThunk(url));
      return json.data?.items?.reduce((acc, item) => {
        return [...acc, ...item.transfers];
      }, []);
    },
    {
      refreshInterval: 120000,
      revalidateOnFocus: false,
    }
  );

  return (
    <>
      <TableRow style={{ border: lastChild ? "none" : undefined }}>
        <TableCell style={{ padding: "10px 8px" }}>
          <Avatar
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              margin: "auto",
            }}
            src={data.logo_url}
            alt="logo_url"
            variant="rounded"
          >
            &nbsp;
          </Avatar>
        </TableCell>
        <TableCell style={{ padding: "10px 8px" }}>
          <Typography variant="body2">{data.contract_name}</Typography>
        </TableCell>
        <TableCell style={{ padding: "10px 8px" }}>
          <Typography variant="subtitle2">
            {data.contract_ticker_symbol}
          </Typography>
        </TableCell>
        <TableCell style={{ padding: "10px 8px" }}>
          <Typography variant="inherit">
            <ShortText text={data.contract_address} />
          </Typography>
        </TableCell>
        <TableCell style={{ padding: "10px 8px" }}>
          <Typography variant="body2">
            <CurrencyFormatted value={data.quote_rate} />
          </Typography>
        </TableCell>
        <TableCell style={{ padding: "10px 8px" }}>
          <Typography variant="body2">
            <FormattedNumber
              value={data.balanceCalculate || 0}
              maximumFractionDigits={4}
            />
          </Typography>
        </TableCell>
        <TableCell style={{ padding: "10px 8px" }}>
          <Typography variant="body2" color="primary">
            <CurrencyFormatted value={data.quote} />
          </Typography>
        </TableCell>
        <TableCell style={{ padding: "10px 8px" }}>
          <LoadingButton
            loading={isValidating && !transactionsData}
            // variant="outlined"
            style={{ width: 100 }}
            onClick={() => setOpen(!open)}
          >
            <FormattedMessage id="get" />
          </LoadingButton>
        </TableCell>
        <TableCell style={{ padding: "10px 8px" }}>
          <Link
            to={{
              pathname: `/${ROUTES.cryptocurrencies.index}`,
              search: createSearchParams({
                symbol: data.contract_ticker_symbol,
                contract: data.contract_address,
              }).toString(),
            }}
          >
            <Button variant="text" style={{ width: 100 }}>
              <FormattedMessage id="detail" />
            </Button>
          </Link>
        </TableCell>
        {onSpamToken && (
          <TableCell style={{ padding: "10px 8px" }}>
            <IconButton
              size="small"
              onClick={() => {
                onSpamToken(data);
              }}
            >
              <ReportRoundedIcon />
            </IconButton>
          </TableCell>
        )}
      </TableRow>
      <TableRow style={{ border: lastChild ? "none" : undefined, padding: 0 }}>
        <TableCell
          style={{
            padding: 0,
            border: lastChild ? "none" : undefined,
          }}
          colSpan={9}
        >
          <Collapse in={open} timeout="auto">
            <Box sx={{ bgcolor: "background.default", padding: 2 }}>
              <TableCustom
                loading={isValidating && !transactionsData}
                dataSource={transactionsData}
                skeletonRow={4}
                columns={[
                  {
                    title: "time_stamp",
                    render: (record) => {
                      return (
                        record.block_signed_at &&
                        moment(record.block_signed_at).format(DATE_TIME_FORMAT)
                      );
                    },
                  },
                  {
                    title: "tx_hash",
                    render: (record) => {
                      return (
                        <Typography variant="inherit" color="primary">
                          <ShortText text={record.tx_hash} />
                        </Typography>
                      );
                    },
                  },
                  {
                    title: "from",
                    render: (record) => {
                      return (
                        <ShortText
                          text={
                            record.from_address_label || record.from_address
                          }
                        />
                      );
                    },
                  },
                  {
                    title: "",
                    render: (record) => {
                      if (record.transfer_type === "IN") {
                        return (
                          <Button
                            color="success"
                            variant="text"
                            sx={{ bgcolor: "success.light" }}
                          >
                            <FormattedMessage id="in" />
                          </Button>
                        );
                      }
                      return (
                        <Button
                          color="warning"
                          variant="text"
                          sx={{ bgcolor: "warning.light" }}
                        >
                          <FormattedMessage id="out" />
                        </Button>
                      );
                    },
                  },
                  {
                    title: "to",
                    render: (record) => {
                      return (
                        <ShortText
                          text={record.to_address_label || record.to_address}
                        />
                      );
                    },
                  },
                  {
                    title: "value",
                    render: (record) => {
                      return (
                        <Typography variant="inherit" color="primary">
                          <FormattedNumber
                            value={Number(
                              parseInt(record?.delta) /
                                Math.pow(10, record?.contract_decimals)
                            )}
                            maximumFractionDigits={4}
                          />
                        </Typography>
                      );
                    },
                  },
                ]}
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const RowSkeleton = ({ lastChild, onSpamToken }) => {
  return (
    <>
      <TableRow style={{ border: lastChild ? "none" : undefined }}>
        <TableCell style={{ display: "flex", justifyContent: "center" }}>
          <Skeleton variant="rectangular" style={{ height: 40, width: 40 }} />
        </TableCell>
        <TableCell>
          <Skeleton width={50} />
        </TableCell>
        <TableCell>
          <Skeleton width={50} />
        </TableCell>
        <TableCell>
          <Skeleton width={200} />
        </TableCell>
        <TableCell>
          <Skeleton width={50} />
        </TableCell>
        <TableCell>
          <Skeleton width={50} />
        </TableCell>
        <TableCell>
          <Skeleton width={50} />
        </TableCell>
        <TableCell align="center">
          <Skeleton width={50} style={{ display: "inline-flex" }} />
        </TableCell>
        <TableCell align="center">
          <Skeleton width={50} style={{ display: "inline-flex" }} />
        </TableCell>
        {onSpamToken && (
          <TableCell align="center">
            <Skeleton width={16} style={{ display: "inline-flex" }} />
          </TableCell>
        )}
      </TableRow>
    </>
  );
};

interface Props {
  data: some[];
  loading?: boolean;
  walletAddress?: string;
  onSpamToken?: (value: some) => void;
}

const TableBox = (props: Props) => {
  const walletAddressMain = useSelector(
    (state: AppState) => state.wallet.walletAddress,
    shallowEqual
  );
  const { data, loading, walletAddress, onSpamToken } = props;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ padding: "10px 10px" }} align="center">
              <Typography variant="body1">
                <FormattedMessage id="icon" />
              </Typography>
            </TableCell>
            <TableCell style={{ padding: "10px 10px" }}>
              <Typography variant="body1">
                <FormattedMessage id="token" />
              </Typography>
            </TableCell>
            <TableCell style={{ padding: "10px 10px" }}>
              <Typography variant="body1">
                <FormattedMessage id="symbol" />
              </Typography>
            </TableCell>
            <TableCell style={{ padding: "10px 10px" }}>
              <Typography variant="body1">
                <FormattedMessage id="contract" />
              </Typography>
            </TableCell>
            <TableCell style={{ padding: "10px 10px" }}>
              <Typography variant="body1">
                <FormattedMessage id="price" />
              </Typography>
            </TableCell>
            <TableCell style={{ padding: "10px 10px" }}>
              <Typography variant="body1">
                <FormattedMessage id="balance" />
              </Typography>
            </TableCell>
            <TableCell style={{ padding: "10px 10px" }}>
              <Typography variant="body1" color="primary">
                <FormattedMessage id="value" />
              </Typography>
            </TableCell>
            <TableCell style={{ padding: "10px 10px", width: 120 }}>
              <Typography variant="body1">
                <FormattedMessage id="transactions" />
              </Typography>
            </TableCell>
            <TableCell style={{ padding: "10px 10px", width: 120 }} />
            {walletAddressMain && (
              <TableCell style={{ padding: "10px 10px" }} />
            )}
          </TableRow>
        </TableHead>
        <TableBody sx={{ "&:last-child": { border: "none" } }}>
          {loading
            ? Array(5)
                .fill(0)
                .map((_, index) => {
                  return (
                    <RowSkeleton
                      key={index}
                      lastChild={index === data.length - 1}
                      onSpamToken={onSpamToken}
                    />
                  );
                })
            : data.map((item, index) => {
                return (
                  <RowCustom
                    key={item.id || index}
                    data={item}
                    lastChild={index === data.length - 1}
                    walletAddress={walletAddress}
                    onSpamToken={onSpamToken}
                    walletAddressMain={walletAddressMain}
                  />
                );
              })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableBox;
