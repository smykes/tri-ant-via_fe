import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { IDayNavigation } from "../../Interfaces/Interfaces";

export const DayNavigation = (props: IDayNavigation) => {
  const { previousDay, winner, nextDay } = props;
  function getDate(numericDate: number): string {
    const clueDate = new Date(numericDate);
    const clueString = `${
      clueDate.getMonth() + 1
    }/${clueDate.getDate()}/${clueDate.getFullYear()}`;

    return clueString;
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center" }} mt="1.5em" mb="0">
      <Link to={`/day/${previousDay}`}>
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
        Trivia of the Day - {winner && getDate(winner.today[0].clue_date)}
      </Typography>
      <Link to={`/day/${nextDay}`}>
        <IconButton color="primary" aria-label="Next Day">
          <ArrowCircleRightIcon />
        </IconButton>
      </Link>
    </Box>
  );
};
