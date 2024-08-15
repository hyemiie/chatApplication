import React from "react";
import "./login.css";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

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
  const [selectedRole, setselectedRole] = useState("");
  const [roleKey, setroleKey] = useState("");
  const [checkRole, setcheckRole] = useState(false);
  const [loginView, setLoginView] = useState(false);

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
    const role = selectedRole;
    
    console.log(role)

    const data = {
      password,
      email,
      role,
      roleKey

    };
    console.log("Signup data:", data);

    try {
      const response = await axios.post("http://localhost:5000/login", data);

      const { token } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userName", token);
      // const decoded = jwt_decode(token);
      // console.log(decoded)
      alert("Login Successful");
    } catch (error) {
      console.error("Login failed:", error.response.data.error);
      alert(error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const username = document.getElementById("SignUpusername").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    const role = selectedRole;
    console.log('signup role', role)

    const data = {
      username,
      password,
      email,
      role,
      roleKey,
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

  const handleChange = (event) => {
    setselectedRole(event.target.value);
    selectedRole =="Employee"? setcheckRole(true):setcheckRole(false)
    console.log (checkRole) };

    const handleKeyInput = (event) => {
      setroleKey(event.target.value);
      console.log (roleKey) };

      return (
        <div className="login">
          {/* <Navbar/> */}
          {loginView ? (
            <div className="item">
              <div className="loginImg"></div>
              <div className="formDiv">
                <h2>Welcome back,</h2>
                <form onSubmit={handleLogin}>
                  <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    id="signUpemail"
                  />
                  <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    id="username"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    id="signUpPassword"
                  />
                  {checkRole ? (
                    <input
                      placeholder="Enter Executive Key"
                      id="roleKey"
                      type="password"
                      onChange={handleKeyInput}
                    />
                  ) : (
                    <input
                      placeholder="Enter Employee Key"
                      id="empRoleKey"
                      type="password"
                      onChange={handleKeyInput}
                    />
                  )}
                  <div>
                    <label>Role</label>
                    <select value={selectedRole} onChange={handleChange}>
                      <option value="Executive">Executive</option>
                      <option value="Employee">Employee</option>
                    </select>
                  </div>
                  <button type="submit" disabled={loading}>
                    {loading ? "Loading" : "Sign In"}
                  </button>
                  <p onClick={() => setLoginView(false)}>Create a new Account?</p>
                </form>
              </div>
            </div>
          ) : (
            <>
              {/* <div className="separator"></div> */}
              <div className="item regItem">
                <div className="loginImg"></div>
                <div className="formDiv">
                  <h2>Create an Account</h2>
                  <form onSubmit={handleSignup}>
                    <input
                      type="text"
                      placeholder="Username"
                      name="username"
                      id="SignUpusername"
                    />
                    <input type="text" placeholder="Email" name="email" id="email" />
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      id="password"
                    />
                    <input type="text" name="role" id="role" />
                    <div>
                      <label>Role</label>
                      <select value={selectedRole} onChange={handleChange}>
                        <option value="Executive">Executive</option>
                        <option value="Employee">Employee</option>
                      </select>
                    </div>
                    <button disabled={loading}>
                      {loading ? "Loading" : "Sign Up"}
                    </button>
                  </form>
                  <p onClick={() => setLoginView(true)}>Already have an account?..Login</p>
                </div>
              </div>
            </>
          )}
        </div>
      );
      
};

export default Login;
