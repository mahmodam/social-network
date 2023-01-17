import React, { useEffect } from "react";

import { connect } from "react-redux";
import { getProfiles } from "../../../actions/profile";

import Spinner from "../../layout/Spinner/Spinner";
import ProfileItem from "../ProfileItem/ProfileItem";

function ProfileList({ getProfiles, profile }) {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <>
      {profile.loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i> Browse and connect with
            developers
          </p>
          <div className="profiles">
            {profile.profiles.length > 0 ? (
              <>
                {profile.profiles.map((profile) => (
                  <ProfileItem key={profile._id} profile={profile} />
                ))}
              </>
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(ProfileList);
