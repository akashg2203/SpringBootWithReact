import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {useHistory} from "react-router-dom";

export default function Login() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();


  // React.useEffect(()=>{
  //   if(localStorage.getItem('auth'))navigate('/Home')
  // },[])
  

  const handleLogin = async () => {
    
    setError("");

    if (!loginId) {
      setError("Please enter username");
      return;
    }

    if (!password) {
      setError("Please enter password");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/login", { loginId, password });
      if (response.status === 200) {
        sessionStorage.setItem("loggedInUser", loginId);
        navigate("/Home")
        localStorage.setItem('auth',true);
      }
    } catch (error) {
      if (error.response) {
        const statusCode = error.response.status;
        if (statusCode === 401) {
          setError("Incorrect password");
        } else if (statusCode === 404) {
          setError("User not found");
        } else {
          setError("An error occurred during login");
        }
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "loginId") {
      setLoginId(value);
    } else if (name === "password") {
      setPassword(value);
    }

    setIsButtonDisabled(!loginId || !password);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <div className="form-group">
          <label htmlFor="loginId">LOGIN ID:</label>
          <input
            type="text"
            id="loginId"
            name="loginId"
            value={loginId}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleInputChange}
          />
        </div>
        {error && <p className="error-message">{error} </p>}
        <div className="form-group">
          <button type="button" onClick={handleLogin} disabled={isButtonDisabled}>
            Login
          </button>
        </div>
        <div className="register-link">
          <p>
            Don't have an account? <Link to={"/register"}>Register here</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
