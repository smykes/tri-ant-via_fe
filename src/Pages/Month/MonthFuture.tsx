import Typography from "@mui/material/Typography";

interface IFuture {
  futureStatus: number;
}

export const MonthFuture = (props: IFuture) => {
  const { futureStatus } = props;
  return (
    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
      {futureStatus > 1 &&
        "Nice try time traveler, this hasn't even happened in our world yet."}
      {futureStatus <= 1 &&
        "smykes is lazy and hasn't imported the data yet. You can usually find results here on the last day of the month."}
    </Typography>
  );
};
