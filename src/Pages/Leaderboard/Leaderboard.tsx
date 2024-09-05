import { lazy, useEffect, useState } from "react";
import { Endpoint } from "../../constants";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Container, Card, Typography, Skeleton } from "@mui/material";
const ErrorMessage = lazy(() => import("../../Components/ErrorMessage"));
import { ITopList } from "../../Interfaces/Interfaces";

export const Leaderboard = () => {
  const [dayWinner, setDayWinner] = useState<Array<ITopList>>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    async function getAllUsers() {
      try {
        const res = await fetch(`${Endpoint.BACKEND_API}trivia/top`);
        const json = await res.json();
        console.log(json);
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
            Top Ten
          </Typography>
          <Card elevation={3} sx={{ marginTop: "1em", marginBottom: "3em" }}>
            {dayWinner &&
              dayWinner?.map((winner, index) => {
                return (
                  <List
                    key={winner.name}
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      bgcolor: "background.paper",
                    }}
                    data-testid="individual_user"
                  >
                    <ListItem>
                      {winner.count} Wins - &nbsp;
                      <Link to={`/winner/${winner.name}`}>{winner.name}</Link>
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
};
