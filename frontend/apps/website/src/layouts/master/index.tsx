import React from "react";

import { Box } from "@mui/material";

import Header from "./components/header";
import Content from "./components/content";

const MasterLayout = async (props: React.PropsWithChildren) => {
  return (
    <Box height={"100%"} display={"flex"} flexDirection={"column"}>
      <Header/>
      <Content>
        { props.children }
      </Content>
    </Box>
  );
};

export default MasterLayout;
