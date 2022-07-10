import { useEffect, useState } from "react";
import { Container, CardContent, CardActions, Grid } from "@mui/material";

import Button from "@mui/material/Button";

import { Card } from "@mui/material";
import { Typography } from "@mui/material";
import { DateTime } from "luxon";

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
export const List = () => {
  function getDate(numericDate: number): string {
    const clueDate = new Date(numericDate);
    const clueString = `${
      clueDate.getMonth() + 1
    }/${clueDate.getDate()}/${clueDate.getFullYear()}`;

    return clueString;
  }
  const [dayWinner, setDayWinner] = useState<Array<IForm>>();
  const month = DateTime.now();
  console.log(month);

  useEffect(() => {
    async function fetchBooks() {
      const res = await fetch(`//localhost:3001/api/trivia/list`);
      const json = await res.json();
      const data: any = json.sort(function (a: any, b: any): number {
        if (a.clue_date < b.clue_date) return -1;
        if (a.clue_date > b.clue_date) return 1;
        return 0;
      });

      setDayWinner(data);
    }
    fetchBooks();
  }, []);

  return (
    <Container maxWidth="xs" sx={{ marginTop: "3em" }}>
      <Card elevation={3} sx={{ marginTop: "3em" }}>
        {dayWinner &&
          dayWinner?.map((winner) => {
            return (
              <>
                <h6>
                  {getDate(winner.clue_date)} - {winner.winners[0].user}
                </h6>
                <h6>{winner.clue}</h6>
              </>
            );
          })}
      </Card>
    </Container>
  );
};
