import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { addPost } from "../../../actions/post";

const validationSchema = Yup.object().shape({
  text: Yup.string()
    .min(2, "Too Short!")
    .max(500, "Too Long!")
    .required("Required"),
});

function PostForm({ addPost }) {
  const handleSubmit = async (values, { resetForm }) => {
    addPost(values);
    resetForm();
  };

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <Formik
        initialValues={{ text: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="form my-1">
            <div className="form-group">
              <Field
                as="textarea"
                cols="30"
                rows="5"
                name="text"
                placeholder="Create a post"
              />
              <ErrorMessage
                className="form-control-invalid"
                name="text"
                component="div"
              />
            </div>
            <button
              type="submit"
              className="btn btn-dark"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default connect(null, { addPost })(PostForm);
