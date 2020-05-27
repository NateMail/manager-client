import React, { Component } from "react";
import { singleToDo, update } from "./toDoApi";
import { isAuthenticated } from "../auth";

// Is not passing data
// the boolean value is not working as it should

class EditToDo extends Component {
  constructor() {
    super();
    this.state = {
      task: "",
      id: "",
      completed: false,
      checked: false,
      created: "",
      createdBy: "",
      error: "",
      loading: false,
      redirectToToDo: false,
      redirectToSignIn: false,
    };
  }

  init = (toDoId, token) => {
    singleToDo(toDoId, token).then((data) => {
      if (data.error) {
        this.setState({ redirectToToDo: true });
      } else {
        this.setState({
          id: data._id,
          task: data.task,
          completed: data.completed,
          created: data.created,
          createdBy: data.createdBy,
          error: "",
        });
      }
    });
  };

  componentDidMount() {
    this.toDoData = new FormData();
    const toDoId = this.props.match.params.toDoId;
    const token = isAuthenticated().token;
    if (!token) {
      this.setState({ redirectToSignIn: true });
    }
    this.init(toDoId, token);
  }

  isValid = () => {
    const { task, completed } = this.state;
    if (task.length === 0) {
      this.setState({ error: "All fields are required", loading: false });
      return false;
    }

    if (completed !== true && completed !== false) {
      this.setState({ error: "All fields are required", loading: false });
      return false;
    }

    return true;
  };

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    const value = event.target.value;
    console.log(name, value);
    this.toDoData.set(name, value);
    this.setState({ [name]: value });
  };

  clickSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    if (this.isValid()) {
      const toDoId = this.props.match.params.toDoId;
      const token = isAuthenticated().token;
      console.log(this.state);

      update(toDoId, token, this.toDoData).then((data) => {
        console.log(data);
        if (data.error) this.setState({ error: data.error });
        else {
          this.setState({
            loading: false,
            task: "",
            completed: false,
            redirectToToDo: true,
          });
        }
      });
    }
  };

  editToDoForm = (task, checked) => (
    <form>
      <div className="form-group">
        <label className="text-muted">task</label>
        <input
          onChange={this.handleChange("task")}
          type="text"
          className="form-control"
          value={task}
        />
      </div>
      <div className="form-goup">
        <label>
          completed:
          <input
            name="completed"
            type="checkbox"
            checked={checked}
            value={!checked}
            onChange={this.handleChange("completed")}
          />
        </label>
      </div>

      <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
        Update ToDo
      </button>
    </form>
  );

  render() {
    const { task, created, createdBy, completed } = this.state;
    return <div>{this.editToDoForm(task, created, completed)}</div>;
  }
}

export default EditToDo;
