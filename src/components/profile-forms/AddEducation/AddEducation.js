import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { connect } from "react-redux";
import { addEducation } from "../../../actions/profile";

const validationSchema = Yup.object().shape({
  school: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  degree: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

function AddEducation(props) {
  const [toDateDisabled, toggleDisabled] = useState(false);

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append("school", values.school);
    formData.append("degree", values.degree);
    formData.append("fieldofstudy", values.fieldofstudy);
    formData.append("from", values.from);
    formData.append("to", values.to);
    formData.append("current", values.current);
    formData.append("description", values.description);

    props.addEducation(formData, props.history);
  };

  return (
    <>
      <h1 className="large text-primary">Add Your Education</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any school or bootcamp that
        you have attended
      </p>

      <Formik
        initialValues={{
          school: "",
          degree: "",
          fieldofstudy: "",
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
              <Field
                type="text"
                placeholder="School or Bootcamp"
                name="school"
              />
              <ErrorMessage
                name="school"
                component="div"
                className="form-control-invalid"
              />
            </div>

            <div className="form-group">
              <Field
                type="text"
                placeholder="Degree or Certificate"
                name="degree"
              />
              <ErrorMessage
                name="degree"
                component="div"
                className="form-control-invalid"
              />
            </div>

            <div className="form-group">
              <Field
                type="text"
                placeholder="Field Of Study"
                name="fieldofstudy"
              />
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
                Current School or Bootcamp
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
                placeholder="Program Description"
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

export default connect(null, { addEducation })(withRouter(AddEducation));
