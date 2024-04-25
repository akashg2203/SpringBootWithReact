import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function AddUsers() {

   
  const usedavigate = useNavigate();

  React.useEffect(()=>{
    if(!localStorage.getItem('auth')) usedavigate('/')
  },[])

   let navigate = useNavigate();

   const [user,setUser] = useState({
      name:"",
      email:"",
      username:"",
      mobile:""
   })

   const [errors, setError] = useState({
      name:"",
      email:"",
      username:"",
      mobile:""

   })

   const{name,email,username,mobile} = user

   const onInputChange = (e) =>{

      setUser({...user,[e.target.name]:e.target.value});
      setError({...errors,[e.target.name]:""});

   };
const onSubmit = async (e) => {
   e.preventDefault();

   const newErrors = {};



   if(!name) newErrors.name="Please fill in the Name";
   if(!email) newErrors.email="please fill in the Email";
   if(!username) newErrors.username="please fill in the UserName";
   if(!mobile) newErrors.usermobile="pls fill in the mobile No";

   if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
  }
    
   try {
      await axios.post("http://localhost:8080/user", user);
      navigate("/Home");
   } catch (error) {
      console.error("Error submitting user:", error);
   }
};

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'> 
             <h2 className='text-center m-4'>Register User</h2>
             <form onSubmit={(e) => onSubmit(e)}>
             <div className='mb-3'>
                <label htmlFor='Name' className='form-label'>Name</label>
                <input type='text' className='form-control' placeholder='Enter Your name' name ='name' value={name} onChange={(e)=>onInputChange(e)}></input>
                 <small className='text-danger'>{errors.name}</small>
             </div>
             <div className='mb-3'>
                <label htmlFor='Email' className='form-label'>Email</label>
                <input type='text' className='form-control' placeholder='Enter Your email' name ='email' value={email} onChange={(e)=>onInputChange(e)}></input>
                 <small className='text-danger'>{errors.email}</small>
             </div>
             <div className='mb-3'>
                <label htmlFor='User Name' className='form-label'>User Name</label>
                <input type='text' className='form-control' placeholder='Enter Your User Name' name ='username' value={username} onChange={(e)=>onInputChange(e)}></input>
                 <small className='text-danger'>{errors.username}</small>
             </div>
             <div className='mb-3'>
                <label htmlFor='Mobile' className='form-label'>Mobile No</label>
                <input type='text' className='form-control' placeholder='Enter Your Mobile No' name ='mobile' value={mobile} onChange={(e)=>onInputChange(e)}></input>
                 <small className='text-danger'>{errors.mobile}</small>
             </div>

            <button type='submit' className='btn btn-outline-primary'>submit</button>

            <Link className='btn btn-outline-danger mx-2' to={"/Home"}>Cancel</Link>
            </form>
            </div>

        </div>
    </div>
  );
}
