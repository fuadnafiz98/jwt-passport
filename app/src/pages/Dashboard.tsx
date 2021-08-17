//@ts-nocheck
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";

import config from "../config";
import { AuthContext } from "../context/AuthContext";
import useInterval from "../hooks/useInterval";

const Dashboard = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();

  const refreshToken = async () => {
    console.log("refresh token generating....");
    let response = await fetch(`${config.BACKEND_URL}/api/auth/token`, {
      credentials: "include",
    });
    if (response.status === 401) {
      history.push("/signin");
      return;
    }
    const { data } = await response.json();
    auth?.setAuthState(data);
    console.log("refreshed", data);
  };

  useInterval(() => {
    console.log("interval calling");
    refreshToken();
  }, 15000);

  useEffect(() => {
    async function fetchData() {
      let response = await fetch(`${config.BACKEND_URL}/api/vip`, {
        credentials: "include",
      });
      if (response.status === 401) {
        //TODO: more work call /logout
        auth?.logout();
        history.push("/signin");
      }
      const json = await response.json();
      console.log(json);
    }
    fetchData();
  }, [auth, history]);

  return (
    <div>
      <h4>Dashboard</h4>
      <strong>{auth?.authState.userInfo?.name}</strong>
    </div>
  );
};

export default Dashboard;
