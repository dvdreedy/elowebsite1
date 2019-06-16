import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Navbar1 from "./components/layout/Navbar1";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";

import Register from "./components/auth/Register";
import RecentMatch from "./components/layout/RecentMatch";
import "bootstrap/dist/css/bootstrap.css";
import setAuthToken from "./utils/setAuthToken";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import createMatch from "./components/layout/CreateMatch";
import PrivateRoute from "./components/routing/PrivateRoute";

if (localStorage.token) setAuthToken(localStorage.token);

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    console.log("user loaded");
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar1 />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />

              <Route exact path="/recent-match" component={RecentMatch} />
              <PrivateRoute
                exact
                path="/create-match"
                component={createMatch}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
