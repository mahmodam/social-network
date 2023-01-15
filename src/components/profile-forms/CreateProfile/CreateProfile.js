import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { createProfile } from "../../../actions/profile";

const validationSchema = Yup.object().shape({
  company: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  status: Yup.string().required("Required"),
  skills: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

function CreateProfile(props) {
  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("company", values.company);
    formData.append("website", values.website);
    formData.append("location", values.location);
    formData.append("status", values.status);
    formData.append("skills", values.skills);
    formData.append("githubusername", values.githubusername);
    formData.append("bio", values.bio);
    formData.append("twitter", values.twitter);
    formData.append("facebook", values.facebook);
    formData.append("linkedin", values.linkedin);
    formData.append("youtube", values.youtube);
    formData.append("instagram", values.instagram);

    props.createProfile(formData, props.history);
  };

  return (
    <>
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>

      <Formik
        initialValues={{
          company: "",
          website: "",
          location: "",
          status: "",
          skills: "",
          githubusername: "",
          bio: "",
          twitter: "",
          facebook: "",
          linkedin: "",
          youtube: "",
          instagram: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="form">
            <div role="group" className="form-group">
              <h4 htmlFor="status"> Status: </h4>
              <div className="m">
                <Field
                  type="radio"
                  name="status"
                  value="Developer"
                  id="status"
                />
                <label htmlFor="status"> Developer</label>
              </div>

              <div className="m">
                <Field
                  type="radio"
                  name="status"
                  value="Junior Developer"
                  id="status"
                />
                <label htmlFor="status"> Junior Developer</label>
              </div>

              <div className="m">
                <Field
                  type="radio"
                  name="status"
                  value="Senior Developer"
                  id="status"
                />
                <label htmlFor="status"> Senior Developer</label>
              </div>

              <div className="m">
                <Field type="radio" name="status" value="Manager" id="status" />
                <label htmlFor="status"> Manager</label>
              </div>

              <div className="m">
                <Field
                  type="radio"
                  name="status"
                  value="Student or Learning"
                  id="status"
                />
                <label htmlFor="status"> Student or Learning </label>
              </div>

              <div className="m">
                <Field
                  type="radio"
                  name="status"
                  value="Instructor or Teacher"
                  id="status"
                />
                <label htmlFor="status"> Instructor or Teacher</label>
              </div>

              <div className="m">
                <Field type="radio" name="status" value="Intern" id="status" />
                <label htmlFor="status"> Intern</label>
              </div>

              <div className="m">
                <Field type="radio" name="status" value="Other" id="status" />
                <label htmlFor="status"> Other</label>
              </div>

              <ErrorMessage
                component="div"
                name="status"
                className="form-control-invalid"
              />

              <small className="form-text">
                Give us an idea of where you are at in your career
              </small>
            </div>

            <div className="form-group">
              <Field type="text" name="company" placeholder="* Company" />
              <ErrorMessage
                component="div"
                name="company"
                className="form-control-invalid"
              />
              <small className="form-text">
                Could be your own company or one you work for
              </small>
            </div>

            <div className="form-group">
              <Field type="text" name="website" placeholder="Website" />
              <small className="form-text">
                Could be your own or a company website
              </small>
            </div>

            <div className="form-group">
              <Field type="text" name="location" placeholder="Location" />
              <small className="form-text">
                City & state suggested (eg. Boston, MA)
              </small>
            </div>

            <div className="form-group">
              <Field type="text" name="skills" placeholder="* Skills" />
              <small className="form-text">
                Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
              </small>
              <ErrorMessage
                name="skills"
                component="div"
                className="form-control-invalid"
              />
            </div>

            <div className="form-group">
              <Field
                type="text"
                name="githubusername"
                placeholder="Github Username"
              />
              <small className="form-text">
                If you want your latest repos and a Github link, include your
                username
              </small>
            </div>

            <div className="form-group">
              <Field
                as="textarea"
                name="bio"
                placeholder="A short bio of yourself"
              />
              <small className="form-text">
                Tell us a little about yourself
              </small>
            </div>

            <div className="my-2">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => toggleSocialInputs(!displaySocialInputs)}
              >
                Add Social Network Links
              </button>
              <span>Optional</span>
            </div>

            {displaySocialInputs && (
              <>
                <div className="form-group">
                  <i className="fab fa-twitter fa-2x"></i>
                  <Field type="text" name="twitter" placeholder="Twitter URL" />
                </div>

                <div className="form-group">
                  <i className="fab fa-facebook fa-2x"></i>
                  <Field
                    type="text"
                    name="facebook"
                    placeholder="Facebook URL"
                  />
                </div>

                <div className="form-group">
                  <i className="fab fa-linkedin fa-2x"></i>
                  <Field
                    type="text"
                    name="linkedin"
                    placeholder="Linkedin URL"
                  />
                </div>

                <div className="form-group">
                  <i className="fab fa-youtube fa-2x"></i>
                  <Field type="text" name="youtube" placeholder="YouTube URL" />
                </div>

                <div className="form-group">
                  <i className="fab fa-instagram fa-2x"></i>
                  <Field
                    type="text"
                    name="instagram"
                    placeholder="Instagram URL"
                  />
                </div>
              </>
            )}
            <button type="submit" className="btn btn-primary my-1">
              Create
            </button>

            <Link className="btn btn-light my-1" to="/dashboard">
              Go Back
            </Link>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default connect(null, { createProfile })(withRouter(CreateProfile));
