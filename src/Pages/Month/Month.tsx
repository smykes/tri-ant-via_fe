import { useEffect, useState } from "react";
import { Endpoint } from "../../constants";
import { differenceInCalendarMonths } from "date-fns";
import getMonthByString from "../../Helpers/Functions/dateFunctions";

import { useParams } from "react-router";
import {
  Stack,
  Box,
  Paper,
  Container,
  CardContent,
  Typography,
  Card,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

interface IWinner {
  name: string;
  count: string;
}
export const Month = () => {
  const { month, year } = useParams();
  const monthName = getMonthByString(month);
  const yearNormalized = year ? parseInt(year) : 1970;
  const monthNormalized = month ? parseInt(month) : 1;
  // is the second date after the first date
  const isFuture = differenceInCalendarMonths(
    new Date(yearNormalized, monthNormalized, 1),
    new Date()
  );
  console.log(isFuture);
  const [dailyWinners, setDailyWinners] = useState<Array<IWinner>>();
  console.log(Endpoint);
  console.log(process.env);
  useEffect(() => {
    async function fetchBooks() {
      const res = await fetch(
        `${Endpoint.BACKEND_API}/trivia/winners/${month}/${year}`
      );
      const json = await res.json();
      console.log(json);
      if (json.length) setDailyWinners(json);
      else {
        setDailyWinners(undefined);
      }
    }
    fetchBooks();
  }, [month, year]);

  return (
    <>
      <Container maxWidth="xs" sx={{ marginTop: "3em" }}>
        <Box>
          {!dailyWinners && (
            <Card elevation={3} sx={{ marginTop: "3em" }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  variant="h1"
                  color="text.secondary"
                  gutterBottom
                  mb={0}
                >
                  {monthName} {year} Standings
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {isFuture > 1 && "Nice try time traveler."}
                  {isFuture <= 1 &&
                    "smykes is lazy and hasn't imported the data yet. This usually happends on the last day of the month."}
                </Typography>
              </CardContent>
            </Card>
          )}
          {dailyWinners && (
            <Stack spacing={1}>
              {dailyWinners &&
                dailyWinners.map((value) => {
                  return (
                    <Item key={value.name}>
                      {value.name} - {value.count}
                    </Item>
                  );
                })}
            </Stack>
          )}
        </Box>
      </Container>
    </>
  );
};
