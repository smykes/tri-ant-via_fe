import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Stack, Box, Paper, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import { NotFound } from "../NotFound/NotFound";
import { string } from "yup/lib/locale";

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
  const [dailyWinners, setDailyWinners] = useState<Array<IWinner>>();
  useEffect(() => {
    async function fetchBooks() {
      const res = await fetch(
        `//tri-ant-via-be.herokuapp.com/api/trivia/winners/${month}/${year}`
      );
      const json = await res.json();
      console.log(json);
      setDailyWinners(json);
    }
    fetchBooks();
  }, []);

  return (
    <>
      <Container maxWidth="xs" sx={{ marginTop: "3em" }}>
        <Box>
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
        </Box>
      </Container>
    </>
  );
};
