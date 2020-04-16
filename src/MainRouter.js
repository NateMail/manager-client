import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./Components/auth/PrivateRoute";
import Nav from "../src/Components/Nav";
import Home from "../src/Components/Home";
import SignUp from "../src/Components/user/SignUp";
import SignIn from "../src/Components/user/SignIn";
import NewBank from "../src/Components/finance/bank/NewBank";
import GetBank from "../src/Components/finance/bank/GetBank";

import NewToDo from "../src/Components/ToDoList/NewToDo";
import AllToDo from "../src/Components/ToDoList/AllToDo";

const MainRouter = () => (
  <div>
    <Nav />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
      <PrivateRoute exact path="/bank/new/:userId" component={NewBank} />
      <PrivateRoute exact path="/bank/by/:userId" component={GetBank} />
      <PrivateRoute exact path="/todo/new/:userId" component={NewToDo} />
      <PrivateRoute exact path="/todo/by/:userId" component={AllToDo} />
    </Switch>
  </div>
);

export default MainRouter;
