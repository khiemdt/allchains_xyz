import { PaletteMode } from "@mui/material";
import { blueGrey, grey, red } from "@mui/material/colors";
import {
  alpha,
  darken,
  unstable_createMuiStrictModeTheme as createTheme,
} from "@mui/material/styles";
import shadows from "@mui/material/styles/shadows";

const DarkTheme = () => {
  const PRIMARY = "#FEDB00";
  const SECONDARY = "#00A3FF";
  return createTheme({
    components: {
      MuiTableContainer: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            height: "100%",
            padding: 8,
            backgroundColor: "#181A20",
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: "16px 8px",
            fontSize: 14,
            fontWeight: 500,
            borderBottom: "0.5px solid #2F2F2F",
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            "&:hover": {
              boxShadow: " -3px 10px 20px rgba(4, 4, 4, 0.46)",
              backgroundColor: "#222328",
            },
          },
        },
      },
      MuiTableHead: {
        defaultProps: {
          sx: { "& th": { backgroundColor: "grey.300" } },
        },
      },
      MuiInputAdornment: {
        styleOverrides: {
          positionStart: {
            marginLeft: 8,
            marginRight: 0,
          },
          positionEnd: {
            marginLeft: 0,
            marginRight: 12,
          },
        },
      },
      MuiTooltip: {
        defaultProps: { arrow: true },
      },
      MuiTablePagination: {
        styleOverrides: {
          root: { justifyContent: "flex-end" },
          selectRoot: {
            margin: "0 16px 0 8px",
            minWidth: "64px",
          },
          selectIcon: {
            top: "calc(50% - 14px)",
          },
          menuItem: { fontSize: 12 },
          input: {
            "& .MuiTablePagination-select": {
              textAlign: "left",
              textAlignLast: "left",
              background: "inherit",
              border: `0.5px solid ${grey[400]}`,
              borderRadius: "2px",
              fontSize: 14,
              padding: "3px 12px",
            },
          },
          actions: {
            marginLeft: "10px",
            "& .MuiIconButton-root": {
              padding: "6px",
            },
          },
          spacer: {
            flex: "unset",
          },
          // even: {
          //   background: "white",
          // },
          // odd: {
          //   background: BLUE_200,
          // },
        },
      },
      MuiSvgIcon: {
        defaultProps: {
          fontSize: "small",
        },
      },
      MuiTypography: {
        defaultProps: {
          color: "textPrimary",
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: { height: 1 },
        },
      },
      MuiBackdrop: {
        styleOverrides: {
          root: {
            zIndex: 0,
          },
        },
      },
      MuiButton: {
        defaultProps: {
          variant: "contained",
          color: "primary",
        },
        styleOverrides: {
          root: {
            fontSize: 14,
            borderRadius: 8,
            "&.MuiButton-containedInfo:hover": {
              backgroundColor: "#33363e",
            },
          },
          contained: {
            color: "black",
          },
          containedInherit: {
            color: "white",
            backgroundColor: "#272A32",
            "&:hover": {
              backgroundColor: alpha("#272A32", 0.6),
            },
          },
          text: {
            padding: "4px 16px",
          },
          outlined: {
            padding: "3px 16px",
            background: alpha(PRIMARY, 0.2),
            color: PRIMARY,
          },
          sizeLarge: {
            height: 40,
          },
          sizeMedium: {
            height: 36,
          },
          sizeSmall: {
            height: 30,
            borderRadius: 4,
          },
          outlinedInherit: {
            background: "#191B20",
            color: "#E8E8E8",
          },
          containedSecondary: { color: "#FFFFFF" },
          textInherit: {
            color: "#E8E8E8",
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          icon: {
            right: 8,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },

      MuiFormLabel: {
        defaultProps: { sx: { color: "text.primary" } },
        styleOverrides: {
          root: {
            fontSize: 14,
            marginBottom: 8,
            lineHeight: 1,
            fontWeight: 400,
          },
        },
      },
      MuiInputLabel: {
        defaultProps: {
          shrink: true,
        },
        styleOverrides: {
          root: {
            "&.MuiInputLabel-outlined.MuiInputLabel-shrink": {
              transform: "unset",
              position: "relative",
            },
            "&.MuiInputLabel-shrink": {
              transform: "unset",
              position: "relative",
            },
          },
          asterisk: {
            color: red[600],
            "&::before": {
              color: blueGrey[400],
              content: '" ("',
            },
            "&::after": {
              color: blueGrey[400],
              content: '" )"',
            },
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: { height: 8 },
          contained: { marginLeft: 0 },
        },
      },
      MuiOutlinedInput: {
        defaultProps: {
          sx: {
            bgcolor: "background.default",
          },
        },
        styleOverrides: {
          root: { padding: 0, borderRadius: 8 },
          adornedEnd: { padding: 0 },
          adornedStart: { padding: 0 },
        },
      },
      MuiAutocomplete: {
        styleOverrides: {
          inputRoot: {
            "& .MuiAutocomplete-endAdornment": {
              position: "relative",
              right: "0px !important",
            },
            paddingRight: "8px !important",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          multiline: {
            padding: "0px !important",
          },
          input: {
            padding: "8px 8px !important",
            minHeight: 24,
          },
          inputMultiline: {
            height: "auto !important",
            padding: "8px 8px !important",
          },
          root: {
            borderRadius: 4,
            fontSize: 14,
            backgroundColor: "#181A20",
            "& fieldset": {
              top: 0,
              "& legend": {
                display: "none",
              },
            },
            "& .MuiAutocomplete-popper.MuiAutocomplete-paper": {
              padding: 0,
            },
          },
        },
      },
    },
    typography: {
      htmlFontSize: 14,
      fontSize: 14,
      button: { textTransform: "none" },
      fontFamily: "Montserrat",
      h1: { fontSize: 96, lineHeight: "112px", fontWeight: 600 },
      h2: { fontSize: 60, lineHeight: "72px", fontWeight: 600 },
      h3: { fontSize: 48, lineHeight: "56px", fontWeight: 600 },
      h4: { fontSize: 32, lineHeight: "44px", fontWeight: 700 },
      h5: { fontSize: 24, lineHeight: "34px", fontWeight: 700 },
      h6: { fontSize: 20, lineHeight: "30px", fontWeight: 600 },
      subtitle1: {
        fontSize: "16px",
        lineHeight: "24px",
        fontWeight: 600,
      },
      subtitle2: {
        fontSize: "14px",
        lineHeight: "22px",
        fontWeight: 600,
      },
      body1: {
        fontSize: "16px",
        lineHeight: "24px",
      },
      body2: {
        fontSize: "14px",
        lineHeight: "22px",
      },
      caption: {
        fontSize: "12px",
        lineHeight: "18px",
      },
      fontWeightBold: 600,
    },
    shadows: [
      "none",
      "2px 4px 10px rgba(0, 0, 0, 0.05)",
      "0px 6px 12px rgba(0, 0, 0, 0.1)",
      "0px 10px 16px rgba(0, 0, 0, 0.1)",
      "0px 16px 22px rgba(0, 0, 0, 0.08)",
      "0px 28px 32px rgba(0, 0, 0, 0.08)",
      "0px 32px 64px rgba(0, 0, 0, 0.08)",
      ...shadows.slice(7),
    ] as any,
    palette: {
      mode: "dark",
      primary: {
        light: alpha(PRIMARY, 0.9),
        main: PRIMARY,
        dark: darken(PRIMARY, 0.1),
        contrastText: "#ffffff",
      },
      secondary: {
        light: alpha(SECONDARY, 0.9),
        main: SECONDARY,
        dark: darken(SECONDARY, 0.1),
        contrastText: "#ffffff",
      },
      text: {
        primary: "#fff",
        secondary: "#888993",
        disabled: "rgba(255, 255, 255, 0.5)",
      },
      action: {
        active: "#fff",
        hover: "rgba(255, 255, 255, 0.08)",
        selected: "rgba(255, 255, 255, 0.16)",
        disabled: "rgba(255, 255, 255, 0.3)",
        disabledBackground: "rgba(255, 255, 255, 0.12)",
      },
      background: {
        paper: "#1C1E24",
        default: "#0D0E0F",
      },
      divider: "rgba(255, 255, 255, 0.12)",
      grey: {
        "50": "#393B42",
        "100": "#15171C",
        "200": "#131418",
        "300": "#272A32",
        "900": "#000000",
      },
      success: {
        main: "#37FACD",
        dark: darken("#04D482", 0.1),
        light: alpha("#04D482", 0.08),
      },
      error: {
        main: "#FC4444",
        dark: darken("#FC4444", 0.1),
        light: alpha("#FC4444", 0.08),
      },
      warning: {
        main: "#FFCE00",
        dark: darken("#E0B403", 0.1),
        light: alpha("#E0B403", 0.08),
      },
      info: { main: "#393B42" },
    },
  });
};

const LightTheme = () => {
  const PRIMARY = "#FEDB00";
  const SECONDARY = "#0037ff";
  return createTheme({
    components: {
      MuiTableContainer: {
        defaultProps: {
          sx: { bgcolor: "background.paper" },
        },
        styleOverrides: {
          root: {
            borderRadius: 8,
            height: "100%",
            padding: 8,
          },
        },
      },
      MuiTableHead: {
        defaultProps: {
          sx: { "& th": { backgroundColor: "grey.300" } },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: "12px 8px",
            fontSize: 14,
            fontWeight: 500,
            borderBottom: "0.5px solid #EDEDED",
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            "&:hover": {
              boxShadow: "0px 9px 20px rgb(230 218 218 / 46%)",
            },
          },
        },
      },

      MuiInputAdornment: {
        styleOverrides: {
          positionStart: {
            marginLeft: 8,
            marginRight: 0,
          },
          positionEnd: {
            marginLeft: 0,
            marginRight: 12,
          },
        },
      },
      MuiTooltip: {
        defaultProps: { arrow: true },
      },
      MuiTablePagination: {
        styleOverrides: {
          root: { justifyContent: "flex-end" },
          selectRoot: {
            margin: "0 16px 0 8px",
            minWidth: "64px",
          },
          selectIcon: {
            top: "calc(50% - 14px)",
          },
          menuItem: { fontSize: 12 },
          input: {
            "& .MuiTablePagination-select": {
              textAlign: "left",
              textAlignLast: "left",
              background: "inherit",
              border: `0.5px solid ${grey[400]}`,
              borderRadius: "2px",
              fontSize: 14,
              padding: "3px 12px",
            },
          },
          actions: {
            marginLeft: "10px",
            "& .MuiIconButton-root": {
              padding: "6px",
            },
          },
          spacer: {
            flex: "unset",
          },
          // even: {
          //   background: "white",
          // },
          // odd: {
          //   background: BLUE_200,
          // },
        },
      },
      MuiSvgIcon: {
        defaultProps: {
          fontSize: "small",
        },
      },
      MuiTypography: {
        defaultProps: {
          color: "textPrimary",
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: { height: 1 },
        },
      },
      MuiBackdrop: {
        styleOverrides: {
          root: {
            zIndex: 0,
          },
        },
      },
      MuiButton: {
        defaultProps: {
          variant: "contained",
          color: "primary",
        },
        styleOverrides: {
          root: {
            color: "black",
            fontSize: 14,
            borderRadius: 8,
          },
          contained: {},
          text: {
            padding: "4px 16px",
          },
          outlined: {
            padding: "3px 16px",
            background: alpha(PRIMARY, 0.2),
          },
          outlinedPrimary: {
            color: "#FFC916",
          },
          sizeLarge: {
            height: 40,
          },
          sizeMedium: {
            height: 36,
          },
          sizeSmall: {
            height: 30,
            borderRadius: 4,
          },
          outlinedInherit: {
            background: "#FFFFFF",
            // color: "#fff",
          },
          // containedSecondary: { color: "#FFFFFF" },
          textInherit: {
            // color: "#E8E8E8",
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          icon: {
            right: 8,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
      MuiFormLabel: {
        defaultProps: { sx: { color: "text.primary" } },
        styleOverrides: {
          root: {
            fontSize: 14,
            marginBottom: 8,
            lineHeight: 1,
            fontWeight: 400,
          },
        },
      },
      MuiInputLabel: {
        defaultProps: {
          shrink: true,
        },
        styleOverrides: {
          root: {
            "&.MuiInputLabel-outlined.MuiInputLabel-shrink": {
              transform: "unset",
              position: "relative",
            },
            "&.MuiInputLabel-shrink": {
              transform: "unset",
              position: "relative",
            },
          },
          asterisk: {
            color: red[600],
            "&::before": {
              color: blueGrey[400],
              content: '" ("',
            },
            "&::after": {
              color: blueGrey[400],
              content: '" )"',
            },
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: { height: 8 },
          contained: { marginLeft: 0 },
        },
      },
      MuiOutlinedInput: {
        defaultProps: {
          sx: {
            bgcolor: "background.default",
          },
        },
        styleOverrides: {
          root: { padding: 0, borderRadius: 8 },
          adornedEnd: { padding: 0 },
          adornedStart: { padding: 0 },
        },
      },
      MuiAutocomplete: {
        styleOverrides: {
          inputRoot: {
            "& .MuiAutocomplete-endAdornment": {
              position: "relative",
              right: "0px !important",
            },
            paddingRight: "8px !important",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          multiline: {
            padding: "0px !important",
          },
          input: {
            padding: "8px 8px !important",
            minHeight: 24,
          },
          inputMultiline: {
            height: "auto !important",
            padding: "8px 8px !important",
          },
          root: {
            borderRadius: 4,
            fontSize: 14,
            "& fieldset": {
              top: 0,
              "& legend": {
                display: "none",
              },
            },
            "& .MuiAutocomplete-popper.MuiAutocomplete-paper": {
              padding: 0,
            },
          },
        },
      },
    },
    typography: {
      htmlFontSize: 14,
      fontSize: 14,
      button: { textTransform: "none" },
      fontFamily: "Montserrat",
      h1: { fontSize: 96, lineHeight: "112px", fontWeight: 600 },
      h2: { fontSize: 60, lineHeight: "72px", fontWeight: 600 },
      h3: { fontSize: 48, lineHeight: "56px", fontWeight: 600 },
      h4: { fontSize: 32, lineHeight: "44px", fontWeight: 700 },
      h5: { fontSize: 24, lineHeight: "34px", fontWeight: "normal" },
      h6: { fontSize: 20, lineHeight: "30px", fontWeight: 600 },
      subtitle1: {
        fontSize: "16px",
        lineHeight: "24px",
        fontWeight: 600,
      },
      subtitle2: {
        fontSize: "14px",
        lineHeight: "22px",
        fontWeight: 600,
      },
      body1: {
        fontSize: "16px",
        lineHeight: "24px",
      },
      body2: {
        fontSize: "14px",
        lineHeight: "22px",
      },
      caption: {
        fontSize: "12px",
        lineHeight: "18px",
      },
      fontWeightBold: 600,
    },
    shadows: [
      "none",
      "2px 4px 10px rgba(0, 0, 0, 0.05)",
      "0px 6px 12px rgba(0, 0, 0, 0.1)",
      "0px 10px 16px rgba(0, 0, 0, 0.1)",
      "0px 16px 22px rgba(0, 0, 0, 0.08)",
      "0px 28px 32px rgba(0, 0, 0, 0.08)",
      "0px 32px 64px rgba(0, 0, 0, 0.08)",
      ...shadows.slice(7),
    ] as any,
    palette: {
      primary: {
        light: alpha(PRIMARY, 0.9),
        main: PRIMARY,
        dark: darken(PRIMARY, 0.1),
        contrastText: "#ffffff",
      },
      secondary: {
        light: alpha(SECONDARY, 0.9),
        main: SECONDARY,
        dark: darken(SECONDARY, 0.1),
        contrastText: "#ffffff",
      },

      text: {
        primary: grey[900],
        secondary: blueGrey[400],
      },
      background: {
        paper: "#fff",
        default: "#E5E5E5",
      },
      grey: { 300: "#E3E3E3" },
      success: {
        main: "#3aad00",
        dark: darken("#3aad00", 0.1),
        light: alpha("#3aad00", 0.08),
      },
      error: {
        main: "#FC4444",
        dark: darken("#FC4444", 0.1),
        light: alpha("#FC4444", 0.08),
      },
      warning: {
        main: "#FFCE00",
        dark: darken("#E0B403", 0.1),
        light: alpha("#E0B403", 0.08),
      },
      info: { main: "#E3E3E3" },
    },
  });
};

export const MUITheme = (mode?: PaletteMode) => {
  if (mode === "dark") {
    return DarkTheme();
  } else {
    return LightTheme();
  }
};
