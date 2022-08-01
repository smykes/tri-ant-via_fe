import { useState, useRef } from "react";
import { Endpoint } from "../../constants";

import { useFormik } from "formik";
import * as yup from "yup";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Container } from "@mui/material";
import { Paper } from "@mui/material";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

interface IForm {
  email: String;
  password: String;
}
export const Login = () => {
  const [token, setToken] = useState<Promise<String>>();
  async function getToken(values: IForm): Promise<any> {
    const res = await fetch(`${Endpoint.BACKEND_API}/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": "token-value",
      },
      body: JSON.stringify({ email: values.email, password: values.password }),
    });

    const body = await res.json();
    return body;
  }

  const formik = useFormik({
    initialValues: {
      email: "email",
      password: "pass",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const tokenObject = getToken(values);
      tokenObject.then((data) => {
        console.log(data.token);
        sessionStorage.setItem("token", data.token);
        window.location.assign("/entry");
      });
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
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{
                marginBottom: "1.5em",
              }}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              sx={{
                marginBottom: "1.5em",
              }}
            />
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
