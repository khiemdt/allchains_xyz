import {
  Breadcrumbs,
  Button,
  InputAdornment,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import useSWR from "swr";
import useFilterHook from "../../../common/hook/useFilterHook";
import useGeneralHook from "../../../common/hook/useGeneralHook";
import FormControlAutoComplete from "../../../common/SchemaForm/element/autocomplete/FormControlAutoComplete";
import { IconSearch, NoDataSearch } from "../../../svg";
import InfoBox from "../component/InfoBox";
import TableBox from "../component/TableBox";
const TAB = ["chart", "market"];

const CryptocurrenciesPage = () => {
  const { intl, appState, dispatch, fetchThunk, API_PATHS } = useGeneralHook();
  const [tab, setTab] = useState<string>("market");
  const { filter, setParams } = useFilterHook();

  const { data, isValidating } = useSWR(
    filter.coin?.id || null,
    async (id) => {
      const [json1, json2] = await Promise.all([
        await dispatch(fetchThunk(API_PATHS.getCoinInfo(id))),
        await dispatch(fetchThunk(API_PATHS.getCoinMarketInfo(id))),
      ]);
      return { dataCoin: json1.data, dataMarketCoin: json2.data[0] };
    },
    {
      refreshInterval: 120000,
      revalidateOnFocus: false,
    }
  );

  const { dataCoin, dataMarketCoin } = data || {};

  const getCoinInSearch = useCallback(async () => {
    if (filter.coin) {
      return null;
    }
    if (filter.symbol) {
      const coins = appState.common.listCoin?.filter(
        (items) => items.symbol === filter.symbol
      );
      if (coins.length === 1) {
        setParams({ coin: coins[0] });
      }
      if (coins.length > 1) {
        const list = await Promise.all(
          coins.map(async (val) => {
            return await dispatch(fetchThunk(API_PATHS.getCoinInfo(val.id)));
          })
        );
        const index = list.findIndex(
          (val) => val.data?.contract_address === filter.contract
        );
        setParams({ coin: coins[index] });
      }
    }
  }, [
    API_PATHS,
    appState.common.listCoin,
    dispatch,
    fetchThunk,
    filter.coin,
    filter.contract,
    filter.symbol,
    setParams,
  ]);

  useEffect(() => {
    getCoinInSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState.common.listCoin, filter.contract, filter.symbol]);

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        bgcolor="grey.300"
        justifyContent="space-between"
        padding="16px 40px"
      >
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          <Typography variant="body2">
            <FormattedMessage id="cryptocurrencies" />
          </Typography>
          {filter.coin && (
            <Typography variant="body2" color="primary">
              {filter.coin?.name}
            </Typography>
          )}
        </Breadcrumbs>
        <FormControlAutoComplete
          fullWidth
          value={filter.coin || null}
          onChange={(_, data) => {
            setParams({ coin: data });
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconSearch className="svgStroke" />
              </InputAdornment>
            ),
          }}
          placeholder={intl.formatMessage({
            id: "search",
          })}
          loading={appState.common.loadingCoin}
          options={appState.common.listCoin}
          windowScroll
          style={{ width: 320 }}
        />
      </Box>

      {filter.coin ? (
        <Box sx={{ padding: "16px 40px" }}>
          <InfoBox data={dataCoin} priceDetailData={dataMarketCoin} />
          <Paper
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 16,
              marginBottom: 16,
              padding: 8,
              gap: 8,
            }}
          >
            {TAB.map((item) => {
              return (
                <Button
                  key={item}
                  variant={"text"}
                  onClick={() => {
                    setTab(item);
                  }}
                  sx={{
                    bgcolor: item === tab ? "grey.300" : undefined,
                  }}
                  color="inherit"
                >
                  <Typography variant="body2">
                    <FormattedMessage id={item} />
                  </Typography>
                </Button>
              );
            })}
          </Paper>
          {tab === "market" && (
            <TableBox data={dataCoin} loading={!data && isValidating} />
          )}
        </Box>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <Box textAlign="center">
            <img src={NoDataSearch} alt="nodata" />
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ marginTop: 12 }}
            >
              <FormattedMessage id="noCoin" />
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
};
export default CryptocurrenciesPage;
