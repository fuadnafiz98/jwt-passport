import React, { useState } from "react";

const Magic = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      console.log(email);
      const response = await fetch("/api/auth/magic", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ destination: email }),
      });
      if (response.status === 200) {
        const { data } = await response.json();
        console.log(data);
      } else {
        const json = await response.json();
        console.log(json);
      }
    } catch (err) {
      console.log("error at signin");
      console.log(err);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">SignIn</button>
    </form>
  );
};

export default Magic;
