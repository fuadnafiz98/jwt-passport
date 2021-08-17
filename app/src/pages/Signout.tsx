import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import config from "../config";

const SignOut = () => {
  const authContext = useContext(AuthContext);
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const data = await fetch(`${config.BACKEND_URL}/api/auth/signout`, {
        body: JSON.stringify(authContext?.authState),
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await data.json();
      console.log(json);
      authContext?.logout();
    } catch (err) {
      console.log("error at signup");
      console.log(err);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button type="submit">Signout</button>
      </form>
    </div>
  );
};

export default SignOut;
