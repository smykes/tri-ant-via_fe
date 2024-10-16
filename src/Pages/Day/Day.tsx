import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
import { addDays, differenceInCalendarDays, subDays, format } from "date-fns";
import { DayFuture } from "./DayFuture";
import DayNavigation from "./DayNavigation";
import ErrorMessage from "../../Components/ErrorMessage";
import { IWinPayload } from "../../Interfaces/Interfaces";

const Day = () => {
  // Get the date being viewed from the parameters in the URL
  const { month, day, year } = useParams();
  // Try and parse the year, if something goes wrong just set it to 1970 (ts error)
  const yearNormalized = year ? parseInt(year) : 1970;
  // Try and parse the month, if something goes wrong just set it to 1 (ts error)
  const monthNormalized = month ? parseInt(month) : 1;
  // Try and parse the day, if something goes wrong just set it to 1 (ts error)
  const dayNormalized = day ? parseInt(day) : 1;
  /*-- 
    Check if the date being vieweed is in the future month needs to have subtracted 
    because the URL month is not zero indexed, but the library is.
  --*/
  const isFuture = differenceInCalendarDays(
    new Date(yearNormalized, monthNormalized - 1, dayNormalized),
    new Date()
  );

  const monthNameFromUrl = format(
    new Date(yearNormalized, monthNormalized - 1),
    "MMMM"
  );
  const previousDayFromUrl = subDays(
    new Date(yearNormalized, monthNormalized - 1, dayNormalized),
    1
  );
  const nextDayFromUrl = addDays(
    new Date(yearNormalized, monthNormalized - 1, dayNormalized),
    1
  );
  const formatedNextDayFromUrl = format(new Date(nextDayFromUrl), "LL/dd/yyyy");
  const formatedPreviousDayFromUrl = format(
    new Date(previousDayFromUrl),
    "LL/dd/yyyy"
  );

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
        {dayWinner?.today.length === 0 && !isLoading && !hasError && (
          <Card elevation={3} sx={{ marginTop: "3em" }}>
            <CardContent>
              <DayFuture futureStatus={isFuture}></DayFuture>
              <Link to={`/day/${formatedPreviousDayFromUrl}`}>
                <Button size="small">View Yesterday</Button>
              </Link>
            </CardContent>
          </Card>
        )}
        {dayWinner && dayWinner.today.length > 0 && !isLoading && !hasError && (
          <>
            <DayNavigation
              previousDay={formatedPreviousDayFromUrl}
              winner={dayWinner}
              nextDay={formatedNextDayFromUrl}
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
                  🥇 {monthNameFromUrl} Wins
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
