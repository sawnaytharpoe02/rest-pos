import { ThemeOptions } from "@mui/material/styles";
import { colorsToken } from "./colorToken";

export const palette = (): ThemeOptions["palette"] => {
  return {
    mode: "light",
    primary: {...colorsToken.primary},
    secondary: {...colorsToken.secondary},
    success: {...colorsToken.success},
    info: {...colorsToken.info},
    warning: {...colorsToken.warning},
    grey: {...colorsToken.grey},
  } as ThemeOptions["palette"];
};
