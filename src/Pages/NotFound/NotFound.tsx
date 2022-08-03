import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Container } from "@mui/system";

export function NotFound() {
  return (
    <Container maxWidth="xs" sx={{ marginTop: "3em" }}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Oh, oh.
          </Typography>
          <Typography mb="1em" variant="h5" component="div">
            You seem to have lost the pheremone trail...
          </Typography>
          <img
            width="320"
            height="240"
            src="/images/ant_columbo.png"
            alt="A confused ant."
          />
          <Typography mt="1em" textAlign="center" component="p">
            Courtesy{" "}
            <a href="https://sciantsmedia.com" target="blank">
              Sciants Media
            </a>{" "}
            &#169;
            {new Date().getFullYear()}
          </Typography>
        </CardContent>
        <CardActions>
          <Link to={"/"}>Head back to the colonoy</Link>
        </CardActions>
      </Card>
    </Container>
  );
}
