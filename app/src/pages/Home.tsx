import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const auth = useContext(AuthContext);
  return (
    <div>
      <h4>Home</h4>
      <strong>{auth?.authState.userInfo?.name}</strong>
    </div>
  );
};

export default Home;
