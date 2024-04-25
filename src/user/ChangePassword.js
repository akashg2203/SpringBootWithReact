import React, {useState} from "react";
import {Link, useEffect, useNavigate, useParams} from "react-router-dom";
import axios, { Axios } from "axios";



export default function ChangePassword(){

  const usedavigate = useNavigate();

  React.useEffect(()=>{
    if(!localStorage.getItem('auth')) usedavigate('/')
  },[])

    const[oldPassword, setOldPassword] = useState("");
    const[password, setPassword] = useState("");
    const[confirmPassword, setConfirmPassword] = useState("");
    const[error, setError] = useState("");
    const[success, setSuccess] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    const handleChangePassword = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/myAccount/${id}`);
            
            if (confirmPassword === response.data.password) {
                setError("Previous password and current password should not be the same");
                clearMessages();
            }
    
            if (oldPassword === response.data.password) {
                const res = await axios.put(`http://localhost:8080/updatePassword/${id}`, { password });
                if (res.status === 200) {
                    setSuccess("Password successfully updated");
                    clearMessages();
                    navigate("/")
                }
            }
        } catch (error) {
            setError("An error occurred while changing the password");
            clearMessages();
        }
    }
    
    const clearMessages = () => {
        setTimeout(() => {
            setError("");
            setSuccess("");
        }, 3000);
    };
    return (
        <div className="login-container">
          <h2>Change Password</h2>
          <form>
            <div className="form-group">
              <label htmlFor="loginId">OldPassword:</label>
              <input
                type="password"
                id="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="login_name">New Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {error && <p className="error-message">{error} </p>}
            {success && <p className="error-message">{success} </p>}
            <div className="form-group">
              <button type="button" onClick={handleChangePassword}>
                Change
              </button>
            </div>
          </form>
        </div>
      );
}