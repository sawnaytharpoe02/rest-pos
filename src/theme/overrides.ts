import { ThemeOptions } from "@mui/material";

export const overrides = (): ThemeOptions["components"] => {
  return {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
        },
        html: {
          margin: 0,
          padding: 0,
          width: "100%",
          height: "100%",
          WebkitOverflowScrolling: "touch",
        },
        body: {
          margin: 0,
          padding: 0,
          width: "100%",
          height: "100%",
        },
        "#root": {
          width: "100%",
          height: "100%",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: ".5rem",
          color: "#eee",
          textTransform: "capitalize",
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        inputRoot: {
          borderRadius: ".5rem",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
      defaultProps: {
        size: "small",
        InputLabelProps: {
          shrink: true,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "1px solid #C4CDD5",
          borderRightStyle: "dashed",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderStyle: "dashed",
          borderColor: "#C4CDD5",
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderRadius: ".5rem",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(10px)",
          boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 10px",
          padding: "0.3rem",
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          color: "#637381",
        },
      },
    },
  };
};
