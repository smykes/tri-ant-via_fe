import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, CardContent, CardActions, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

import { Card, Box } from "@mui/material";
import { Typography } from "@mui/material";
import { DateTime } from "luxon";
import IconButton from "@mui/material/IconButton";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

interface IWinPayload {
  all_time_count: number;
  month_count: number;
  today: ICurrentDay[];
}

interface ICurrentDay {
  answer: string;
  clue: string;
  clue_date: number;
  created_at: number;
  updated_at: number;
  url: string;
  winners: IWinnerArray[];
}

interface IWinnerArray {
  country: string;
  flag: string;
  user: string;
}

export const Day = () => {
  let { month, day, year } = useParams();
  const dt = DateTime.fromISO(`${year}-${month}-${day}`);
  const pageMonth = dt.monthLong;
  const prev = dt.minus({ days: 1 });
  const next = dt.plus({ days: 1 });
  const formatedNext = next.toFormat("MM'/'dd'/'yyyy");
  const formatedPrev = prev.toFormat("MM'/'dd'/'yyyy");

  function getDate(numericDate: number): string {
    const clueDate = new Date(numericDate);
    const clueString = `${
      clueDate.getMonth() + 1
    }/${clueDate.getDate()}/${clueDate.getFullYear()}`;

    return clueString;
  }
  const [dayWinner, setDayWinner] = useState<IWinPayload>();

  useEffect(() => {
    async function fetchBooks() {
      const res = await fetch(
        `//tri-ant-via-be.herokuapp.com/api/trivia/day/${month}/${day}/${year}`
      );
      const json = await res.json();
      if (json) {
        console.log("---------------");
        console.log(json);
        setDayWinner(json);
      }
    }
    fetchBooks();
  }, [month, day, year]);

  return (
    <Container maxWidth="xs">
      {!dayWinner?.today && (
        <Card elevation={3} sx={{ marginTop: "3em" }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              variant="h1"
              color="text.secondary"
              gutterBottom
              mb={0}
            >
              Trivia of the Day
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              You must be early! (or trying to peer into the future...)
            </Typography>
            <Link to={`/day/${formatedPrev}`}>
              <Button size="small">View Yesterday</Button>
            </Link>
          </CardContent>
        </Card>
      )}
      {dayWinner && dayWinner.today && (
        <>
          <Box sx={{ display: "flex", alignItems: "center" }} mt="1.5em" mb="0">
            <Link to={`/day/${formatedPrev}`}>
              <IconButton color="primary" aria-label="Previous Day">
                <ArrowCircleLeftIcon />
              </IconButton>
            </Link>
            <Typography
              sx={{ textAlign: "center", fontWeight: 800 }}
              color="text.secondary"
              gutterBottom
              variant="h5"
              component="h1"
              mb="0"
            >
              Trivia of the Day -{" "}
              {dayWinner && getDate(dayWinner.today[0].clue_date)}
            </Typography>
            <Link to={`/day/${formatedNext}`}>
              <IconButton color="primary" aria-label="Next Day">
                <ArrowCircleRightIcon />
              </IconButton>
            </Link>
          </Box>

          <Card elevation={3} sx={{ marginTop: "0.5em" }}>
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
                {dayWinner && <div>{dayWinner.today[0].clue}</div>}
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
                {dayWinner.today[0].answer}
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                sx={{ fontSize: 12, marginTop: "1em" }}
                component="div"
              >
                Winner
              </Typography>
              <Link to={`/winner/${dayWinner.today[0].winners[0].user}`}>
                {dayWinner.today[0].winners[0].user}
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
                {dayWinner.today[0].winners[0].country} &nbsp;
                {dayWinner.today[0].winners[0].flag}
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
                🥇 {pageMonth} Wins
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {dayWinner.month_count}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                target="_blank"
                href={dayWinner.today[0].url}
                size="small"
              >
                Learn More
              </Button>
            </CardActions>
          </Card>
        </>
      )}
    </Container>
  );
};
