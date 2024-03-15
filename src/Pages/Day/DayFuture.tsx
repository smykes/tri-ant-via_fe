import Typography from "@mui/material/Typography";
import { IFuture } from "../../Interfaces/Interfaces";

export const DayFuture = (props: IFuture) => {
  const { futureStatus } = props;
  console.log(futureStatus);
  return (
    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
      {futureStatus >= 0 &&
        "Nice try time traveler, this hasn't even happened in our world yet."}
      {futureStatus <= -1 &&
        "smykes is lazy and hasn't imported the data yet. You can usually find results here on the last day of the month."}
    </Typography>
  );
};
