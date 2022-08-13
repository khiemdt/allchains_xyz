import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import SendIcon from "@mui/icons-material/Send";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { Link } from "react-router-dom";
import useGeneralHook from "../common/hook/useGeneralHook";
import { IconMessage, LogoDark, LogoLight, MaskBg } from "../svg";
import { ASIDE_WIDTH, HEADER_HEIGHT, ROUTES } from "./constants";
import DefaultAsideItems from "./DefaultAsideItems";
import { RouteObject } from "./utils";
const LIST_SUPPORT = [
  {
    url: "https://t.me/allchains_xyz",
    title: "",
    icon: <SendIcon />,
  },
  {
    url: "https://twitter.com/Allchains_xyz",
    title: "",
    icon: <TwitterIcon />,
  },
  {
    url: "",
    title: "",
    icon: <YouTubeIcon />,
  },
  {
    url: "https://www.facebook.com/allchains.xyz/",
    title: "",
    icon: <FacebookIcon />,
  },
  {
    url: "mailto:khimdt@blackreport.tech",
    title: "",
    icon: <EmailIcon />,
  },
];
interface Props {
  listRouter: RouteObject[];
}

const DefaultAside: React.FunctionComponent<Props> = (props) => {
  const { listRouter } = props;
  const { isDarkTheme, location } = useGeneralHook();
  const { pathname } = location;

  return (
    <>
      <div
        style={{
          minWidth: ASIDE_WIDTH,
          transition: "all 0.3s",
        }}
      />
      <Box
        bgcolor={"background.paper"}
        boxShadow={1}
        style={{
          width: ASIDE_WIDTH,
          height: "100vh",
          transition: "width 0.3s",
          position: "fixed",
          left: 0,
          top: 0,
          flexShrink: 0,
          zIndex: 300,
          borderRadius: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Link to={ROUTES.introduce}>
          <Box
            minHeight={HEADER_HEIGHT}
            display="flex"
            alignItems="center"
            paddingLeft={1}
          >
            {isDarkTheme ? <LogoDark /> : <LogoLight />}
          </Box>
        </Link>
        <PerfectScrollbar
          style={{
            marginTop: 32,
          }}
        >
          <Box style={{ paddingBottom: 16, overflow: "auto", flex: 1 }}>
            {listRouter.map((v: RouteObject, index: number) => (
              <DefaultAsideItems key={index} data={v} pathname={pathname} />
            ))}
          </Box>
          <Divider sx={{ marginX: 2 }} />
          <Box padding={2}>
            <Typography
              variant="caption"
              component="div"
              style={{ marginLeft: 24, marginBottom: 16 }}
            >
              <FormattedMessage id="help" />
            </Typography>
            <a
              href={"https://t.me/Doanthekhiem"}
              target="_blank"
              rel="noreferrer"
            >
              <Button
                variant="text"
                startIcon={<IconMessage />}
                sx={{
                  color: "text.secondary",
                  justifyContent: "flex-start",
                  marginBottom: 3,
                  padding: "4px 24px",
                }}
                fullWidth
              >
                <FormattedMessage id="support" />
              </Button>
            </a>
            <Box
              style={{
                borderRadius: 8,
                padding: 16,
                display: "flex",
                marginBottom: 16,
              }}
              bgcolor="grey.200"
            >
              {LIST_SUPPORT.map((item, index) => {
                return (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    key={index}
                  >
                    <IconButton key={index} style={{ padding: 6 }}>
                      {item.icon}
                    </IconButton>
                  </a>
                );
              })}
            </Box>
            <Box
              style={{
                borderRadius: 8,
                backgroundImage: `url(${MaskBg})`,
                padding: 16,
              }}
              bgcolor="grey.200"
            >
              <Typography variant="h6">
                <FormattedMessage id="donate" />
              </Typography>
              <Typography
                variant="caption"
                style={{ margin: "12px 0px 56px" }}
                component="div"
              >
                <FormattedMessage id="donate_content_1" />
              </Typography>
              <Link to={ROUTES.donate}>
                <Button fullWidth size="large">
                  <FormattedMessage id="donate" />
                </Button>
              </Link>
            </Box>
          </Box>
        </PerfectScrollbar>
      </Box>
    </>
  );
};

export default DefaultAside;
