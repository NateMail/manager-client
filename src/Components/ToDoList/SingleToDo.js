import React, { Component } from "react";
import { singleToDo } from "./toDoApi";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

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

  renderToDo = (todo) => {
    return (
      <Card style={{ textAlign: "center" }}>
        <ListGroup>
          <ListGroupItem className="card-text">{todo.task}</ListGroupItem>
          <ListGroupItem className="card-text">{todo.created}</ListGroupItem>
        </ListGroup>
        <br />

        <ListGroup className="d-inline-block">
          {isAuthenticated().user &&
            isAuthenticated().user._id === todo.createdBy && (
              <>
                {
                  <Link
                    to={`/todo/edit/${todo._id}`}
                    className="btn btn-raised btn-info"
                  >
                    Update Task
                  </Link>
                }
              </>
            )}
        </ListGroup>
      </Card>
    );
  };

  render() {
    const { todo, redirectToSignIn } = this.state;

    if (redirectToSignIn) return <Redirect to={"/signin"} />;

    return (
      <div>
        {!todo ? (
          <div className="jumbotron text-center">
            <h2>Loading...</h2>
          </div>
        ) : (
          this.renderToDo(todo)
        )}
      </div>
    );
  }
}

export default SingleToDo;
