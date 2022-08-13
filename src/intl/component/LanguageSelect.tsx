import { Button, Collapse, IconButton, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { some } from "../../common/constants";
import useGeneralHook from "../../common/hook/useGeneralHook";
import { HEADER_HEIGHT } from "../../layout/constants";
import { AppState } from "../../redux/reducer";
import iconFlagEn from "../../svg/flag_en.svg";
import iconFlagVi from "../../svg/flag_vi.svg";
import { setLocale } from "../redux/intlReducer";

const DATA = [
  { src: iconFlagVi, value: "vi", label: "Tiếng Việt" },
  { src: iconFlagEn, value: "en", label: "English" },
];

interface Props {
  style?: React.CSSProperties;
}
const LanguageSelect: React.FC<Props> = ({ style }) => {
  const { dispatch } = useGeneralHook();
  const locale = useSelector(
    (state: AppState) => state.intl.locale,
    shallowEqual
  );
  const [open, setOpen] = React.useState(false);
  const [flag, setFlag] = React.useState<some>(
    DATA.find((one) => one.value === locale) || DATA[0]
  );

  const onBlur = React.useCallback((e: React.FocusEvent<HTMLDivElement>) => {
    if (e.relatedTarget instanceof Element) {
      if (e.currentTarget.contains(e.relatedTarget as Element)) {
        return;
      }
    }
    setOpen(false);
  }, []);

  return (
    <Box
      color="inherit"
      tabIndex={-1}
      onClick={() => setOpen(!open)}
      onBlur={onBlur}
      style={style}
    >
      <IconButton
        style={{
          padding: 8,
          overflow: "hidden",
        }}
        color="inherit"
      >
        <img
          src={flag.src}
          alt=""
          style={{
            width: 24,
            height: 24,
            borderRadius: 24,
            objectFit: "cover",
          }}
        />
      </IconButton>
      <Collapse
        in={open}
        style={{
          position: "absolute",
          zIndex: 110,
          top: HEADER_HEIGHT,
          transform: "translateX(-65%)",
        }}
      >
        <Paper
          style={{
            overflow: "hidden",
            padding: "8px 12px",
          }}
          variant="outlined"
        >
          {DATA.map((v: some, index: number) => {
            return (
              <Button
                variant="text"
                sx={{
                  display: "flex",
                  alignItems: "flex-right",
                  justifyContent: "flex-start",
                  padding: 1,
                  borderRadius: 0.5,
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                }}
                fullWidth
                key={index}
                onClick={() => {
                  setFlag(v);
                  dispatch(setLocale(v.value));
                }}
              >
                <img
                  src={v.src}
                  alt=""
                  style={{ width: "38px", height: "25px", objectFit: "cover" }}
                />
                &nbsp;&nbsp;&nbsp;
                <Typography variant="body2">{v.label}</Typography>
              </Button>
            );
          })}
        </Paper>
      </Collapse>
    </Box>
  );
};

export default LanguageSelect;
