import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar/Navbar";
import Landing from "./components/layout/Landing/Landing";
import Register from "./components/auth/Register/Register";
import Login from "./components/auth/Login/Login";

function App() {
  // let routes = (
  //   <Routes>
  //     <Route exact path="/register" element={<Register />} />
  //     <Route exact path="/login" element={<Login />} />
  //   </Routes>
  //);
  return (
    <Router>
      <>
        <Navbar />
        <Route exact path="/">
          <Landing />
        </Route>
        <section className="container">
          <Switch>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
          </Switch>
        </section>
      </>
    </Router>
  );
}

export default App;
