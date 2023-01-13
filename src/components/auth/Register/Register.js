import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
//import axios from "axios";

import "./Register.css";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(5, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password2: Yup.string()
    .min(5, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

function Register() {
  const handleSubmit = async (values) => {
    //values.preventDefault();
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("password2", values.password2);

    if (formData.get("password") !== formData.get("password2")) {
      console.log("Passwords do not match");
    } else {
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
    }
  };

  return (
    <>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          password2: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="form">
            <div className="form-group">
              <Field
                type="text"
                placeholder="Name"
                name="name"
                className={
                  errors.name && touched.name
                    ? "form-control is-invalid"
                    : "form-control"
                }
              />
              <ErrorMessage
                component="div"
                name="name"
                className="form-control-invalid"
              />
            </div>
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
            <div className="form-group">
              <Field
                type="password"
                placeholder="Confirm Password"
                name="password2"
                className={
                  errors.password2 && touched.password2
                    ? "form-control is-invalid"
                    : "form-control"
                }
              />
              <ErrorMessage
                component="div"
                name="password2"
                className="form-control-invalid"
              />
            </div>
            <input type="submit" className="btn btn-primary" value="Register" />
            <p className="my-1">
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </Form>
        )}
      </Formik>

      {/* <section className="container">
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Create Your Account
        </p>
        <form className="form" action="create-profile.html">
          <div className="form-group">
            <input type="text" placeholder="Name" name="name"  required />
          </div>
          <div className="form-group">
            <input type="email" placeholder="Email Address" name="email" />
            <small className="form-text">
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </small>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              minLength="6"
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <a href="login.html">Sign In</a>
        </p>
      </section> */}
    </>
  );
}

export default Register;
