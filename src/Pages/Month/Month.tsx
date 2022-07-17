import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Stack, Box, Paper, Container } from "@mui/material";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const Month = () => {
  const { month, year } = useParams();
  const [dailyWinners, setDailyWinners] = useState<Array<string>>();
  useEffect(() => {
    async function fetchBooks() {
      const res = await fetch(
        `//tri-ant-via-be.herokuapp.com/api/trivia/winners/${month}/${year}`
      );
      const json = await res.json();
      const test = [];
      for (const [key, value] of Object.entries(json)) {
        test.push(`${key}: ${value}`);
        console.log(`${key}: ${value}`);
      }
      console.log(test);
      setDailyWinners(test);
    }
    fetchBooks();
  }, []);

  return (
    <Container maxWidth="xs" sx={{ marginTop: "3em" }}>
      <Box>
        <Stack spacing={1}>
          {dailyWinners &&
            dailyWinners.map((winner) => {
              return <Item key={winner}>{winner}</Item>;
            })}
        </Stack>
      </Box>
    </Container>
  );
};