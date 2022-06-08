import { useEffect, useState } from "react";
import { Container, CardContent, CardActions } from "@mui/material";

import Button from "@mui/material/Button";

import { Card } from "@mui/material";
import { Typography } from "@mui/material";
interface IForm {
  answer: string;
  clue: string;
  clue_date: number;
  created_at: number;
  updated_at: number;
  url: string;
  winners: IFormArray[];
}

interface IFormArray {
  country: string;
  flag: string;
  user: string;
}
export const Today = () => {
  function getDate(numericDate: number): string {
    const clueDate = new Date(numericDate);
    const clueString = `${
      clueDate.getMonth() + 1
    }/${clueDate.getDate()}/${clueDate.getFullYear()}`;

    return clueString;
  }
  const [dayWinner, setDayWinner] = useState<IForm>();
  useEffect(() => {
    async function fetchBooks() {
      const res = await fetch(`//localhost:3001/api/trivia/today`);
      const json = await res.json();
      if (json) {
        console.log(json);
        setDayWinner(json);
      }
    }
    fetchBooks();
  }, []);

  return (
    <Container maxWidth="xs">
      {!dayWinner && (
        <Card elevation={3} sx={{ marginTop: "3em" }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Trivia of the Day
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              You must be early!
            </Typography>
            <Button target="_blank" href="#" size="small">
              View Yesterday
            </Button>
          </CardContent>
        </Card>
      )}
      {dayWinner && (
        <Card elevation={3} sx={{ marginTop: "3em" }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14, textAlign: "center" }}
              color="text.secondary"
              gutterBottom
            >
              Trivia of the Day - {dayWinner && getDate(dayWinner.clue_date)}
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              sx={{ fontSize: 10, marginTop: "1em" }}
              component="div"
            >
              Clue
            </Typography>
            <Typography gutterBottom variant="h5" component="label">
              {dayWinner && <div>{dayWinner.clue}</div>}
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              sx={{ fontSize: 10, marginTop: "1em" }}
              component="div"
            >
              Answer
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {dayWinner.answer}
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              sx={{ fontSize: 10, marginTop: "1em" }}
              component="div"
            >
              Winner
            </Typography>
            <Button endIcon={dayWinner.winners[0].flag} size="small">
              {dayWinner.winners[0].user}
            </Button>
          </CardContent>
          <CardActions>
            <Button target="_blank" href={dayWinner.url} size="small">
              Learn More
            </Button>
          </CardActions>
        </Card>
      )}
    </Container>
  );
};
