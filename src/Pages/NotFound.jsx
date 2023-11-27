import React from "react";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";

const stylesLink = {
  color: "#0fdddd",
  fontWeight: "bold",
  textDecoration: "none",
};

export default function NotFound() {
  const matches = useMediaQuery("(min-width:601px)");

  return (
    <Box
      sx={{
        color: "primary.main",
        fontSize: "25px",
        alignSelf: "start",
        mt: 15,
        textAlign: matches ? "left" : "center",
        ml: matches ? 4 : 0,
      }}
    >
      You have reached a dead end! Go back to{" "}
      <Link to="/" underline="none" style={stylesLink}>
        overview
      </Link>{" "}
      or go to{" "}
      <Link to="/statistics" style={stylesLink}>
        statistics!
      </Link>
    </Box>
  );
}
