import { Metadata } from "next";

import { Box, Typography, Button } from "@mui/material";

import Link from "next/link";

const metadata: Metadata = {
  title: "404",
};

const NotFound = async () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      gap={2}
      height={"100%"}
      width={"100%"}
      flex={1}
    >
      <Typography>Page not found</Typography>
      <Link href={"/"}>
        <Button>
          Home
        </Button>
      </Link>
    </Box>
  );
};

export {
  metadata,
};

export default NotFound;
