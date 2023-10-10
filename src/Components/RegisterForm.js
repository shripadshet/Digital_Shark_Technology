import { ErrorMessage, Form, Formik, Field } from "formik";
import TextField from "./TextField";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Service from "../Services/Service";

function RegisterForm() {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: "",
    confirmPassword: "",
    role: "",
  };

  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const [userData, setUserData] = useState([]);

  const getUserDetails = () => {
    Service.getUserData(data);
    setUserData(data);
  };
  useEffect(() => {
    getUserDetails();
  }, []);

  const validate = Yup.object({
    firstName: Yup.string().required("First Name Required"),
    lastName: Yup.string(),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required")
      .test("Is email Unique", "email already exists", (value) => {
        return Service.emailExists(value).then((response) => {
          if (response.IsUserExist === true) {
            return false;
          }
          return true;
        });
      }),
    password: Yup.string()
      .min(4, "must be atleast 4 digits")
      .required("password required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match!")
      .required("Confirm password is reqired!"),
    age: Yup.number()
      .min(14, "minimum 14 Years")
      .required("Age must be required"),
    role: Yup.string().required("role is required"),
  });
  const sendData = async (values) => {
    Service.sendUserData(values).then((res)=>{
    })
    swal({
      title: "Sucess!",
      text: "Registration Successfull!",
      icon: "success",
      button: "ok!",
    }).catch((err) => console.error(err));
    navigate("/login");
  };

  return (
    <>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validate}
          onSubmit={(values) => {
            setData(values);
            sendData(values);
          }}
        >
          {(formik) => (
            <div className="registerForm">
              <Form style={{ border: "solid 2px gray ", marginBottom: "50px" }}>
                <h2>Sign Up Form </h2>
                <TextField
                  type="text"
                  label="Firstname"
                  name="firstName"
                  placeholder="abcd"
                />
                <TextField
                  type="text"
                  label="lastname"
                  name="lastName"
                  placeholder="efgh"
                />
                <TextField
                  type="email"
                  label="email"
                  name="email"
                  placeholder="abcdefgh@gmail.com"
                  value={formik.email}
                />
                <TextField
                  type="password"
                  label="password"
                  name="password"
                  placeholder="text@123"
                />
                <div>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="text"
                    id="confirmPassword"
                    placeholder="confirm Password..."
                    {...formik.getFieldProps("confirmPassword")}
                  />
                  <ErrorMessage
                    component="div"
                    name="confirmPassword"
                    className="error"
                  />
                </div>
                <TextField
                  type="number"
                  label="Age"
                  name="age"
                  placeholder="20"
                />
                <label htmlFor="role">Role</label>
                <Field as="select" name="role">
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="user1">User1</option>
                  <option value="user2">User2</option>
                </Field>
                <ErrorMessage component="div" name="role" className="error" />
                <div className="fixed-button">
                <button className="fixed-button" type="submit">
                  Register
                </button>
                <button className="fixed-button" type="reset">
                  Reset
                </button>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </>
  );
}
export default RegisterForm;
