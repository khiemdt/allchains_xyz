import { LoadingButton } from "@mui/lab";
import {
  alpha,
  Avatar,
  Box,
  Button,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import { ethers } from "ethers";
import moment from "moment";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FormattedMessage } from "react-intl";
import { Outlet, useParams } from "react-router";
import { Link } from "react-router-dom";
import { setInterval } from "timers";
import CurrencyFormatted from "../../common/components/CurrencyFormatted";
import LoadingIcon from "../../common/components/LoadingIcon";
import { DATE_TIME_FORMAT, some } from "../../common/constants";
import useFilterHook from "../../common/hook/useFilterHook";
import useGeneralHook from "../../common/hook/useGeneralHook";
import { ALPHABET_REGEX } from "../../config/regex";
import { providerEthers } from "../../constants";
import { ROUTES } from "../../layout/constants";
import { IconCopy } from "../../svg";
import { MAINNET } from "./constants";
import SPAM_TOKENS from "../../common/SPAM_TOKEN.json";

const LIST_ROUTES = [
  { title: "portfolio", path: "" },
  { title: "NFT", path: ROUTES.profile.nft },
  { title: "history", path: ROUTES.profile.history },
  { title: "approval", path: ROUTES.profile.approval },
];

interface DataProfileProps {
  data: some[];
  listChain: some[];
  loading?: boolean;
  revalidate(): void;
}

const DataProfileContext = createContext<DataProfileProps>({
  loading: false,
  revalidate: () => {},
  data: [],
  listChain: [],
});

export const useDataProfile = () => {
  return useContext(DataProfileContext);
};

const CountTime = ({ time }) => {
  const [tick, setTick] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((old) => !old);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const seconds = 120 - moment().diff(time, "seconds");

  return (
    <FormattedMessage
      key={`${tick}`}
      id={"data_update_in"}
      values={{
        num: seconds >= 0 ? seconds : 0,
        time: "sec",
      }}
    />
  );
};
interface Props {}

