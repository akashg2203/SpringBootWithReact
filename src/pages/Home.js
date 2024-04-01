
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

export default function Home() {

    const[Users,setUsers]=useState([])

    useEffect(()=>{

        loadUsers();

    },[])

    const loadUsers = async ()=> {
        const result = await axios.get("http://localhost:8080/users");
        setUsers(result.data);
    }


  return (
    <div className='container'>
<div className='py-4'>

<table className="table border shadow">
  <thead>
    <tr>
      <th scope="col">S.No</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">User Name</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
                        {Users.map((user, index) => (
                            <tr key={user.id}>
                                <td scope="row">{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.username}</td>
                                <td>
                                    <Link className='btn btn-primary mx-2' to={`/viewuser/${user.id}`}>View</Link>
                                    <Link className='btn btn-outline mx-2' to={`/edituser/${user.id}`} >Edit</Link>
                                    <Link className='btn btn-danger mx-2' to={`/deleteuser/${user.id}`}>Delete</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
</table>

</div>

    </div>
  )
}
