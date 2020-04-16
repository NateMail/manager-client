import React, { Component } from "react";
import { singleToDo } from "./toDoApi";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";

class SingleToDo extends Component {
  state = {
    todo: {},
    redirectToSignIn: false,
  };

  componentDidMount = () => {
    console.log(this.props.match.params);
    const toDoId = this.props.match.params.toDoId;
    const token = isAuthenticated().token;

    if (!token) {
      this.setState({ redirectToSignIn: true });
    } else {
      singleToDo(toDoId, token).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          this.setState({
            todo: data,
          });
        }
      });
    }
  };

  render() {
    const { todo, redirectToSignIn } = this.state;

    if (redirectToSignIn) return <Redirect to={"/signin"} />;

    return (
      <div>
        <h1>{todo.task}</h1>
        <h3>{todo.created}</h3>
      </div>
    );
  }
}

export default SingleToDo;
