import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { Paper } from "@mui/material";
import { Typography } from "@mui/material";
interface IForm {
  answer: string;
  clue: string;
  clue_date: Date;
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
  const [triviaWinners, setTriviaWinners] = useState<Array<IForm>>();
  useEffect(() => {
    alert();
    async function fetchWinner() {
      const res = await fetch(`//localhost:3001/api/trivia/today`);
      const json = await res.json();
      if (json) {
        console.log(json);
        setTriviaWinners(json);
      }
    }
    fetchWinner();
  }, []);

  return (
    <Container
      sx={{
        width: "100%",
        height: "100%",
        margin: "2.5em",
      }}
    >
      {triviaWinners &&
        triviaWinners.map((winner) => {
          return (
            <Paper
              elevation={3}
              sx={{
                width: 300,
                height: "auto",
                padding: "2em",
                margin: "0 auto",
              }}
            >
              <>
                <Typography variant="h1" component="h2">
                  {winner.winners[0].flag}
                </Typography>
                {winner.clue} - <a href={winner.url}>{winner.answer} </a>
                {winner.winners[0].user} - {winner.winners[0].country}
              </>
            </Paper>
          );
        })}
    </Container>
  );
};
