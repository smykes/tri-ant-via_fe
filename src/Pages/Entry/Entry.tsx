import {
  InputLabel,
  Container,
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";

import { DateTime } from "luxon";

// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import Countries from "../../countries.json";

import { useFormik } from "formik";
import * as yup from "yup";

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
  clue: yup.string().required("A clue is required"),
  answer: yup.string().required("An answer is required"),
  user: yup.string().required("A user name is required"),
  url: yup.string().required("A link is required"),
  location: yup.string().required("A location is required"),
  date: yup.string().required(),
});

async function saveData(data: IForm): Promise<any> {
  alert();
  const token: string | null = sessionStorage.getItem("token");
  if (token !== null) {
    const res = await fetch("//localhost:3001/api/trivia", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": "token-value",
        "x-auth-token": token,
      },
      body: JSON.stringify(data),
    });
    return res.json;
  }
}
export const Entry = () => {
  const formik = useFormik({
    initialValues: {
      date: "",
      clue: "",
      answer: "",
      user: "",
      location: "",
      url: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      var dt = DateTime.fromISO(values.date).startOf("day").toFormat("x");
      console.log(values.date);
      console.log(dt);
      const postData = {
        clue_date: dt,
        clue: values.clue,
        winners: [
          {
            user: values.user,
            country: values.location.split("-")[1],
            flag: values.location.split("-")[2],
            country_code: values.location.split("-")[0],
          },
        ],
        answer: values.answer,
        url: values.url,
      };
      await saveData(postData);
    },
  });
  return (
    <Container
      sx={{
        width: "100%",
        height: "100%",
        margin: "2.5em",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: 300,
          height: "auto",
          padding: "2em",
          margin: "0 auto",
        }}
      >
        <div>
          {/* <form onSubmit={formik.handleSubmit}> */}
          <form onSubmit={formik.handleSubmit}>
            <input
              id="date"
              name="date"
              type="date"
              onChange={formik.handleChange}
              value={formik.values.date}
            />
            <TextField
              fullWidth
              id="clue"
              name="clue"
              label="Clue"
              type="text"
              value={formik.values.clue}
              onChange={formik.handleChange}
              // onChange={formik.handleChange}
              error={formik.touched.clue && Boolean(formik.errors.clue)}
              helperText={formik.touched.clue && formik.errors.clue}
              sx={{
                marginBottom: "1.5em",
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
                marginBottom: "1.5em",
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
                marginBottom: "1.5em",
              }}
            />
            <hr />
            <TextField
              fullWidth
              id="user"
              name="user"
              label="User"
              type="text"
              // value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.user && Boolean(formik.errors.user)}
              helperText={formik.touched.user && formik.errors.user}
              sx={{
                marginBottom: "1.5em",
                marginTop: "1.5em",
              }}
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
                marginBottom: "1.5em",
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
            >
              Submit
            </Button>
          </form>
        </div>
      </Paper>
    </Container>
  );
};
