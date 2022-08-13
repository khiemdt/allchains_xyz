import { Box, Button, Grid, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { ROUTES } from "../../layout/constants";
import {
  IntroduceIcon,
  TagBuyCrypto,
  TagResearch,
  TagTrade,
  TagUserIcon,
} from "../../svg";

const MODULES = [
  {
    icon: <TagUserIcon />,
    title: "profile",
    to: ROUTES.profile.index,
  },
  {
    icon: <TagBuyCrypto />,
    title: "cryptocurrencies",
    to: ROUTES.cryptocurrencies.index,
  },
  {
    icon: <TagResearch />,
    title: "chainList",
    to: ROUTES.chainList,
  },
  {
    icon: <TagTrade />,
    title: "swap",
    to: ROUTES.swap,
  },
  {
    icon: <TagResearch />,
    title: "bridge",
    to: ROUTES.bridge,
  },
];
interface Props {}

const IntroducePage = (props: Props) => {
  return (
    <Box
      display="flex"
      alignItems="flex-end"
      height="100%"
      paddingTop={9}
      paddingX={5}
    >
      <Box display="flex" height="100%" width="100%">
        <Box flex={1} paddingTop={8}>
          <Typography variant="h4" style={{ width: 650 }}>
            <FormattedMessage
              id="introduceTitle"
              values={{
                name: (
                  <Typography
                    variant="inherit"
                    color="primary"
                    component="span"
                  >
                    ALLCHAINS
                  </Typography>
                ),
              }}
            />
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="div"
            sx={{ marginY: 3, width: 450 }}
          >
            <FormattedMessage id="introduceDetail" />
          </Typography>
          <Grid container spacing={4} width={500}>
            {MODULES.map((value, index) => {
              return (
                <Grid item key={index} xs={6}>
                  <Link to={value.to}>
                    <Button variant="text" startIcon={value.icon}>
                      <Typography variant="body2" color="textSecondary">
                        <FormattedMessage id={value.title} />
                      </Typography>
                    </Button>
                  </Link>
                </Grid>
              );
            })}
          </Grid>
          <Typography
            variant="body2"
            color="textSecondary"
            component="div"
            sx={{ marginY: 3 }}
          >
            <FormattedMessage id="connectToGetData" />
          </Typography>
        </Box>
        <Box textAlign="center">
          <IntroduceIcon style={{ height: "100%", width: "auto" }} />
        </Box>
      </Box>
    </Box>
  );
};

export default IntroducePage;
