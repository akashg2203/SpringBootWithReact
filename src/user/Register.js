import React, {useState} from "react";
import { Link,useNavigate  } from "react-router-dom";
import axios from 'axios';


export default function Register() {

  const usedavigate = useNavigate();

  React.useEffect(()=>{
    if(!localStorage.getItem('auth')) usedavigate('/')
  },[])

    const [loginId,setLoginId] = useState("");
    const [login_name,setLogin_name] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const handleRegister = async () => {

        if(password !== confirmPassword){
            setError("Password and Confirm Password must match");
        }
        else {
            setError("");
       
            try {
                const response = await axios.post("http://localhost:8080/register", {
                  loginId,
                  password,
                  login_name,
                });
                if (response.status === 200) { 
                    if(response.data == "Login ID already exists"){
                        setError("Registration failed: Login ID already exists");                      
                    }else{
                        navigate("/")
                    }
                }
            } catch (error) {
                console.error("Registration failed:", error.message);
              }
        }
       
      };

      return (
        <div className="login-container">
          <h2>Register</h2>
          <form>
            <div className="form-group">
              <label htmlFor="loginId">LOGIN ID:</label>
              <input
                type="text"
                id="loginId"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="login_name">USER NAME:</label>
              <input
                type="text"
                id="login_name"
                value={login_name}
                onChange={(e) => setLogin_name(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {error && <p className="error-message">{error} </p>}
            <div className="form-group">
              <button type="button" onClick={handleRegister}>
                Register
              </button>
            </div>
            <div className="register-link">
              <p>
                Already have an account? <Link to={"/"}>Login here</Link>
              </p>
            </div>
          </form>
        </div>
      );
    }
