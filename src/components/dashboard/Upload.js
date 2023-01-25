import React, { useRef } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
//import { connect } from "react-redux";
//import { ADD_IMAGE } from "../../actions/types";

import "./Dashboard.css";

const validationSchema = Yup.object().shape({
  image: Yup.mixed().required("A file is required"),
});

function Upload(props) {
  const fileRef = useRef(null);

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("image", values.image);
    try {
      const res = await axios.post("/api/users/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          image: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="image">PICK IMAGE</label>
              <input
                ref={fileRef}
                type="file"
                name="image"
                id="image"
                onChange={(event) => {
                  setFieldValue("image", event.currentTarget.files[0]);
                }}
                className="form-control"
              />
              <ErrorMessage
                component="div"
                name="image"
                className="form-control-invalid"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary p-1"
              disabled={isSubmitting}
            >
              Submit
            </button>
            {values.image && (
              <div className="image">
                {values.image && (
                  <img
                    src={URL.createObjectURL(values.image)}
                    alt={values.image.name}
                  />
                )}
              </div>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
}

// const mapStateToProps = (state) => ({
//   auth: state.auth,
// });

//export default connect(mapStateToProps, { ADD_IMAGE })(Upload);

export default Upload;
