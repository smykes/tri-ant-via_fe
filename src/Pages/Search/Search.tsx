import React from "react";
import { useState } from "react";
import { Endpoint } from "../../constants";

import {
  Card,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { ISearchReturn } from "../../Interfaces/Interfaces";

function dateFormatter(searchResults: ISearchReturn): string {
  return format(new Date(searchResults.clue_date), "PPPP");
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
                  <ListItem
                    key={searchAnswer.clue_date}
                    sx={{ borderBottom: "1px solid lightgrey" }}
                  >
                    <ListItemText
                      key={searchAnswer.clue_date}
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
                          <br />
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.secondary"
                          >
                            <a target="_blank" href={searchAnswer.url}>
                              {searchAnswer.answer}
                            </a>
                          </Typography>
                          <br />
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.secondary"
                          >
                            {searchAnswer.winners[0].flag}{" "}
                            <a href={`winner/${searchAnswer.winners[0].user}`}>
                              {searchAnswer.winners[0].user}
                            </a>
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                );
              })}
            </List>
          </Stack>
        </Card>
      </Container>
    </>
  );
};
