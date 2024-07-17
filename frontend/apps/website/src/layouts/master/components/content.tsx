import React from "react";

import { Box } from "@mui/material";

const Content = (props: React.PropsWithChildren) => {
  return (
    <Box flex={1}>
      { props.children }
    </Box>
  );
};

export default Content;
