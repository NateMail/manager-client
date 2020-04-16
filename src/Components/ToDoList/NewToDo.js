import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { create } from "./toDoApi";

class NewToDo extends Component {
  constructor() {
    super();

    this.state = {
      task: "",
      error: "",
      user: {},
      loading: false,
      completed: false,
    };
  }

  componentDidMount() {
    this.userToDoData = new FormData();
    this.setState({ user: isAuthenticated().user });
  }

  isValid = () => {
    const { task } = this.state;
    if (task.length === 0) {
      this.setState({ error: "All fields are required", loading: false });
      return false;
    }

    return true;
  };

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    const value = event.target.value;
    this.userToDoData.set(name, value);
    this.setState({ [name]: value });
  };

  clickSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    if (this.isValid()) {
      const userId = isAuthenticated().user._id;
      const token = isAuthenticated().token;

      create(userId, token, this.userToDoData).then((data) => {
        if (data.error) {
          this.setState({ error: data.error });
        } else {
          this.setState({
            task: "",
            error: "",
            loding: false,
            completed: false,
          });
        }
      });
    }
  };

  newToDoForm = (task) => (
    <form>
      <div className="form-group">
        <label>Task</label>
        <input
          onChange={this.handleChange("task")}
          type="String"
          className="form-control"
          value={task}
        />
      </div>

      <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
        Add Task
      </button>
    </form>
  );

  render() {
    const { task, completed, loading, error } = this.state;

    return (
      <div>
        <h1>Create To Do List Item</h1>
        <div className="alert alert-danger">{error}</div>
        {loading ? (
          <div className="jumbotron text-center">
            <h2>Loading...</h2>
          </div>
        ) : (
          ""
        )}
        {this.newToDoForm(task, completed)}
      </div>
    );
  }
}

export default NewToDo;
