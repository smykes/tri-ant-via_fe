import { Card, CardContent, Typography, CardActions } from "@mui/material";
import { Container } from "@mui/system";
import * as React from "react";
import { Link } from "react-router-dom";
import Curtesy from "./Curtesy";

const ErrorMessage = () => {
  return (
    <Container maxWidth="xs" sx={{ marginTop: "3em" }}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Oh, oh.
          </Typography>
          <Typography mb="1em" variant="h5" component="div">
            Something went wrong, hope it's not cordecyps.
          </Typography>
          <img
            width="320"
            height="320"
            src="/images/ant_zombie.webp"
            alt="A confused ant."
          />
          <Curtesy />
        </CardContent>
      </Card>
    </Container>
  );
};

export default ErrorMessage;
