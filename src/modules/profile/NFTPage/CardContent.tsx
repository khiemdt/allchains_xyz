import LinkIcon from "@mui/icons-material/Link";
import {
  Avatar,
  Box,
  IconButton,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import { FormattedMessage } from "react-intl";
import { some } from "../../../common/constants";
interface Props {
  data: some;
}
export const SkeletonCard = () => {
  return (
    <>
      <Paper style={{ overflow: "hidden" }}>
        <Skeleton
          style={{ height: 240, width: "100%", objectFit: "cover" }}
          variant="rectangular"
        />
        <Box padding={1}>
          <Skeleton width={100} />
          <Skeleton width={150} style={{ margin: "12px 0px 16px" }} />
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Skeleton width={50} />

            <Skeleton width={38} height={38} variant="circular" />
          </Box>
        </Box>
      </Paper>
    </>
  );
};

const CardContent = (props: Props) => {
  const { data } = props;

  return (
    <>
      <Paper style={{ overflow: "hidden", height: "100%" }}>
        <Avatar
          variant="square"
          src={data?.external_data?.image}
          alt="imageContent"
          style={{ minHeight: 240, width: "100%", objectFit: "cover" }}
        >
          &nbsp;
        </Avatar>
        <Box padding={1}>
          <Typography
            variant="caption"
            color="textSecondary"
            style={{ marginTop: 12, marginBottom: 16 }}
          >
            <FormattedMessage id="image" />
          </Typography>{" "}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            style={{ marginTop: 12, marginBottom: 16 }}
          >
            <Typography
              variant="subtitle1"
              style={{
                wordBreak: "break-word",
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                textOverflow: "ellipsis",
                overflow: "hidden",
                width: "60%",
              }}
            >
              {data?.external_data?.name}
            </Typography>
            <Typography variant="subtitle1">{`#${
              data?.token_id || ""
            }`}</Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              variant="body2"
              color="textSecondary"
              style={{
                wordBreak: "break-word",
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
              title={data?.external_data?.description}
            >
              {data?.external_data?.description}
            </Typography>
            <a href={data?.external_data?.external_url} target={"__blank"}>
              <IconButton>
                <LinkIcon />
              </IconButton>
            </a>
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default CardContent;
