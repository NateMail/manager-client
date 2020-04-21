import React, { Component } from "react";

class EditToDo extends Component {
  constructor() {
    super();
    this.state = {
        task: "",
        completed: false,
        createdBy: "",
        error: "",
        loading: false
    };
  }



  render() {
    return (
      <div>
        <h1>Hello</h1>
      </div>
    );
  }
}

export default EditToDo;
