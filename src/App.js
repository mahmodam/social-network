import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar/Navbar";
import Landing from "./components/layout/Landing/Landing";
import Register from "./components/auth/Register/Register";
import Login from "./components/auth/Login/Login";
import Alert from "./components/layout/Alert/Alert";
import { setAuthToken } from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";

// Redux
import { Provider } from "react-redux";
import store from "./store";

import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-forms/CreateProfile/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation/AddEducation";
import ProfileList from "./components/profiles/ProfileList/ProfileList";
import Profile from "./components/profile/Profile/Profile";
import PostList from "./components/posts/PostList/PostList";
import Post from "./components/post/Post";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <>
          <Navbar />
          <Route exact path="/">
            <Landing />
          </Route>
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register">
                <Register />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/profile-list">
                <ProfileList />
              </Route>
              <Route exact path="/profile/:id">
                <Profile />
              </Route>
              <Route exact path="/dashboard">
                <Dashboard />
              </Route>
              <Route exact path="/create-profile">
                <CreateProfile />
              </Route>
              <Route exact path="/edit-profile">
                <EditProfile />
              </Route>
              <Route exact path="/add-experience">
                <AddExperience />
              </Route>
              <Route exact path="/add-education">
                <AddEducation />
              </Route>
              <Route exact path="/post-list">
                <PostList />
              </Route>
              <Route exact path="/post/:id">
                <Post />
              </Route>
            </Switch>
          </section>
        </>
      </Router>
    </Provider>
  );
}

export default App;
