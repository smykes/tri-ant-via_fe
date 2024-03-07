import { useEffect, useState } from "react";
import { Endpoint } from "../../constants";
import { differenceInCalendarMonths } from "date-fns";
import { getMonthByString } from "../../Helpers/Functions/dateFunctions";
import { MonthFuture } from "./MonthFuture";
import { useParams } from "react-router";
import { MonthNavigation } from "./MonthNavigation";
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
  const [dailyWinners, setDailyWinners] = useState<Array<IWinner>>();
  useEffect(() => {
    async function fetchBooks() {
      const res = await fetch(
        `${Endpoint.BACKEND_API}/trivia/winners/${month}/${year}`
      );
      const json = await res.json();
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
          <Typography
            sx={{ fontSize: 24, textAlign: "center", fontWeight: 800 }}
            variant="h1"
            component="h5"
            color="text.secondary"
            gutterBottom
          >
            <MonthNavigation
              monthName={monthName}
              year={yearNormalized}
              futureStatus={isFuture}
              month={monthNormalized}
            />
          </Typography>
          {!dailyWinners && (
            <Card elevation={3} sx={{ marginTop: "1em" }}>
              <CardContent>
                <MonthFuture futureStatus={isFuture}></MonthFuture>
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
