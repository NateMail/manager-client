import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../src/Components/Home";
import SignUp from "../src/Components/user/SignUp";
import SignIn from "../src/Components/user/SignIn";

const MainRouter = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
    </Switch>
  </div>
);

export default MainRouter;
