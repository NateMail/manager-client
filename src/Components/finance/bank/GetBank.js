import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { read } from "../../user/apiUser";
import { isAuthenticated } from "../../auth";
import { getBank } from "./bankApi";

class GetBank extends Component {
  constructor() {
    super();
    this.state = {
      banks: [],
      redirectToSignin: false,
      redirectToCreateBank: false,
      userId: "",
    };
  }

  init = (userId) => {
    const token = isAuthenticated().token;
    read(userId, token).then((data) => {
      if (data.error) {
        this.setState({ redirectToSignin: true });
      } else {
        this.loadBank(data._id);
      }
    });
  };

  loadBank = (userId) => {
    const token = isAuthenticated().token;
    getBank(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        if (data.bank.length === 0) {
          this.setState({ redirectToCreateBank: true });
        }
        this.setState({ banks: data.bank });
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
      banks,
      redirectToCreateBank,
      redirectToSignin,
    } = this.state;
    if (redirectToSignin) return <Redirect to="/signin" />;
    if (redirectToCreateBank) return <Redirect to={`/bank/new/${userId}`} />;

    return (
      <div>
        {banks.map(function (bank, idx) {
          return (
            <div key={idx}>
              <h1>Checking: {bank.checking}</h1>
              <h1>Savings: {bank.saving}</h1>
            </div>
          );
        })}
      </div>
    );
  }
}

export default GetBank;
