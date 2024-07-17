import React from "react";

import type { Metadata } from "next";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

import { ThemeProvider } from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";

import ReduxPreloader from "~redux/preloader";

import MasterLayout from "~layouts/master";

import theme from "~styles/theme";

const metadata: Metadata = {
  title: "Website",
};

const Layout = (props: React.PropsWithChildren) => {
  return (
    <html lang={"en"}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline/>
            <ReduxPreloader>
              <MasterLayout>
                { props.children }
              </MasterLayout>
            </ReduxPreloader>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};

export {
  metadata,
};

export default Layout;
