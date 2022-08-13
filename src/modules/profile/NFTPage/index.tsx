import { Box, Grid, InputAdornment } from "@mui/material";
import { useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingIcon from "../../../common/components/LoadingIcon";
import { some } from "../../../common/constants";
import SchemaForm from "../../../common/SchemaForm";
import { IconSearch } from "../../../svg";
import { useDataProfile } from "../ProfilePage";
import CardContent, { SkeletonCard } from "./CardContent";

interface Props {}

const NFTPage = (props: Props) => {
  const [filter, setParams] = useState<{ name: string; type?: string }>({
    name: "",
  });
  const { data, loading } = useDataProfile();
  const [page, setPage] = useState(1);

  const mappedData = useMemo(() => {
    return data
      .reduce((value: some[], cur: some) => {
        return [...value, ...(cur.nft_data || [])];
      }, [])
      .filter((item) => {
        return item.external_data?.name
          ?.toLowerCase()
          .includes(filter.name.trim().toLowerCase());
      });
  }, [data, filter.name]);

  const mappedList = useMemo(() => {
    return mappedData.slice(0, 16 * page);
  }, [mappedData, page]);

  return (
    <>
      <Box
        sx={{
          paddingX: 5,
        }}
      >
        <Box display="flex" alignItems="center" marginBottom={3} marginTop={-3}>
          <SchemaForm
            formData={filter}
            hideSubmitButton
            onChange={(value: any) => {
              setPage(1);
              setParams(value);
            }}
            formProps={{ style: { width: "100%" } }}
            schema={{
              propsGridContainer: {
                justifyContent: "space-between",
                width: "100%",
              },
              fields: ({ formProps: { intl } }) => ({
                name: {
                  type: "text-field",
                  InputProps: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconSearch className="svgStroke" />
                      </InputAdornment>
                    ),
                  },
                  placeholder: intl.formatMessage({
                    id: "search_by_nft",
                  }),
                  label: <>&nbsp;</>,
                  noHelperText: true,
                  style: { width: 278 },
                  propsWrapper: { xs: true },
                },
                // type: {
                //   type: "select",
                //   label: intl.formatMessage({
                //     id: "artwork_type",
                //   }),
                //   propsWrapper: { xs: undefined },
                //   style: { height: 40, width: 140 },
                //   hasAllOptions: true,
                //   options: [
                //     { id: "image", name: "Image" },
                //     { id: "gif", name: "Gif" },
                //     { id: "video", name: "Audio" },
                //   ],
                //   rawOptions: true,
                //   noHelperText: true,
                // },
              }),
            }}
          />
        </Box>
        <InfiniteScroll
          dataLength={mappedList.length} //This is important field to render the next data
          next={() => {
            setPage(page + 1);
          }}
          hasMore={mappedList.length < mappedData.length}
          loader={<LoadingIcon />}
        >
          <Grid container spacing={5}>
            {loading
              ? Array(4)
                  .fill(0)
                  .map((_, index) => {
                    return (
                      <Grid item key={index} xl={3} lg={4} md={6} sm={12}>
                        <SkeletonCard />
                      </Grid>
                    );
                  })
              : mappedList.map((item, index) => {
                  return (
                    <Grid item key={index} xl={3} lg={4} md={6} sm={12}>
                      <CardContent data={item} />
                    </Grid>
                  );
                })}
          </Grid>
        </InfiniteScroll>
      </Box>
    </>
  );
};

export default NFTPage;
