import React from "react";
import { lazy, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Endpoint } from "../../constants";
import {
  Container,
  CardContent,
  CardActions,
  Typography,
  Button,
  Card,
  Skeleton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { differenceInCalendarDays } from "date-fns";
import { DateTime } from "luxon";
import { DayFuture } from "./DayFuture";
import { IWinPayload } from "../../Interfaces/Interfaces";
const DayNavigation = lazy(() => import("./DayNavigation"));
const ErrorMessage = lazy(() => import("../../Components/ErrorMessage"));

const Day = () => {
  const { month, day, year } = useParams();
  const yearNormalized = year ? parseInt(year) : 1970;
  const monthNormalized = month ? parseInt(month) : 1;
  const dayNormalized = day ? parseInt(day) : 1;
  const isFuture = differenceInCalendarDays(
    new Date(yearNormalized, monthNormalized - 1, dayNormalized),
    new Date()
  );
  const dt = DateTime.fromISO(`${year}-${month}-${day}`);
  const pageMonth = dt.monthLong;
  const prev = dt.minus({ days: 1 });
  const next = dt.plus({ days: 1 });
  const formatedNext = next.toFormat("MM'/'dd'/'yyyy");
  const formatedPrev = prev.toFormat("MM'/'dd'/'yyyy");

  const [dayWinner, setDayWinner] = useState<IWinPayload>();
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [hasError, setHasError] = useState<Boolean>(false);

  useEffect(() => {
    async function dailyWinner() {
      try {
        const res = await fetch(
          `${Endpoint.BACKEND_API}trivia/day/${month}/${day}/${year}`
        );
        const json = await res.json();
        setIsLoading(false);
        setHasError(false);
        setDayWinner(json);
      } catch (e) {
        setIsLoading(false);
        setHasError(true);
        console.log(e);
      }
    }
    dailyWinner();
  }, [month, day, year]);

  return (
    <>
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

      <Container maxWidth="xs">
        {!dayWinner?.today && !isLoading && !hasError && (
          <Card elevation={3} sx={{ marginTop: "3em" }}>
            <CardContent>
              <DayFuture futureStatus={isFuture}></DayFuture>
              <Link to={`/day/${formatedPrev}`}>
                <Button size="small">View Yesterday</Button>
              </Link>
            </CardContent>
          </Card>
        )}
        {dayWinner && dayWinner.today && !isLoading && !hasError && (
          <>
            <DayNavigation
              previousDay={formatedPrev}
              winner={dayWinner}
              nextDay={formatedNext}
            />

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
        {!isLoading && hasError && <ErrorMessage />}
      </Container>
    </>
  );
};

export default Day;
