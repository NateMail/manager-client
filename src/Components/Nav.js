import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../Components/auth";

const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: "gold" };
  else return { color: "black" };
};

const Nav = ({ history }) => (
  <div>
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link className="nav-link" style={isActive(history, "/")} to="/">
          Home
        </Link>
      </li>

      {!isAuthenticated() && (
        <>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/signup")}
              to="/signup"
            >
              Sign Up
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/signin")}
              to="/signin"
            >
              Sign In
            </Link>
          </li>
        </>
      )}

      {isAuthenticated() && (
        <>
          <li className="nav-item">Item 1</li>
          <li className="nav-item">Item 2</li>
          <li className="nav-item">Item 3</li>
          <li className="nav-item">
            <span
              className="nav-link"
              style={
                (isActive(history, "/signout"),
                { cursor: "pointer", color: "black" })
              }
              onClick={() => signout(() => history.push("/"))}
            >
              Sign Out
            </span>
          </li>
        </>
      )}
    </ul>
  </div>
);

export default withRouter(Nav);
