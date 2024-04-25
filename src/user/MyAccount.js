// Change from myAccount.js to MyAccount.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function MyAccount() {

  const usedavigate = useNavigate();

  React.useEffect(()=>{
    if(!localStorage.getItem('auth')) usedavigate('/')
  },[])

  const [user, setUser] = useState({
    loginId: "",
    login_name: "",
    login_date: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/myAccount/${id}`);
    setUser(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Login Details</h2>
          <div className="card">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <b>LoginId :</b> {user.loginId}
              </li>
              <li className="list-group-item">
                <b>LoginName :</b> {user.login_name}
              </li>
              <li className="list-group-item">
                <b>Register Date :</b> {user.login_date}
              </li>
            </ul>
          </div>
          <Link className="btn btn-primary my-2" to={"/Home"}>
            Back To Home
          </Link>
        </div>
      </div>
    </div>
  );
}
