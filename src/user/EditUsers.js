import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditUsers() {

   let navigate = useNavigate();

   const {id}=useParams();

   const [user,setUser] = useState({
      name:"",
      email:"",
      username:"",
      mobile:""
   })

   const{name,email,username,mobile} = user

   const onInputChange = (e) =>{

      setUser({...user,[e.target.name]:e.target.value});

   };

   useEffect(() =>{
    loadUsers();
   },[]
    )

const onSubmit = async (e) => {
   e.preventDefault();
   await axios.put(`http://localhost:8080/user/${id}`,user)
   navigate("/Home")
};

const loadUsers = async (e)=>{
    const result = await axios.get(`http://localhost:8080/user/${id}`)
    setUser(result.data);
}

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'> 
             <h2 className='text-center m-4'>Edit User</h2>
             <form onSubmit={(e) => onSubmit(e)}>
             <div className='mb-3'>
                <label htmlFor='Name' className='form-label'>Name</label>
                <input type='text' className='form-control' placeholder='Enter Your name' name ='name' value={name} onChange={(e)=>onInputChange(e)}></input>

             </div>
             <div className='mb-3'>
                <label htmlFor='Email' className='form-label'>Email</label>
                <input type='text' className='form-control' placeholder='Enter Your email' name ='email' value={email} onChange={(e)=>onInputChange(e)}></input>

             </div>
             <div className='mb-3'>
                <label htmlFor='User Name' className='form-label'>User Name</label>
                <input type='text' className='form-control' placeholder='Enter Your User Name' name ='username' value={username} onChange={(e)=>onInputChange(e)}></input>

             </div>

             <div className='mb-3'>
                <label htmlFor='Mobile' className='form-label'>Mobile</label>
                <input type='text' className='form-control' placeholder='Enter Your Mobile No' name ='mobile' value={mobile} onChange={(e)=>onInputChange(e)}></input>

             </div>

            <button type='submit' className='btn btn-outline-primary'>submit</button>

            <Link className='btn btn-outline-danger mx-2' to={"/Home"}>Cancel</Link>
            </form>
            </div>

        </div>
    </div>
  )
}
