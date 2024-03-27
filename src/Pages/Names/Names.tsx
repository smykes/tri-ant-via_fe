import * as React from "react";
import { useEffect, useState } from "react";
import { Endpoint } from "../../constants";

import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import { Container, Card, Typography, Skeleton } from "@mui/material";
import ErrorMessage from "../../Components/ErrorMessage";

export function Names() {
  const [dayWinner, setDayWinner] = useState<Array<string>>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  const month = DateTime.now();

  useEffect(() => {
    async function getAllUsers() {
      try {
        const res = await fetch(`${Endpoint.BACKEND_API}trivia/users`);
        const json = await res.json();
        setIsLoading(false);
        setDayWinner(json);
      } catch (e) {
        setHasError(true);
        setIsLoading(false);
        console.log(e);
      }
    }
    try {
      getAllUsers();
    } catch (e) {
      console.log(e);
      setHasError(true);
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      {!isLoading && !hasError && (
        <Container maxWidth="xs">
          <Typography
            sx={{ textAlign: "center", fontWeight: 800, marginTop: "1em" }}
            color="text.secondary"
            gutterBottom
            variant="h5"
            component="h1"
            mb="0"
          >
            Competitors
          </Typography>
          <Card elevation={3} sx={{ marginTop: "1em", marginBottom: "3em" }}>
            {dayWinner &&
              dayWinner?.map((winner) => {
                return (
                  <List
                    key={winner}
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      bgcolor: "background.paper",
                    }}
                    data-testid="individual_user"
                  >
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="initial">
                          {winner[1].toUpperCase()}
                        </Avatar>
                      </ListItemAvatar>
                      <Link to={`/winner/${winner}`}>{winner}</Link>
                    </ListItem>
                  </List>
                );
              })}
          </Card>
        </Container>
      )}
      {!isLoading && hasError && <ErrorMessage />}
      {isLoading && !hasError && (
        <>
          <Skeleton
            variant="rectangular"
            width={400}
            height={32}
            sx={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "1em",
              marginBottom: "1em",
            }}
          />

          <Skeleton
            variant="rectangular"
            width={400}
            height={250}
            sx={{ marginLeft: "auto", marginRight: "auto", marginTop: "1rem" }}
          />
        </>
      )}
    </>
  );
}
