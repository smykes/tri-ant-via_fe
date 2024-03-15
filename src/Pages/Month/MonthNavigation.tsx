import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { getYear, getMonth, addMonths, subMonths } from "date-fns";
import { useParams } from "react-router";
import {
  getMonthByString,
  getNextMonthNormalized,
  getPreviousMonthNormalized,
} from "../../Helpers/Functions/dateFunctions";
import { IMonthNavigation } from "../../Interfaces/Interfaces";

export const MonthNavigation = (props: IMonthNavigation) => {
  // month determined by params
  // month as an integer
  // year determined by params
  // year as an integer
  // month name
  // Whether the next month is in the future

  const { month, year } = useParams();
  // Tells whether the next month is in the future
  const { futureStatus } = props;
  // Turns the year into a number
  const yearNormalized = year ? parseInt(year) : 1970;
  // Turns the date into a number
  const monthNormalized = month ? parseInt(month) : 0;
  const viewingDate = new Date(yearNormalized, monthNormalized - 1, 1);
  // Calculates the previous month
  const previousMonthCompleteDate = subMonths(viewingDate, 1);
  // Calculates the next month
  const nextMonthCompleteDate = addMonths(viewingDate, 1);

  // Months are 0 indexed
  const monthName = getMonthByString(month);
  const previousMonth = getMonth(previousMonthCompleteDate);
  const previousYear = getYear(previousMonthCompleteDate);
  const nextYear = getYear(nextMonthCompleteDate);
  const nextMonth = getMonth(nextMonthCompleteDate);
  const nextMonthNormalized = getNextMonthNormalized(nextMonth);
  const previousMonthNormalized = getPreviousMonthNormalized(previousMonth);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      mt="1.5em"
      mb="0"
    >
      <Link to={`/month/${previousMonthNormalized}/${previousYear}`}>
        <IconButton color="primary" aria-label="Previous Month">
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
        {monthName} {yearNormalized}
      </Typography>
      {futureStatus < 1 && (
        <Link to={`/month/${nextMonthNormalized}/${nextYear}`}>
          <IconButton color="primary" aria-label="Next Month">
            <ArrowCircleRightIcon />
          </IconButton>
        </Link>
      )}
    </Box>
  );
};
