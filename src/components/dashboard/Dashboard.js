import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import { deleteAccount } from "../../actions/profile";
import Spinner from "../layout/Spinner/Spinner";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";

function Dashboard(props) {
  useEffect(() => {
    props.getCurrentProfile();

    // eslint-disable-next-line
  }, []);
  return (
    <>
      {props.profile.loading && props.profile.profile === null ? (
        <Spinner />
      ) : (
        <>
          <h1 className="large text-primary">Dashboard</h1>
          <p className="lead">
            <i className="fas fa-user"></i> Welcome{" "}
            {props.auth.user && props.auth.user.name}
          </p>
          {props.profile.profile !== null ? (
            <>
              <DashboardActions />
              <Experience experience={props.profile.profile.experience} />
              <Education education={props.profile.profile.education} />

              <div className="my-2">
                <button
                  className="btn btn-danger"
                  onClick={() => props.deleteAccount()}
                >
                  <i className="fas fa-user-minus"></i> Delete My Account
                </button>
              </div>
            </>
          ) : (
            <>
              <p>You have not yet setup a profile, please add some info</p>
              <Link to="/create-profile" className="btn btn-primary my-1">
                Create Profile
              </Link>
            </>
          )}
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
