import { useEffect, useState } from "react";
import { Container, CardContent, CardActions, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { DateTime } from "luxon";

import { Card } from "@mui/material";
import { Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

interface IWinPayload {
  all_time_count: number;
  month_count: number;
  today: IForm;
}

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
  // true = tomorrow
  // fale = yesterday
  // function getDayLink(direction: boolean, numbericDate: number): string {
  //   const dt = DateTime.fromISO(`${year}-${month}-${day}`);

  //   const currentCludeDate = new Date(numbericDate);
  //   const formatedNext = currentCludeDate.toFormat("MM'/'dd'/'yyyy");
  //   return;
  // }

  function getDate(numericDate: number): string {
    console.log(numericDate);
    const clueDate = new Date(numericDate);
    const clueString = `${
      clueDate.getMonth() + 1
    }/${clueDate.getDate()}/${clueDate.getFullYear()}`;

    return clueString;
  }
  const [dayWinner, setDayWinner] = useState<IWinPayload>();
  const month = DateTime.now();
  console.log(month);

  useEffect(() => {
    async function fetchBooks() {
      const res = await fetch(
        `//tri-ant-via-be.herokuapp.com/api/trivia/today`
      );
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
        <>
          <Typography
            sx={{ fontSize: 24, textAlign: "center", fontWeight: 900 }}
            color="text.secondary"
            variant="h1"
            mt={4}
            mb={0}
          >
            <Link to={`/day`}>
              <IconButton color="primary" aria-label="add to shopping cart">
                <ArrowCircleLeftIcon />
              </IconButton>
            </Link>
            Trivia of the Day -{" "}
            {dayWinner && getDate(dayWinner.today.clue_date)}
            <Link to={`/day`}>
              <IconButton color="primary" aria-label="add to shopping cart">
                <ArrowCircleRightIcon />
              </IconButton>
            </Link>
          </Typography>
          <Card elevation={3} sx={{ marginTop: "1em" }}>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                sx={{ fontSize: 12, marginTop: "1em" }}
                component="div"
              >
                Clue
              </Typography>
              <Typography gutterBottom variant="h5" component="label">
                {dayWinner && <div>{dayWinner.today.clue}</div>}
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
                {dayWinner.today.answer}
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                sx={{ fontSize: 12, marginTop: "1em" }}
                component="div"
              >
                Winner
              </Typography>
              <Link to={`/winner/${dayWinner.today.winners[0].user}`}>
                {dayWinner.today.winners[0].user}
              </Link>
              <Typography
                gutterBottom
                variant="h5"
                sx={{ fontSize: 12, marginTop: "1em" }}
                component="div"
              >
                Country
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {dayWinner.today.winners[0].country} &nbsp;
                {dayWinner.today.winners[0].flag}
              </Typography>

              <Typography
                gutterBottom
                variant="h5"
                sx={{ fontSize: 12, marginTop: "1em" }}
                component="div"
              >
                🥇 All Time Wins
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {dayWinner.all_time_count}
              </Typography>

              <Typography
                gutterBottom
                variant="h5"
                sx={{ fontSize: 12, marginTop: "1em" }}
                component="div"
              >
                🥇 {month.monthLong} Wins
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {dayWinner.month_count}
              </Typography>
            </CardContent>
            <CardActions>
              <Button target="_blank" href={dayWinner.today.url} size="small">
                Learn More About the Answer
              </Button>
            </CardActions>
          </Card>
        </>
      )}
    </Container>
  );
};
