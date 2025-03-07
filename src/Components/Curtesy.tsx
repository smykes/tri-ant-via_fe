import { Card, CardContent, Typography, CardActions } from "@mui/material";
import { Container } from "@mui/system";
import * as React from "react";
import { Link } from "react-router-dom";
const Curtesy = () => {
  return (
    <Typography
      mt="1em"
      textAlign="center"
      component="p"
      sx={{ fontSize: "0.5em" }}
    >
      Image Courtesy{" "}
      <a href="https://sciantsmedia.com" target="blank">
        Sciants Media
      </a>{" "}
      &#169;
      {new Date().getFullYear()}
    </Typography>
  );
};

export default Curtesy;
