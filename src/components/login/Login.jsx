import React, { useEffect } from "react";
import "./login.css";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

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
  const [loginView, setLoginView] = useState(true);
  const navigate = useNavigate();

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
    setLoading(true)
    e.preventDefault();

    const password = document.getElementById("signUpPassword").value;
    const email = document.getElementById("signUpemail").value;
    const role = selectedRole;

    console.log(role);

    const data = {
      password,
      email,
      role,
      roleKey,
    };
    console.log("Signup data:", data);

    try {
      const response = await axios.post("https://chatapplication-backend-d65c.onrender.com/login", data);

      const { token } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userName", token);
      // const decoded = jwt_decode(token);
      console.log("TOKEN ADDED", token)
      alert("Login Successful");
      
  useEffect(() => {
    const token = localStorage.getItem('userName');
    console.log('token', token)
    if (token) {
        navigate('/lists'); 
    }
}, [navigate]);
      setLoading(false)
    } catch (error) {
      console.error("Login failed:", error.response.data.error);
      setLoading(false)
      alert(error);
    }
  };

  const handleSignup = async (e) => {
    setLoading(true)
    e.preventDefault();
    const username = document.getElementById("SignUpusername").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    const role = selectedRole;
    console.log("signup role", role);

    const data = {
      username,
      password,
      email,
      role,
      roleKey,
    };

    try {
      const response = await axios.post("https://chatapplication-backend-d65c.onrender.com/register", data);

      alert("SignUp Successful");
      setLoading(false)

    } catch (error) {
      console.error(
        "Signup failed:",
        error.response?.data?.error || error.message
      );
      setLoading(false)
      alert("Signup failed: " + (error.response?.data?.error || error.message));
    }
  };

  const handleChange = (event) => {
    setselectedRole(event.target.value);
    selectedRole == "Employee" ? setcheckRole(true) : setcheckRole(false);
    console.log(checkRole);
  };

  const handleKeyInput = (event) => {
    setroleKey(event.target.value);
    console.log(roleKey);
  };


  useEffect(() => {
      const token = localStorage.getItem('userName');
      console.log('token', token)
      if (token) {
          navigate('/lists'); 
      }
  }, [navigate]);


  return (
    <div className="login">
      {loginView ? (
        <div className="item">
          <div className="loginImg"></div>
          <div className="formDiv">
            {/* <h2>Welcome back,</h2> */}
            <form onSubmit={handleLogin}>
            <div className="loginHeading">
            <div></div>
            <h2>Welcome back,</h2></div>
              <label>Email</label>
              <input
                type="text"
                placeholder="Email"
                name="email"
                id="signUpemail"
              />
              <label>Username</label>
              <input
                type="text"
                placeholder="Username"
                name="username"
                id="username"
              />
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                id="signUpPassword"
              />
              {checkRole ? (
                <div className="accessKey">
                  <label>Access Key</label>
                  <input
                    placeholder="Enter Executive Key"
                    id="roleKey"
                    type="password"
                    onChange={handleKeyInput}
                  />
                </div>
              ) : (
                <div className="accessKey">
                  <label>Access Key</label>
                  <input
                    placeholder="Enter Employee Key"
                    id="empRoleKey"
                    type="password"
                    onChange={handleKeyInput}
                  />
                </div>
              )}
              <div className="selectAccess">
                <label>Role</label>
                <select value={selectedRole} onChange={handleChange}>
                  <option value="Executive">Executive</option>
                  <option value="Employee">Employee</option>
                </select>
              </div>
              {loading? <div className="progress"></div>

: <button disabled={loading}>
{loading ? "Loading" : "Sign in"}
                </button>
                }
              <p onClick={() => setLoginView(false)} className="signupOption">Create a new Account?</p>
            </form>
          </div>
        </div>
      ) : (
        <>
          {/* <div className="separator"></div> */}
          <div className="item regItem">
            <div className="loginImg signUpImg"></div>
            <div className="formDiv">
              <h2>Create an Account</h2>
              <form onSubmit={handleSignup}>
                <label>Username</label>
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  id="SignUpusername"
                />
                <label>Email</label>
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  id="email"
                />
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  id="password"
                />
                {/* <label>Role</label> */}
                {/* <input type="text" name="role" id="role" /> */}
                <div className="selectAccess">
                <label>Role</label>
                  <select value={selectedRole} onChange={handleChange}>
                    <option value="Executive">Executive</option>
                    <option value="Employee">Employee</option>
                  </select>
                </div>
               
                {loading? <div className="progress"></div>

: <button disabled={loading}>
{loading ? "Loading" : "Sign Up"}
                </button>
                }
                </form>

              <p onClick={() => setLoginView(true)} className="loginOption">
                Already have an account?..Login
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
