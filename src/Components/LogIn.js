import React from "react";
import { Form, Formik } from "formik";
import TextField from "./TextField";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function LogIn(props) {
  const initialValues = {
    email: "",
    password: "",
  };
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("email is required"),
    password: Yup.string()
      .min(4, "must be atleast 4 digits")
      .required("password required"),
  });

  const sendData = async (values) => {
    const response = await fetch("http://localhost:1337/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    });

    const data = await response.json();
    const logedUser = data?.logedInUser ? data.logedInUser : "";

    localStorage.mytoken = data.user;

    if (data.user === false) {
      swal({
        title: "Invalid User!",
        text : "check email and password",
        icon: "error",
        button: "ok!",
      });
    } else {
      swal({
        title: "Sucess!",
        text: "LogIn Successfull!",
        icon: "success",
        button: "ok!",
      });
      navigate("/home");
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validate}
        onSubmit={(values) => {
          setData(values);
          sendData(values);
          props.onSubmit(values.email);
        }}
      >
        {(formik) => (
          <div className="logInForm">
            <Form>
              <h2>LogIn Form </h2>
              <TextField
                type="email"
                label="email"
                name="email"
                placeholder="abcdefgh@gmail.com"
                autoComplete="off"
              />
              <TextField
                type="password"
                label="password"
                name="password"
                placeholder="text@123"
                autoComplete="off"
              />
              <button className="btn btn-dark m-3" type="submit">
                LogIn
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}
export default LogIn;
