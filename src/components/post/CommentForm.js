import React from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { connect } from "react-redux";
import { addComment } from "../../actions/post";

const validationSchema = Yup.object().shape({
  text: Yup.string()
    .min(2, "Too Short!")
    .max(500, "Too Long!")
    .required("Required"),
});

function CommentForm({ addComment, postId }) {
  const handleSubmit = async (values, { resetForm }) => {
    addComment(postId, values);
    resetForm();
  };

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave a Comment</h3>
      </div>
      <Formik
        initialValues={{
          text: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="form my-1">
            <div className="form-group">
              <Field
                as="textarea"
                cols="30"
                rows="5"
                name="text"
                className="form-control"
                placeholder="Comment on this post"
              />
              <ErrorMessage
                name="text"
                component="div"
                className="form-control-invalid"
              />
            </div>
            <button type="submit" className="btn btn-dark">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default connect(null, { addComment })(CommentForm);
