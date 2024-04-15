import { ThemeOptions } from "@mui/material";

export const typography = (): ThemeOptions["typography"] => {
  return {
    fontFamily: ["Inter", "Baloo 2", "Segoe UI", "sans-serif"].join(","),
    h1: {
      fontSize: 64,
      lineHeight: 80 / 64,
      fontWeight: 800,
      letterSpacing: 0,
    },
    h2: {
      fontSize: 48,
      lineHeight: 64 / 48,
      fontWeight: 800,
      letterSpacing: 0,
    },
    h3: {
      fontSize: 32,
      lineHeight: 48 / 32,
      fontWeight: 700,
      letterSpacing: 0,
    },
    h4: {
      fontSize: 24,
      lineHeight: 36 / 24,
      fontWeight: 700,
      letterSpacing: 0,
    },
    h5: {
      fontSize: 20,
      lineHeight: 30 / 20,
      fontWeight: 700,
      letterSpacing: 0,
    },
    h6: {
      fontSize: 18,
      lineHeight: 28 / 18,
      fontWeight: 700,
      letterSpacing: 0,
    },
    subtitle1: {
      fontSize: 16,
      lineHeight: 24 / 16,
      fontWeight: 600,
      letterSpacing: 0,
    },
    subtitle2: {
      fontSize: 14,
      lineHeight: 22 / 14,
      fontWeight: 600,
      letterSpacing: 0,
    },
    body1: {
      fontSize: 16,
      lineHeight: 24 / 16,
      fontWeight: 400,
      letterSpacing: 0,
    },
    body2: {
      fontSize: 14,
      lineHeight: 22 / 14,
      fontWeight: 400,
      letterSpacing: 0,
    },
    caption: {
      fontSize: 12,
      lineHeight: 18 / 12,
      fontWeight: 400,
      letterSpacing: 0,
    },
    overline: {
      fontSize: 12,
      lineHeight: 18 / 12,
      fontWeight: 400,
      letterSpacing: 0,
    },
    button: {
      fontSize: 14,
      lineHeight: 24 / 14,
      fontWeight: 700,
      letterSpacing: 0,
    },
  };
};
