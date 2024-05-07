import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
import "./Sign.css";

function SignUp({ setIsAuth }) {
  // Create dynamic userid using date and time
  const cookies = new Cookies();
  const [user, setUser] = useState(null);

  const signUp = async () => {
    Axios.post("http://localhost:3001/signup", user).then((res) => {
      const { token, userId, firstName, lastName, username, hashedPassword } =
        res.data;
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("username", username);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      cookies.set("hashedPassword", hashedPassword);
      setIsAuth(true);
    });
  };
  return (
    <div className="signUp-container" >
      <label className="signUp-label" > Sign Up</label>
      <input
        className="signUp-input"
        placeholder='First Name'
        onChange={(event) => {
          setUser({ ...user, firstName: event.target.value });
        }}
      />
      <input
        className="signUp-input"
        placeholder='Last Name'
        onChange={(event) => {
          setUser({ ...user, lastName: event.target.value });
        }}
      />
      <input
        className="signUp-input"
        placeholder='Username'
        onChange={(event) => {
          setUser({ ...user, username: event.target.value });
        }}
      />
      <input
        className="signUp-input"
        placeholder="Password"
        type="password"
        onChange={(event) => {
          setUser({ ...user, password: event.target.value });
        }}
      />
      <button className="signUp-button" onClick={signUp}>Sign Up</button>
    </div>
  );
}

export default SignUp;