import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { read } from "../user/apiUser";
import { isAuthenticated } from "../auth";
import { getToDo } from "./toDoApi";

class AllToDos extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      redirectToSignin: false,
      redirectToCreateToDo: false,
      userId: "",
    };
  }

  init = (userId) => {
    const token = isAuthenticated().token;
    read(userId, token).then((data) => {
      if (data.error) {
        this.setState({ redirectToSignin: true });
      } else {
        this.loadToDo(data._id);
      }
    });
  };

  loadToDo = (userId) => {
    const token = isAuthenticated().token;
    getToDo(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        if (data.todos.length === 0) {
          this.setState({ redirectToCreateToDo: true });
        }
        this.setState({ todos: data.todos });
      }
    });
  };

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.setState({ userId: userId });
    this.init(userId);
  }

  render() {
    const {
      userId,
      todos,
      redirectToCreateToDo,
      redirectToSignin,
    } = this.state;
    if (redirectToSignin) return <Redirect to="/signin" />;
    if (redirectToCreateToDo) return <Redirect to={`/todo/new/${userId}`} />;

    console.log(todos);

    return (
      <div>
        {todos.map(function (todo, idx) {
          return (
            <div key={idx}>
              <h1>{todo.task}</h1>
              <h3>{todo.created}</h3>
            </div>
          );
        })}
      </div>
    );
  }
}

export default AllToDos;
