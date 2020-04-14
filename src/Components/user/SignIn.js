import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { signin, authenticate } from "../auth";

class Signin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
      redirectToRefer: false,
      loading: false,
    };
  }

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  clickSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const { email, password } = this.state;

    const user = {
      email,
      password,
    };
    signin(user).then((data) => {
      if (data.error) {
        this.setState({ error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          this.setState({ redirectToRefer: true });
        });
      }
    });
  };

  render() {
    const { email, password, error, redirectToRefer, loading } = this.state;
    if (redirectToRefer) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <h2>Sign In</h2>
        <h3>Do not use real email or password this is not a secure server</h3>

        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>

        {loading ? (
          <div className="jumbotron text-center">
            <h2>Loading...</h2>
          </div>
        ) : (
          ""
        )}

        <form>
          <div className="form-group">
            <label>Email</label>
            <input
              onChange={this.handleChange("email")}
              type="text"
              className="form-control"
              value={email}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              onChange={this.handleChange("password")}
              type="password"
              className="form-control"
              value={password}
            />
          </div>
          <button
            onClick={this.clickSubmit}
            className="btn btn-raised btn-primary"
            style={{ margin: "0px 47%" }}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Signin;
