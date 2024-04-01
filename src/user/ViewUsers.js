import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


export default function ViewUsers() {

    const[user, setUser] = useState({

        name:"",
        email:"",
        username:"",
        mobile:""

    });

    const {id} = useParams ();

    useEffect(() => {
        loaduser();
    },[]);

    const loaduser = async () => {
        const result = await axios.get(`http://localhost:8080/user/${id}`);
        setUser(result.data);
    }

return(
<div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'> 
             <h2 className='text-center m-4'>User Details</h2>
             <div className="card">
                <div className="card-header">
                    Details of User id : {user.id}
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <b>Name : </b>
                            {user.name}
                        </li>
                        <li className="list-group-item">
                            <b>Email : </b>
                            {user.email}
                        </li>
                        <li className="list-group-item">
                            <b>User Name : </b>
                            {user.username}
                        </li>
                        <li className="list-group-item">
                            <b>Mobile No: </b>
                            {user.mobile}
                        </li>
                    </ul>
                </div>
             </div>
             <Link className="btn btn-primary my-2" to ={"/Home"}>Back To Home</Link>
</div>
</div>
</div>

    );}
