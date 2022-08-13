import { Box, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { NoDataSearch } from "../../svg";

interface Props {}

const ProfileNewPage = (props: Props) => {
  return (
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
          <FormattedMessage id="noAddress" />
        </Typography>
      </Box>
    </Box>
  );
};

export default ProfileNewPage;
