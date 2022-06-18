import { useEffect, useState } from "react";

import { DateTime } from "luxon";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";

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
    async function fetchBooks() {
      const res = await fetch(`//localhost:3001/api/trivia/users`);
      const json = await res.json();
      json.sort();

      setDayWinner(json);
    }
    fetchBooks();
  }, []);

  return (
    <>
      {dayWinner &&
        dayWinner?.map((winner) => {
          return (
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="initial">
                    {winner[1].toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <a href={`/winner/${winner}`}>{winner}</a>
              </ListItem>
            </List>
            // <h6 key={winner}>
            //   <a href={`/winner/${winner}`}>{winner}</a>
            // </h6>
          );
        })}
    </>
  );
};
