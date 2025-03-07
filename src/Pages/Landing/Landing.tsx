import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import Curtesy from "../../Components/Curtesy";

export function Landing() {
  return (
    <Container maxWidth="xs" sx={{ marginTop: "3em" }}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Welcome to the colony...
          </Typography>
          <Typography mb="1em" variant="h5" component="div">
            Trivia results at your antennae tips.
          </Typography>
          <img
            width="320"
            height="240"
            src="/images/ant_trivia.png"
            alt="An ant trivia host."
          />
          <Curtesy />
        </CardContent>
      </Card>
    </Container>
  );
}
