import React from "react";

import { Box, Typography } from "@mui/material";

import {isOdd} from "@libs/utils";

const Page = () => {
  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"100vh"}>
      <Typography>Welcome to the website</Typography>
      <Typography>{ isOdd(1) ? "1 is odd" : "1 is even" }</Typography>
    </Box>
  );
};

export default Page;
