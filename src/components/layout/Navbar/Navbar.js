import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../../actions/auth";
import { setAlert } from "../../../actions/alert";

import "./Navbar.css";

function Navbar(props) {
  const onLogout = () => {
    props.logout();
    props.setAlert("You are logged out", "success");
  };

  const authLinks = (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/dashboard">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      <ul>
        <li>
          <Link to="/profile-list">Developers</Link>
        </li>
        <li>
          <Link to="/posts">Posts</Link>
        </li>
        <li>
          <Link to="/dashboard">
            <i className="fas fa-user"></i>{" "}
            <span className="hide-sm">Dashboard</span>
          </Link>
        </li>
        <li>
          <a onClick={onLogout} href="/">
            <i className="fas fa-sign-out-alt"></i>{" "}
            <span className="hide-sm">Logout</span>
          </a>
        </li>
      </ul>
    </nav>
  );

  const guestLinks = (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      <ul>
        <li>
          <Link to="/profiles">Developers</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );

  return (
    <div>
      {!props.auth.loading && (
        <>{props.auth.isAuthenticated ? authLinks : guestLinks}</>
      )}
    </div>
  );
}

// אם משתמש מחובר
// יש להעביר אותו ב connect לדף הבית
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout, setAlert })(Navbar);
