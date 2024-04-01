import React from 'react';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AddUsers from './user/AddUsers';
import EditUsers from './user/EditUsers';
import DeleteUser from './user/DeleteUser';
import ViewUsers from './user/ViewUsers';
import Login from './pages/Login';
import Register from './user/Register'; 
import MyAccount from './user/MyAccount';
import ChangePassword from './user/ChangePassword';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path='/' element={<Login/>}/>
          <Route path='/register' element={<Register />} /> 
          <Route exact path='/Home' element={<Home/>}/>
          <Route exact path='/adduser' element={<AddUsers/>}/>
          <Route exact path='/edituser/:id' element={<EditUsers/>}/>
          <Route exact path='/deleteuser/:id' element={<DeleteUser/>}/> 
          <Route exact path='/viewuser/:id' element={<ViewUsers/>}/>
          <Route exact path='/myaccount/:id' element={<MyAccount/>}/>
          <Route exact path='/changepassword/:id' element={<ChangePassword/>}/>


        </Routes>
      </Router>   
    </div>
  );
}

export default App;
