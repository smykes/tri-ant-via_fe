import { useState } from "react";
import { Endpoint } from "../../constants";

import {
  TextField,
  Container,
  Card,
  Stack,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import { format } from "date-fns";

interface ISearchReturn {
  clue: string;
  answer: string;
  clue_date: number;
}

function dateFormatter(test: ISearchReturn): string {
  return format(new Date(test.clue_date), "PPPP");
}
export const Search = () => {
  function searchText(e: any) {
    async function getCommonAnswers() {
      const res = await fetch(
        `${Endpoint.BACKEND_API}trivia/search/answers?term=${e.target.value}`
      );
      const json = await res.json();
      setSearchAnswersResults(json);
    }
    getCommonAnswers();
  }
  const [searchAnswerResults, setSearchAnswersResults] =
    useState<Array<ISearchReturn>>();
  return (
    <>
      <Container maxWidth="xs">
        <Card elevation={3} sx={{ marginTop: "3em", marginBottom: "3em" }}>
          <Stack
            spacing={2}
            sx={{
              maxWidth: 350,
              padding: "1rem",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <TextField
              onChange={(event) => searchText(event)}
              label="Search Answers"
            />
            <List>
              {searchAnswerResults?.map((searchAnswer) => {
                return (
                  <>
                    <ListItem>
                      <ListItemText
                        primary={<>{dateFormatter(searchAnswer)}</>}
                        secondary={
                          <>
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {searchAnswer.clue}
                            </Typography>
                            <Typography
                              component="p"
                              variant="body2"
                              color="text.secondary"
                            >
                              {searchAnswer.answer}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    <Divider light />
                  </>
                );
              })}
            </List>
          </Stack>
        </Card>
      </Container>
    </>
  );
};
