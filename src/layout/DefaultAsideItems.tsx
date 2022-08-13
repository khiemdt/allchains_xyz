import {
  Box,
  experimentalStyled as styled,
  ListItem,
  ListItemIcon,
  Typography,
} from "@mui/material";
import React from "react";
import { FormattedMessage } from "react-intl";
import LinkPM from "../common/components/LinkPM";
import useGeneralHook from "../common/hook/useGeneralHook";
import { RouteObject } from "./utils";

const ListItemStyle = styled((props: any) => (
  <ListItem button disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  height: 48,
  position: "relative",
  // textTransform: "capitalize",
  padding: "0px 16px 0px 20px",
  "&:before": {
    top: 0,
    left: 0,
    width: 4,
    bottom: 0,
    content: "''",
    display: "none",
    position: "absolute",
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    backgroundColor: theme.palette.primary.main,
  },
}));

const ListItemIconStyle = styled(ListItemIcon)({
  minWidth: "unset",
  width: 24,
  height: 24,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "inherit",
});

interface Props {
  data: RouteObject;
  pathname: string;
}

const DefaultAsideItems: React.FC<Props> = (props: Props) => {
  const { data, pathname } = props;
  const { isDarkTheme } = useGeneralHook();
  const activeRootStyle = {
    fontWeight: "normal",
    color: isDarkTheme ? "primary.main" : "text.primary",
    "&:before": { display: "block" },
  };

  const checkIsActive = data.path && pathname.includes(data.path);

  const label = data.title;
  if (data.hidden || !data.path) {
    return null;
  }
  return (
    <>
      <LinkPM
        to={{
          pathname: data.path,
        }}
        style={{ display: "flex", flex: 1 }}
      >
        <ListItemStyle
          sx={{
            ...(checkIsActive && activeRootStyle),
          }}
        >
          <Box
            bgcolor={
              checkIsActive ? (isDarkTheme ? "grey.900" : "grey.300") : "unset"
            }
            display="flex"
            alignItems={"center"}
            height="100%"
            width="100%"
            borderRadius={1}
            padding="12px 16px"
            sx={{
              "&:hover": {
                backgroundColor: "unset",
              },
            }}
          >
            <ListItemIconStyle>
              {data.icon ? (
                data.icon
              ) : (
                <Box
                  component="span"
                  sx={{
                    width: 4,
                    height: 4,
                    display: "flex",
                    borderRadius: "50%",
                    alignItems: "center",
                    justifyContent: "center",
                    // bgcolor: "text.disabled",
                    bgcolor: "text.primary",
                    transition: (theme) =>
                      theme.transitions.create("transform"),
                    ...(checkIsActive && {
                      transform: "scale(2)",
                      // bgcolor: "primary.main",
                    }),
                  }}
                />
              )}
            </ListItemIconStyle>
            <Box
              style={{
                marginLeft: 12,
                flex: 1,
                transition: "all 200ms",
              }}
            >
              {typeof label === "string" && label ? (
                <Typography noWrap variant="body1" color="inherit">
                  <FormattedMessage id={label} />
                </Typography>
              ) : (
                label
              )}
            </Box>
          </Box>
        </ListItemStyle>
      </LinkPM>
    </>
  );
};

export default DefaultAsideItems;
