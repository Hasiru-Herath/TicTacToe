import React, { useState } from 'react';
import Axios from 'axios';
import Cookies from 'universal-cookie';
import "./Login.css";


function Login({ setIsAuth, setWinnerUsername }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const cookies = new Cookies();
  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username,
      password,
    }).then((res) => {
      const { username } = res.data;
      setWinnerUsername(username);
      cookies.set("token", res.data.token);
      cookies.set("userId", res.data.userId);
      cookies.set("username", username);
      cookies.set("firstName", res.data.firstName);
      cookies.set("lastName", res.data.lastName);
      setIsAuth(true);
    });
  };
  return (
    <div className="login-container">
      <label className='login-label'>Login</label>

      <input
        className='login-input'
        placeholder='Username'
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        className='login-input2'
        placeholder="Password"
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button className='login-button' onClick={login}>Login</button>
    </div>
  );
}

export default Login;
