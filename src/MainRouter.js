import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./Components/auth/PrivateRoute";
import Nav from "../src/Components/Nav";
import Home from "../src/Components/Home";
import SignUp from "../src/Components/user/SignUp";
import SignIn from "../src/Components/user/SignIn";
import NewBank from "../src/Components/finance/bank/NewBank";

const MainRouter = () => (
  <div>
    <Nav />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
      <PrivateRoute exact path="/bank/new/:userId" component={NewBank} />
    </Switch>
  </div>
);

export default MainRouter;
