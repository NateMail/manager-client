import React, { Component } from "react";
import { isAuthenticated } from "../../auth";
import { create } from "./bankApi";

class NewBank extends Component {
  constructor() {
    super();

    this.state = {
      checking: 0,
      saving: 0,
      error: "",
      user: {},
      loading: false,
    };
  }

  componentDidMount() {
    this.userBankData = new FormData();
    this.setState({ user: isAuthenticated().user });
  }

  isValid = () => {
    const { checking, saving } = this.state;
    if (checking === 0 || saving === 0) {
      this.setState({ error: "All fields are required", loading: false });
      return false;
    }

    return true;
  };

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    const value = event.target.value;
    this.userBankData.set(name, value);
    this.setState({ [name]: value });
  };

  clickSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    if (this.isValid()) {
      const userId = isAuthenticated().user._id;
      const token = isAuthenticated().token;

      create(userId, token, this.userBankData).then((data) => {
        if (data.error) {
          this.setState({ error: data.error });
        } else {
          this.setState({
            checking: 0,
            saving: 0,
            error: "",
            loding: false,
          });
        }
      });
    }
  };

  newBankForm = (checking, saving) => (
    <form>
      <div className="form-group">
        <label>Checking</label>
        <input
          onChange={this.handleChange("checking")}
          type="number"
          className="form-control"
          value={checking}
        />
      </div>
      <div className="form-group">
        <label>Saving</label>
        <input
          onChange={this.handleChange("saving")}
          type="number"
          className="form-control"
          value={saving}
        />
      </div>

      <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
        Create Your Bank
      </button>
    </form>
  );

  render() {
    const { checking, saving, loading, error } = this.state;

    return (
      <div>
        <h1>Create banking information</h1>
        <div className="alert alert-danger">{error}</div>
        {loading ? (
          <div className="jumbotron text-center">
            <h2>Loading...</h2>
          </div>
        ) : (
          ""
        )}
        {this.newBankForm(checking, saving)}
      </div>
    );
  }
}

export default NewBank;
