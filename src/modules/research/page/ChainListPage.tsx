import {
  Box,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { FormattedMessage } from "react-intl";
import LoadingIcon from "../../../common/components/LoadingIcon";
import useGeneralHook from "../../../common/hook/useGeneralHook";
import LIST_ALL_CHAIN from "../../../common/LIST_ALL_CHAIN.json";
import { HEADER_HEIGHT } from "../../../layout/constants";
import { IconSearch } from "../../../svg";
import ChainCard from "../component/ChainCard";

const LIST_CHAINS_MAIN = [
  1, 56, 137, 250, 336, 43114, 10, 1284, 1285, 8217, 42220, 128, 592,
];

const ListChain = [
  ...LIST_ALL_CHAIN.filter((item) => LIST_CHAINS_MAIN.includes(item.chainId)),
  ...LIST_ALL_CHAIN.filter((item) => !LIST_CHAINS_MAIN.includes(item.chainId)),
];
interface Props {}

const ChainListPage = (props: Props) => {
  const { intl } = useGeneralHook();
  const [term, setTerm] = useState("");
  const [page, setPage] = useState(1);

  const filterListChain = useMemo(() => {
    return ListChain.filter((item) => {
      return (
        (item.name.toLowerCase().includes(term.trim().toLowerCase()) &&
          item.chainId
            .toString()
            .toLowerCase()
            .includes(term.trim().toLowerCase())) ||
        item.chain.toLowerCase().includes(term.trim().toLowerCase())
      );
    });
  }, [term]);
  const mappedListChains = useMemo(() => {
    return filterListChain.slice(0, 18 * page);
  }, [filterListChain, page]);

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        bgcolor="grey.300"
        justifyContent="space-between"
        padding="16px 40px"
        id="list"
        position="sticky"
        top={HEADER_HEIGHT}
        zIndex={99}
      >
        <Typography variant="h6">
          <FormattedMessage id="chainList" />
        </Typography>
        <TextField
          value={term}
          onChange={(e) => {
            setPage(1);
            setTerm(e.target.value);
          }}
          style={{ width: 320 }}
          placeholder={intl.formatMessage({ id: "searNetwork" })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconSearch />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box padding="16px 40px">
        <InfiniteScroll
          dataLength={mappedListChains.length} //This is important field to render the next data
          next={() => {
            setPage(page + 1);
          }}
          hasMore={mappedListChains.length < filterListChain.length}
          loader={<LoadingIcon />}
        >
          <Grid container spacing={3}>
            {mappedListChains.map((item) => {
              return <ChainCard data={item} key={item.chainId} />;
            })}
          </Grid>
        </InfiniteScroll>
      </Box>
    </>
  );
};

export default ChainListPage;
