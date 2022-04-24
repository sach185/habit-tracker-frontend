import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Header = (props) => {
  return (
    <div className="root">
      <div className="inner">
        <Link className="link-logo" to="/">
          <img className="logo" src="/app-logo.png" alt="logo" />
        </Link>
        <Link className="link" to="/">
          Home
        </Link>
        <Link className="link" to="/habits">
          My Habits
        </Link>
      </div>
    </div>
  );
};

export default Header;
