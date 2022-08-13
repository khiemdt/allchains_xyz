import { Button, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import { FormattedMessage } from "react-intl";
import CurrencyFormatted from "../../../common/components/CurrencyFormatted";
import TableCustom from "../../../common/components/TableCustom";
import { DATE_TIME_FORMAT, some } from "../../../common/constants";

interface Props {
  data?: some;
  loading?: boolean;
}

const TableBox = (props: Props) => {
  const { data, loading } = props;
  return (
    <Box>
      <Typography variant="h6">Polygon Market</Typography>
      <Paper style={{ marginTop: 16 }}>
        <TableCustom
          loading={loading}
          dataSource={data?.tickers.sort((a, b) => b.volume - a.volume)}
          columns={[
            {
              title: "source",
              render: (record) => {
                return record?.market?.name;
              },
            },
            {
              title: "pairs",
              width: "25%",
              render: (record) => {
                return (
                  <a href={record.trade_url} target="_blank" rel="noreferrer">
                    <Typography
                      variant="body2"
                      color="secondary"
                      style={{
                        textDecoration: "underline",
                        wordBreak: "break-all",
                      }}
                    >
                      {record.base}/{record.target}
                    </Typography>
                  </a>
                );
              },
            },
            {
              title: "price",
              render: (record) => {
                return <CurrencyFormatted value={record?.last} />;
              },
            },
            {
              title: (
                <Box display="flex" alignItems="center">
                  <Typography variant="body2">
                    <FormattedMessage id="volume" />
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
                </Box>
              ),
              render: (record) => {
                return <CurrencyFormatted value={record?.volume} />;
              },
            },
            {
              title: "confidence",
              render: (record) => {
                if (record.trust_score === "green") {
                  return (
                    <Button
                      color="success"
                      variant="text"
                      sx={{ bgcolor: "success.light" }}
                    >
                      <FormattedMessage id="confidence.high" />
                    </Button>
                  );
                } else if (record.trust_score === "red") {
                  return (
                    <Button
                      color="error"
                      variant="text"
                      sx={{ bgcolor: "error.light" }}
                    >
                      <FormattedMessage id="confidence.low" />
                    </Button>
                  );
                } else {
                  return (
                    <Button
                      color="warning"
                      variant="text"
                      sx={{ bgcolor: "warning.light" }}
                    >
                      <FormattedMessage id="confidence.medium" />
                    </Button>
                  );
                }
              },
            },
            {
              title: "updated",
              render: (record) => {
                return moment(record.last_traded_at).format(DATE_TIME_FORMAT);
              },
            },
          ]}
        />
      </Paper>
    </Box>
  );
};
export default TableBox;
