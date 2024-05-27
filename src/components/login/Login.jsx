import React from "react";
import "./login.css";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  // const handleLogin = (e) => {
  //   e.preventDefault();

  // };

  const handleLogin = async (e) => {
    e.preventDefault();

    const password = document.getElementById("signUpPassword").value;
    const email = document.getElementById("signUpemail").value;

    const data = {
      password,
      email,
    };
    console.log("Signup data:", data);

    try {
      const response = await axios.post("http://localhost:5000/login", data);

      const { token } = response.data;
      localStorage.setItem("token", token);
      alert("Login Successful");
    } catch (error) {
      console.error("Login failed:", error.response.data.error);
      alert(error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    const role = document.getElementById("role").value;

    const data = {
      username,
      password,
      email,
      role,
    };

    try {
      const response = await axios.post("http://localhost:5000/register", data);

      alert("SignUp Successful");
    } catch (error) {
      console.error(
        "Signup failed:",
        error.response?.data?.error || error.message
      );
      alert("Signup failed: " + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="login">
      <div className="item">
        <h2>Welcome back,</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            name="email"
            id="signUpemail"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="signUpPassword"
          />
          <button type="submit" disabled={loading}>
            {loading ? "Loading" : "Sign In"}
          </button>
        </form>
      </div>
      <div className="separator"></div>
      <div className="item">
        <h2>Create an Account</h2>
        <form onSubmit={handleSignup}>
          {/* <label htmlFor="file">
            <img src={avatar.url || "./avatar.png"} alt="" />
            Upload an image
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleAvatar}
          /> */}
          <input
            type="text"
            placeholder="Username"
            name="username"
            id="username"
          />
          <input type="text" placeholder="Email" name="email" id="email" />
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
          />
          <input type="text" name="role" id="role" />

          <button disabled={loading}>{loading ? "Loading" : "Sign Up"}</button>
        </form>

        {/* <form action="http://localhost:5000/register" method="post">
          <input type="text" name="username" id="username" />
          <input type="text" name="password" id="password" />
          <input type="email" name="email" id="email" />
          <input type="text" name="role" id="role" />
          <button type="submit">Send</button>
        </form> */}

        <form action="http://localhost:5000/register" method="post">
          <h1>Input here</h1>
          <input type="text" name="username" id="username" />
          <input type="text" name="password" id="password" />
          <input type="email" name="email" id="email" />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
