import React from "react";
import { Link, useLocation, useNavigate} from "react-router-dom";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';


export default function NavbarComponent() {
  const location = useLocation();
  const show = location.pathname !== "/" && location.pathname !== "/register";
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("loggedInUser");

console.log("sks"+userId);
  
  const handlelogout = () =>{
    const Confirmed = window.confirm("Are you sure you want to logout?");
if(Confirmed){
  localStorage.removeItem('auth');
  navigate("/")
}
  }
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/Home"}>
          Full Stack Application
        </Link>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          {show && (
            <Nav className="me-auto">
              <Link className="nav-link" to="/adduser">
                Add User
              </Link>
            </Nav>
          )}
          {show && (
            <Nav className="ml-auto">
             <NavDropdown title="My Account" id="basic-nav-dropdown" className="ml-auto">
  <Link className="dropdown-item" to={`/myaccount/${userId}`}>
    View
  </Link>
  <Link className="dropdown-item" to={`/changepassword/${userId}`}>
    Change Password
  </Link>
  <NavDropdown.Divider />
  <Link className="dropdown-item" onClick={handlelogout}  style = {{ cursor:'pointer'}} to="/">
    Logout
  </Link>
</NavDropdown>

            </Nav>
          )}
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}
