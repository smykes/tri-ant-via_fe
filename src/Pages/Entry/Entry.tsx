import React, { useEffect } from 'react';
import { useState } from 'react';
import { Endpoint } from '../../constants';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  InputLabel,
  Container,
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
  Alert,
  Autocomplete,
} from '@mui/material';
import { ISearchReturn, ISearchUsersReturn } from '../../Interfaces/Interfaces';

import { startOfDay, startOfToday, format } from 'date-fns';
import Countries from '../../countries.json';
import { useFormik } from 'formik';
import * as yup from 'yup';

interface IForm {
  answer: string;
  clue: string;
  url: string;
  winners: IFormArray[];
}

interface IFormArray {
  country: string;
  country_code: string;
  flag: string;
  user: string;
}

const validationSchema = yup.object({
  clue: yup.string().required('A clue is required'),
  answer: yup.string().required('An answer is required'),
  user: yup.string().required('A user name is required'),
  url: yup.string().url().required('A link is required'),
  location: yup.string().required('A location is required'),
  date: yup.date().required(),
});

async function saveData(data: IForm): Promise<any> {
  const token: string | null = sessionStorage.getItem('token');
  if (token !== null) {
    const response = await fetch(`${Endpoint.BACKEND_API}trivia`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': 'token-value',
        'x-auth-token': token,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      return response.json();
    } else {
      return response.json();
    }
  }
}
export const Entry = () => {
  const [searchUserResults, setSearchUserResults] = useState<
    Array<ISearchUsersReturn>
  >([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [hasSuccess, setHasSuccess] = useState<boolean>(false);

  async function fetchUsersFromAPI(inputValue: string) {
    const res = await fetch(
      `${Endpoint.BACKEND_API}trivia/search/users?name=${inputValue}`
    );
    const json = await res.json();
    setSearchUserResults(json);
  }
  const formik = useFormik({
    initialValues: {
      date: startOfToday(),
      clue: '',
      answer: '',
      user: '',
      location: '',
      url: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      const dt = format(startOfDay(values.date), 'T');
      const postData = {
        clue_date: dt,
        clue: values.clue,
        winners: [
          {
            user: values.user,
            country: values.location.split('-')[1],
            flag: values.location.split('-')[2],
            country_code: values.location.split('-')[0],
          },
        ],
        answer: values.answer,
        url: values.url,
      };
      const submitResponse = await saveData(postData);
      if (!submitResponse.error) {
        // TODO: figure out why this isn't working for the user field.
        // Not sure why resetForm isn't doing this, or why this isn't working
        formik.resetForm();
        formik.setFieldValue('user', '');
        const options: Intl.DateTimeFormatOptions = {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        };
        const parsedDate = submitResponse.clue_date
          ? new Date(submitResponse.clue_date)
          : null;
        const returnDate =
          parsedDate?.toLocaleDateString('en-US', options) || '';
        setSuccessMessage(`Sucesfully saved entry for ${returnDate}`);
        setHasError(false);
        setHasSuccess(true);
      } else {
        setErrorMessage(submitResponse.message);
        setHasSuccess(false);
        setHasError(true);
      }
    },
  });

  useEffect(() => {
    fetchUsersFromAPI(inputValue);
  }, [inputValue]);

  return (
    <Container
      sx={{
        width: '100%',
        height: '100%',
        margin: '2.5em',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: 300,
          height: 'auto',
          padding: '2em',
          margin: '0 auto',
        }}
      >
        <div>
          {hasError && (
            <Alert
              sx={{
                marginBottom: '1.5em',
              }}
              severity="error"
            >
              {errorMessage}
            </Alert>
          )}
          {hasSuccess && (
            <Alert
              sx={{
                marginBottom: '1.5em',
              }}
              severity="success"
            >
              {successMessage}
            </Alert>
          )}
          <form onSubmit={formik.handleSubmit}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                name="date"
                label="Clue Date"
                sx={{
                  marginBottom: '1.5em',
                  width: '100%',
                }}
                onChange={(value) => {
                  formik.setFieldValue('date', value ?? new Date());
                }}
                value={formik.values.date}
              />
            </LocalizationProvider>
            <TextField
              fullWidth
              id="clue"
              name="clue"
              label="Clue"
              type="text"
              value={formik.values.clue}
              onChange={formik.handleChange}
              error={formik.touched.clue && Boolean(formik.errors.clue)}
              helperText={formik.touched.clue && formik.errors.clue}
              sx={{
                marginBottom: '1.5em',
              }}
            />
            <TextField
              fullWidth
              id="answer"
              name="answer"
              label="Answer"
              type="text"
              value={formik.values.answer}
              onChange={formik.handleChange}
              error={formik.touched.answer && Boolean(formik.errors.answer)}
              helperText={formik.touched.answer && formik.errors.answer}
              sx={{
                marginBottom: '1.5em',
              }}
            />
            <TextField
              fullWidth
              id="url"
              name="url"
              label="Url"
              type="text"
              value={formik.values.url}
              onChange={formik.handleChange}
              error={formik.touched.url && Boolean(formik.errors.url)}
              helperText={formik.touched.url && formik.errors.url}
              sx={{
                marginBottom: '1.5em',
              }}
            />
            <hr />
            <Autocomplete
              sx={{
                paddingTop: '1rem',
                paddingBottom: '1rem',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
              value={
                searchUserResults.find(
                  (user) => user.name === formik.values.user
                ) || null
              }
              getOptionLabel={(option) => option.name}
              onChange={(e, value) => {
                formik.setFieldValue('user', value?.name || '');
              }}
              // onInputChange={(e, value) => setInputValue(value)}
              renderInput={(params) => (
                <TextField
                  key={params.id}
                  {...params}
                  id="user"
                  name="user"
                  label="User"
                  error={formik.touched.user && Boolean(formik.errors.user)}
                  helperText={formik.touched.user && formik.errors.user}
                />
              )}
              options={searchUserResults}
            />

            <InputLabel id="location-label">Location</InputLabel>
            <Select
              fullWidth
              labelId="location-label"
              id="location"
              name="location"
              label={formik.values.location}
              onChange={formik.handleChange}
              value={formik.values.location}
              error={formik.touched.location && Boolean(formik.errors.location)}
              sx={{
                marginBottom: '1.5em',
              }}
            >
              {Countries.map((country) => {
                return (
                  <MenuItem
                    key={`${country.Code}-${country.Name}`}
                    value={`${country.Code}-${country.Name}-${country.Emoji}`}
                  >
                    {country.Name} - {country.Emoji}
                  </MenuItem>
                );
              })}
            </Select>

            <Button
              color="secondary"
              variant="contained"
              fullWidth
              type="submit"
              disabled={formik.isSubmitting}
            >
              Submit
            </Button>
          </form>
        </div>
      </Paper>
    </Container>
  );
};
