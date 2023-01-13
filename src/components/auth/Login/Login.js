import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
//import axios from "axios";

import "./Login.css";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(5, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

function Login() {
  const handleSubmit = async (values) => {
    //values.preventDefault();
    const formData = new FormData();

    formData.append("email", values.email);
    formData.append("password", values.password);

    //   const newUser = {
    //     name: formData.get("name"),
    //     email: formData.get("email"),
    //     password: formData.get("password"),
    //   };

    //   try {
    //     const config = {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     };

    //     const body = JSON.stringify(newUser);

    //     const res = await axios.post("/api/users", body, config);
    //     console.log(res.data);
    //   } catch (err) {
    //     console.error(err.response.data);
    //   }

    console.log("Success");
  };

  return (
    <>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign Into Your Account
      </p>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="form">
            <div className="form-group">
              <Field
                type="email"
                placeholder="Email Address"
                name="email"
                className={
                  errors.email && touched.email
                    ? "form-control is-invalid"
                    : "form-control"
                }
              />
              <ErrorMessage
                component="div"
                name="email"
                className="form-control-invalid"
              />
            </div>
            <div className="form-group">
              <Field
                type="password"
                placeholder="Password"
                name="password"
                className={
                  errors.password && touched.password
                    ? "form-control is-invalid"
                    : "form-control"
                }
              />
              <ErrorMessage
                component="div"
                name="password"
                className="form-control-invalid"
              />
            </div>

            <input type="submit" className="btn btn-primary" value="Login" />
            <p className="my-1">
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default Login;
