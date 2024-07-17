"use client";

import { Kanit } from "next/font/google";

import { createTheme } from "@mui/material/styles";

const kanitFont = Kanit({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  spacing: 8,
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: kanitFont.style.fontFamily,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          height: "100vh",
          overflow: "hidden",
        },
      },
    },
  },
});

export {
  kanitFont,
};

export default theme;
