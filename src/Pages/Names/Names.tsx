import { useEffect, useState } from "react";
import { Endpoint } from "../../constants";

import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import { Container, Card } from "@mui/material";

export const Names = () => {
  function getDate(numericDate: number): string {
    const clueDate = new Date(numericDate);
    const clueString = `${
      clueDate.getMonth() + 1
    }/${clueDate.getDate()}/${clueDate.getFullYear()}`;

    return clueString;
  }
  const [dayWinner, setDayWinner] = useState<Array<string>>();
  const month = DateTime.now();
  console.log(month);

  useEffect(() => {
    async function getAllUsers() {
      const res = await fetch(`${Endpoint.BACKEND_API}/trivia/users`);
      console.log(res);
      const json = await res.json();
      console.log(json);
      // json.sort();

      setDayWinner(json);
    }
    try {
      getAllUsers();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <Container maxWidth="xs">
      <Card elevation={3} sx={{ marginTop: "3em", marginBottom: "3em" }}>
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
  );
};
