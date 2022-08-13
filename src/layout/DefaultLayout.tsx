import { alpha, Box } from "@mui/material";
import * as React from "react";
import { Outlet } from "react-router";
import LoadingIcon from "../common/components/LoadingIcon";
import useGeneralHook from "../common/hook/useGeneralHook";
import DefaultAside from "./DefaultAside";
import DefaultFooter from "./DefaultFooter";
import Header from "./Header";
import { ADMIN_ROUTES } from "./router";

interface IMainPageProps {}

const DefaultLayout: React.FunctionComponent<IMainPageProps> = () => {
  const { location, theme } = useGeneralHook();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Box
      display="flex"
      minHeight="100vh"
      style={{ height: "100%" }}
      bgcolor={alpha(theme.palette.background.default, 0.96)}
    >
      <DefaultAside listRouter={ADMIN_ROUTES} />
      <Header />
      <Box
        paddingTop={7}
        paddingBottom={10}
        minHeight={"calc(100% - 40px)"}
        flexGrow={1}
        width="80vw"
        flex={1}
        position={"relative"}
      >
        <React.Suspense fallback={<LoadingIcon />}>
          <Outlet />
        </React.Suspense>
        <DefaultFooter />
      </Box>
    </Box>
  );
};

export default DefaultLayout;
