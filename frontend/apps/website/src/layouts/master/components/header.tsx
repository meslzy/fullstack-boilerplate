"use client";

import React from "react";

import { Box, Typography } from "@mui/material";

const Header = () => {
  return (
    <Box component={"header"} p={2}>
      <Typography lineHeight={1}>Website</Typography>
    </Box>
  );
};

export default Header;
