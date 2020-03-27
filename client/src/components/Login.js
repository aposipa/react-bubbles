import React from "react";
import { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWIthAuth";

const Login = (props) => {

  const [login, setLogin] = useState({
      username: '',
      password: ''
  });

  const handleChange = e => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
    .post('login', login)
    .then(res => {
      console.log("***", res);
      localStorage.setItem('token', res.data.payload);
      props.history.push('/bubble-page');
    })
    .catch(err => {
      console.log(err)
    })
  }
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
          <input 
          placeholder="username"
          type="text"
          name="username"
          value={login.username}
          onChange={handleChange}
          />
          <input 
          placeholder="password"
          type="password"
          name="password"
          value={login.password}
          onChange={handleChange}
          />
          <button>Log in</button>
      </form>
    </>
  );
};

export default Login;
