import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Nav = () => {
  const auth = useContext(AuthContext);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to={auth?.isAuthenticated() ? "/dashboard" : "/signin"}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/magic">Magic</Link>
        </li>
        <li>
          <Link to="/signin">Signin</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <Link to="/signout">Signout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
