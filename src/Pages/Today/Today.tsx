import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { Paper } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
interface IForm {
  answer: string;
  clue: string;
  clue_date: number;
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
  function getDate(numericDate: number): string {
    const clueDate = new Date(numericDate);
    const clueString = `${
      clueDate.getMonth() + 1
    }/${clueDate.getDate()}/${clueDate.getFullYear()}`;

    return clueString;
  }
  const [dayWinner, setDayWinner] = useState<IForm>();
  useEffect(() => {
    async function fetchBooks() {
      const res = await fetch(`//localhost:3001/api/trivia/today`);
      const json = await res.json();
      if (json) {
        console.log(json);
        setDayWinner(json);
      }
    }
    fetchBooks();
  }, []);

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ marginTop: "3em", padding: "2em" }}>
        <Box
          sx={{
            color: "text.secondary",
            marginBottom: "0.25em",
            float: "right",
            clear: "all",
            fontWeight: 900,
          }}
        >
          {dayWinner && <div>{getDate(dayWinner.clue_date)}</div>}
        </Box>
        <Box
          sx={{
            color: "text.primary",
            fontSize: "8em",
            marginBottom: "0.25em",
            clear: "both",
            textAlign: "center",
          }}
        >
          {dayWinner && <div>{dayWinner.winners[0].flag}</div>}
        </Box>
        <Box sx={{ color: "text.secondary", marginBottom: "0.25em" }}>
          {dayWinner && <div>{dayWinner.clue}</div>}
        </Box>
        <Box sx={{ color: "text.secondary", marginBottom: "0.25em" }}>
          {dayWinner && (
            <div>
              <a href={dayWinner.url} rel="noreferrer" target="_blank">
                {dayWinner.answer}
              </a>
            </div>
          )}
        </Box>
        <Box
          sx={{
            color: "text.primary",
            fontSize: "1em",
            marginBottom: "0.25em",
          }}
        >
          {dayWinner && <div>{dayWinner.winners[0].user}</div>}
        </Box>
      </Paper>
    </Container>
  );
};
