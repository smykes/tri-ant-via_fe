import React, { useEffect } from 'react';
import { useState } from 'react';
import { Endpoint } from '../../constants';

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
  Autocomplete,
} from '@mui/material';
import { format } from 'date-fns';
import { ISearchReturn, ISearchUsersReturn } from '../../Interfaces/Interfaces';

function dateFormatter(searchResults: ISearchReturn): string {
  return format(new Date(searchResults.clue_date), 'PPPP');
}

export const Search = () => {
  const [searchAnswerResults, setSearchAnswersResults] = useState<
    Array<ISearchReturn> | undefined
  >();
  const [searchUserResults, setSearchUserResults] = useState<
    Array<ISearchUsersReturn>
  >([]);
  const [inputValue, setInputValue] = useState<string>('');

  async function fetchUsersFromAPI(inputValue: string) {
    console.log(inputValue);
    console.log(Endpoint.BACKEND_API);
    const res = await fetch(
      `${Endpoint.BACKEND_API}trivia/search/users?name=${inputValue}`
    );
    console.log(res);
    const json = await res.json();
    console.log(json);
    setSearchUserResults(json);
  }

  useEffect(() => {
    fetchUsersFromAPI(inputValue);
  }, [inputValue]);

  function searchText(e: any) {
    async function getCommonAnswers() {
      const res = await fetch(
        `${Endpoint.BACKEND_API}trivia/search/answers?term=${e.target.value}`
      );
      const json = await res.json();
      if (e.target.value.length) {
        setSearchAnswersResults(json);
      } else {
        setSearchAnswersResults([]);
      }
    }
    getCommonAnswers();
  }

  function searchUsers(e: any) {
    async function findUsers() {
      const res = await fetch(
        `${Endpoint.BACKEND_API}trivia/search/users?name=${e.target.value}`
      );
      const json = await res.json();
      if (e.target.value.length) {
        setSearchUserResults(json);
      } else {
        setSearchUserResults([]);
      }
    }
    findUsers();
  }

  return (
    <>
      <Container maxWidth="xs">
        <Card elevation={3} sx={{ marginTop: '3em', marginBottom: '3em' }}>
          <Stack
            spacing={2}
            sx={{
              maxWidth: 350,
              padding: '1rem',
              marginLeft: 'auto',
              marginRight: 'auto',
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
                    sx={{ borderBottom: '1px solid lightgrey' }}
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
                            {searchAnswer.winners[0].flag}{' '}
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
          {/* <Autocomplete
            sx={{
              maxWidth: 350,
              padding: '1rem',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
            getOptionLabel={(option) => option.name} // <-- Add this!
            onInputChange={(e, value) => setInputValue(value)}
            renderInput={(params) => (
              <TextField key={params.id} {...params} label="User" />
            )}
            options={searchUserResults}
          /> */}

          {/* <Stack
            spacing={2}
            sx={{
              maxWidth: 350,
              padding: "1rem",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          > */}
          {/* <TextField
              onChange={(event) => searchUsers(event)}
              label="Search Users"
            />
            <List>
              {searchUserResults?.map((searchUser) => {
                return (
                  <ListItem
                    key={searchUser.name}
                    sx={{ borderBottom: "1px solid lightgrey" }}
                  >
                    <ListItemText
                      
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {searchUser.name}
                          </Typography>
                          <br />
                        

                        </>
                      }
                    />
                  </ListItem>
                );
              })}
            </List> */}
          {/* </Stack> */}
        </Card>
      </Container>
    </>
  );
};
