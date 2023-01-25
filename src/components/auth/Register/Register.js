import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
//import axios from "axios";

import { connect } from "react-redux";
import { setAlert } from "../../../actions/alert";
import { register } from "../../../actions/auth";

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

function Register(props) {
  //const fileRef = useRef(null);

  const handleSubmit = async (values) => {
    //values.preventDefault();
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("password2", values.password2);
    //formData.append("file", values.file);

    if (formData.get("password") !== formData.get("password2")) {
      props.setAlert("Passwords do not match", "danger");
    } else {
      props.register({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        //file: formData.get("file"),
      });
    }
  };

  // Redirect if logged in
  if (props.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

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
          //file: null,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="form">
            <div className="form-group">
              <Field
                type="text"
                placeholder="Name"
                name="name"
                className="form-control"
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
                className="form-control"
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
                className="form-control"
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
                className="form-control"
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
    </>
  );
}

// אם משתמש מחובר
// יש להעביר אותו ב connect לדף הבית
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, register })(Register);
