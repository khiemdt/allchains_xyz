import { Box, Typography } from "@mui/material";
import * as React from "react";
import { FormattedMessage } from "react-intl";

interface Props {}

const DefaultFooter: React.FunctionComponent<Props> = () => {
  return (
    <Box
      boxSizing="border-box"
      textAlign={"end"}
      zIndex={200}
      paddingX={5.25}
      paddingY={2}
      position="absolute"
      bottom={0}
      right={0}
      left={0}
    >
      <Typography variant="caption" color="textSecondary">
        <FormattedMessage id="footer1" />
      </Typography>
      <Typography variant="body2" color="textSecondary">
        <FormattedMessage id="footer2" />
      </Typography>
    </Box>
  );
};

export default DefaultFooter;
