import ExitToAppOutlined from "@mui/icons-material/ExitToAppOutlined";
import {
  alpha,
  Avatar,
  Box,
  Button,
  ButtonBase,
  ClickAwayListener,
  Divider,
  Fade,
  InputAdornment,
  Paper,
  Popper,
  Switch,
  Theme,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/system";
import Cookies from "js-cookie";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import { generatePath, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { IS_DEV_EVN } from "../api/API_App";
import { OpenState } from "../common/components/elements";
import ConnectionWalletDialog from "../common/connection/ConnectionWalletDialog";
import { setWalletState } from "../common/connection/reducer/walletReducer";
import { MODE_THEME, WALL_ADDRESS } from "../common/constants";
import useGeneralHook from "../common/hook/useGeneralHook";
import { setModeTheme } from "../common/reducer/commonReducer";
import SchemaForm from "../common/SchemaForm";
import { shortText } from "../common/utils";
import LanguageSelect from "../intl/component/LanguageSelect";
import { IconSearch } from "../svg";
import { ASIDE_WIDTH, HEADER_HEIGHT } from "./constants";

const useStyles = makeStyles(() => ({
  button: {
    width: "100%",
    padding: "8px 24px",
    justifyContent: "flex=start",
    textAlign: "start",
  },
  icon: {
    height: 16,
    color: grey[600],
  },
  collapse: {
    position: "absolute",
    width: 220,
    color: "black",
    zIndex: 110,
    top: 52,
    right: 40,
  },
  paper: {
    overflow: "hidden",
    width: 240,
    padding: 0,
    marginTop: 16,
    marginRight: 16,
  },
}));

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#FFC916" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

interface Props {}

const Header: React.FunctionComponent<Props> = () => {
  const classes = useStyles();
  const { dispatch, appState } = useGeneralHook();
  const mode = appState.common.mode;
  const { walletAddress } = appState.wallet;

  const navigate = useNavigate();
  const [anchorElMenu, setAnchorElMenu] = React.useState<null | HTMLElement>(
    null
  );
  const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElMenu(anchorElMenu ? null : event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElMenu(null);
  };
  const openMenu = Boolean(anchorElMenu);
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        boxSizing="border-box"
        position="fixed"
        zIndex={200}
        top={0}
        right={0}
        left={ASIDE_WIDTH}
        paddingX={2}
        paddingY={1}
        height={HEADER_HEIGHT}
        boxShadow={1}
        bgcolor={(theme: Theme) => alpha(theme.palette.background.paper, 0.72)}
        style={{
          backdropFilter: "blur(6px)",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flex={1}
          paddingX={7.5}
        >
          <SchemaForm
            hideSubmitButton
            onSubmit={(value) =>
              navigate(generatePath("/profile/:token", { token: value.token }))
            }
            schema={{
              fields: ({ formProps: { intl } }) => ({
                token: {
                  type: "text-field",
                  InputProps: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconSearch className="svgStroke" />
                      </InputAdornment>
                    ),
                  },
                  placeholder: intl.formatMessage({
                    id: "search_header_token",
                  }),
                  noHelperText: true,
                  style: { width: 486 },
                },
              }),
            }}
          />
        </Box>
        <Box display="flex" alignItems="center" justifyContent="flex-end">
          <MaterialUISwitch
            checked={mode === "dark"}
            onChange={(e) => {
              const val = e.target.checked;
              Cookies.set(MODE_THEME, !val ? "light" : "dark");
              dispatch(setModeTheme(!val ? "light" : "dark"));
            }}
          />
          {IS_DEV_EVN && (
            <>
              <LanguageSelect />
            </>
          )}
          {walletAddress ? (
            <Button
              variant="outlined"
              onClick={handleClickMenu}
              style={{
                marginLeft: 16,
                justifyContent: "flex-start",
                borderRadius: 40,
                padding: 16,
              }}
              startIcon={
                <Avatar
                  alt="User"
                  style={{ textTransform: "uppercase", height: 24, width: 24 }}
                ></Avatar>
              }
              size="large"
            >
              <Typography variant="body1">
                {shortText(walletAddress)}
                &nbsp;
              </Typography>
            </Button>
          ) : (
            <OpenState>
              {({ open, setOpen }) => {
                return (
                  <>
                    <Button
                      style={{
                        width: 160,
                        background:
                          "linear-gradient(94.93deg, #FFDA61 11.65%, #EEAA3C 104.49%)",
                      }}
                      size="large"
                      onClick={() => setOpen(true)}
                    >
                      <Typography variant="subtitle2" color="common.white">
                        <FormattedMessage id="connect_wallet" />
                      </Typography>
                    </Button>
                    <ConnectionWalletDialog
                      open={open}
                      onClose={() => {
                        setOpen(false);
                      }}
                    />
                  </>
                );
              }}
            </OpenState>
          )}
        </Box>
      </Box>
      <Popper
        open={openMenu}
        anchorEl={anchorElMenu}
        transition
        style={{ zIndex: 100 }}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleCloseMenu}>
            <Fade {...TransitionProps} timeout={350}>
              <Paper className={classes.paper}>
                <Link
                  to={generatePath("/profile/:token", { token: walletAddress })}
                >
                  <ButtonBase
                    className={classes.button}
                    style={{
                      padding: "8px 16px",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Typography variant="body2">
                      <FormattedMessage id="my_profile" />
                    </Typography>
                  </ButtonBase>
                </Link>
                <Divider />
                <ButtonBase
                  className={classes.button}
                  style={{ padding: "8px 16px" }}
                  onClick={() => {
                    Cookies.remove(WALL_ADDRESS);
                    dispatch(
                      setWalletState({
                        walletAddress: "",
                      })
                    );
                  }}
                >
                  <Box flex={1}>
                    <Typography variant="body2">
                      <FormattedMessage id="disconnect" />
                    </Typography>
                  </Box>
                  <ExitToAppOutlined className={classes.icon} />
                </ButtonBase>
              </Paper>
            </Fade>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
};

export default Header;
