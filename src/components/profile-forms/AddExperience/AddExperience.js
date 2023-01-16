import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { connect } from "react-redux";
import { addExperience } from "../../../actions/profile";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  company: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

function AddExperience(props) {
  const [toDateDisabled, toggleDisabled] = useState(false);

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("company", values.company);
    formData.append("location", values.location);
    formData.append("from", values.from);
    formData.append("to", values.to);
    formData.append("current", values.current);
    formData.append("description", values.description);

    props.addExperience(formData, props.history);
  };

  return (
    <>
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>

      <Formik
        initialValues={{
          title: "",
          company: "",
          location: "",
          from: "",
          to: "",
          current: false,
          description: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className="form">
            <div className="form-group">
              <Field type="text" placeholder="Job Title" name="title" />
              <ErrorMessage
                name="title"
                component="div"
                className="form-control-invalid"
              />
            </div>

            <div className="form-group">
              <Field type="text" placeholder="Company" name="company" />
              <ErrorMessage
                name="company"
                component="div"
                className="form-control-invalid"
              />
            </div>

            <div className="form-group">
              <Field type="text" placeholder="Location" name="location" />
            </div>

            <div className="form-group">
              <h4>From Date</h4>
              <Field type="date" name="from" />
            </div>

            <div className="form-group">
              <p>
                <Field
                  type="checkbox"
                  name="current"
                  value=""
                  checked={values.current}
                  onChange={(e) => {
                    values.current = e.target.checked;
                    toggleDisabled(!toDateDisabled);
                  }}
                />{" "}
                Current Job
              </p>
            </div>

            <div className="form-group">
              <h4>To Date</h4>
              <Field
                type="date"
                name="to"
                disabled={toDateDisabled ? "disabled" : ""}
              />
            </div>

            <div className="form-group">
              <Field
                as="textarea"
                placeholder="Job Description"
                name="description"
              />
            </div>

            <input type="submit" className="btn btn-primary my-1" />

            <Link className="btn btn-light my-1" to="/dashboard">
              Go Back
            </Link>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default connect(null, { addExperience })(withRouter(AddExperience));
