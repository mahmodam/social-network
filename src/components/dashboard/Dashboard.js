import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner/Spinner";
import DashboardActions from "./DashboardActions";

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

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