const ProfilePage = (props: Props) => {
  const {
    dispatch,
    API_PATHS,
    fetchThunk,
    openSnackbar,
    intl,
    theme,
    navigate,
    warningDialog,
  } = useGeneralHook();
  const { filter } = useFilterHook();
  const params = useParams<{ walletAddress?: string; tab?: string }>();
  const { walletAddress } = params;
  const [time, setTime] = useState(moment());
  const [data, setData] = useState<some[]>([]);
  const [loading, setLoading] = useState(false);
  const refAPI = useRef<any>(null);

  const getInfoAddressData = useCallback(
    async (initialLoad: boolean, count: number) => {
      const url = walletAddress ? API_PATHS.getInfo(walletAddress) : null;
      if (url) {
        if (initialLoad) {
          setLoading(true);
          clearTimeout(refAPI.current);
        }
        const json = await dispatch(fetchThunk(url));
        if (initialLoad) {
          setLoading(false);
        }
        if (count === 0) {
          setTime(moment());
        }
        setData(json.data?.balances || []);
        if (json.data?.completed || count >= 30) {
          refAPI.current = setTimeout(() => {
            getInfoAddressData(true, 0);
          }, 120000);
        } else {
          refAPI.current = setTimeout(() => {
            getInfoAddressData(false, count + 1);
          }, 1500);
        }
      } else {
        clearTimeout(refAPI.current);
        setLoading(false);
        setData([]);
      }
    },
    [API_PATHS, dispatch, fetchThunk, walletAddress]
  );

  const revalidate = () => {
    getInfoAddressData(true, 0);
  };

  const lastUpdate = data?.[0]?.updated_at;

  const filterSpamTokenData = useMemo(() => {
    return data?.map((value: some) => {
      return {
        ...value,
        items: value?.items?.filter(
          (item) =>
            item &&
            item.type !== "dust" &&
            ALPHABET_REGEX.test(item.contract_name) && // chỉ lấy các item rác dựa theo type và ký tự
            SPAM_TOKENS.findIndex(
              // lọc spam token
              (one) => one.contract_address === item.contract_address
            ) === -1
        ),
      };
    }) as some[];
  }, [data]);

  const dataFiltered = useCallback(
    (chainId?: string) => {
      return (
        filterSpamTokenData
          .filter((item: some) => {
            if (
              chainId // lọc các token null
                ? item.chain_id === chainId //lọc theo filter
                : true
            ) {
              return true;
            }
            return false;
          })
          .reduce((val: some[], cur: some) => {
            return [
              ...val,
              ...(cur?.items || [])?.map((v: some) => ({
                ...v,
                // tính balance của token
                balanceCalculate:
                  Number(
                    Number(v.balance) / Math.pow(10, v.contract_decimals)
                  ) || 0,
                chain_id: cur?.chain_id,
              })),
            ];
          }, [])
          .filter((item: some) => {
            if (
              SPAM_TOKENS.findIndex(
                // lọc spam token
                (one) => one.contract_address === item.contract_address
              ) === -1
            ) {
              return true;
            }
            return false;
          })
          .sort((a, b) => b.quote - a.quote) || []
      );
    },
    [filterSpamTokenData]
  );

  const listChain = useCallback(
    (chainId?: string) => {
      return (
        MAINNET.map((item: some) => {
          const balance = filterSpamTokenData
            ?.filter((one) => item?.chain_id === one?.chain_id)
            .reduce((val: number, cur: some) => {
              return (
                val +
                cur?.items.reduce((v, c) => {
                  return v + Number(c.quote);
                }, 0)
              );
            }, 0);
          return { ...item, balance } as some;
        }).filter((item) =>
          chainId ? item.chain_id === chainId : item?.balance > 0
        ) || []
      );
    },
    [filterSpamTokenData]
  );

  const getInfoAddress = useCallback(async () => {
    if (!walletAddress) {
      navigate("new", { replace: true });
    } else if (providerEthers) {
      try {
        await providerEthers
          ?.getBalance(walletAddress)
          .then((balanceResult) => {});
      } catch (error: any) {
        warningDialog.openDialog({
          content: intl.formatMessage({ id: "invalid_address" }),
        });
        navigate("/profile/new", { replace: true });
      }
    }
  }, [intl, navigate, walletAddress, warningDialog]);

  useEffect(() => {
    getInfoAddress();
  }, [getInfoAddress]);

  useEffect(() => {
    getInfoAddressData(true, 0);
  }, [getInfoAddressData]);

  return (
    <>
      <Box style={{ padding: "32px 42px" }}>
        <Paper
          style={{
            display: "flex",
            flexDirection: "row",
            padding: 16,
          }}
        >
          <Avatar style={{ height: 86, width: 86 }} />
          <Box marginLeft={2} flex={1}>
            <Box display="flex" alignItems="center">
              <Typography variant="subtitle1">{walletAddress}</Typography>
              <CopyToClipboard
                text={walletAddress}
                onCopy={() => {
                  openSnackbar({
                    message: intl.formatMessage({ id: "copied" }),
                  });
                }}
              >
                <Button
                  variant="outlined"
                  color="inherit"
                  sx={{
                    padding: 0,
                    minWidth: 40,
                    marginLeft: 2,
                    border: "none",
                  }}
                >
                  <IconCopy />
                </Button>
              </CopyToClipboard>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              style={{ marginBottom: 12 }}
            >
              <Typography variant="body2" color="textSecondary">
                <FormattedMessage id="last_update" />
                :&nbsp;
              </Typography>
              <Typography variant="body2">
                {lastUpdate && !loading && data ? (
                  moment(lastUpdate).format(DATE_TIME_FORMAT)
                ) : (
                  <Skeleton width={80} />
                )}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Typography variant="body2" color="textSecondary">
                <FormattedMessage id="fiat_currency" /> :&nbsp;
              </Typography>{" "}
              <Typography variant="body2">{"USD"}</Typography>
            </Box>
          </Box>
          <Box
            style={{
              boxShadow: "inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 234,
              backgroundColor: alpha(theme.palette.background.default, 0.85),
              padding: 8,
            }}
          >
            <Typography variant="body2" color="textSecondary">
              <FormattedMessage id="total_balance" />
            </Typography>
            <Typography variant="h4" color="primary">
              <CurrencyFormatted
                value={listChain().reduce((value, cur) => {
                  return value + cur.balance;
                }, 0)}
              />
            </Typography>
          </Box>
        </Paper>
        <Paper
          style={{ display: "flex", padding: "8px 12px", margin: "12px 0px" }}
        >
          <Box display={"flex"} alignItems={"center"} flex={1}>
            {LIST_ROUTES.map((item, index) => {
              return (
                <Link to={item.path} key={index}>
                  <Button
                    style={{ marginRight: 12 }}
                    variant={
                      item.path === params["*"] || (!params["*"] && !index)
                        ? "contained"
                        : "text"
                    }
                  >
                    <Typography variant="subtitle2" color="inherit">
                      <FormattedMessage id={item.title} />
                    </Typography>
                  </Button>
                </Link>
              );
            })}
          </Box>
          <Box display={"flex"} alignItems={"center"}>
            <Typography variant="body2" color="textSecondary">
              {loading ? (
                <FormattedMessage id={"updating"} />
              ) : (
                <CountTime time={time} />
              )}
            </Typography>
            &emsp;
            <LoadingButton
              size="small"
              variant="outlined"
              loading={loading}
              onClick={() => revalidate()}
            >
              <Typography variant="caption" color="inherit">
                <FormattedMessage id={"refresh"} />
              </Typography>
            </LoadingButton>
          </Box>
        </Paper>
        <Box display="flex" flexWrap={"wrap"} gap={1}>
          {[
            { chain_id: "", name: intl.formatMessage({ id: "all_chains" }) },
            ...MAINNET,
          ].map((item, index) => {
            return (
              <Link to={{ search: `?chain=${item.chain_id}` }} key={index}>
                <Button
                  variant={"outlined"}
                  sx={{ border: "none" }}
                  color={
                    item.chain_id === (filter?.chain || "")
                      ? "primary"
                      : "inherit"
                  }
                >
                  <Typography variant="body2" color="inherit">
                    {item.name}
                  </Typography>
                </Button>
              </Link>
            );
          })}
        </Box>
      </Box>
      <DataProfileContext.Provider
        value={{
          data: dataFiltered(filter.chain),
          listChain: listChain(filter.chain),
          loading: loading,
          revalidate: () => revalidate(),
        }}
      >
        <Outlet />
      </DataProfileContext.Provider>
    </>
  );
};

export default ProfilePage;
