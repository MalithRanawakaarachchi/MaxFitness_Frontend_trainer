import React, { useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import MFicon from '../images/MFicon.png';
import './navbar.css';
import {CgProfile} from 'react-icons/cg';
import AdminProfile from "./AdminProfile";

const NavigationBar = () => {
  const [profileVisible, setProfileVisible] = useState(false);
  const userLevel = sessionStorage.getItem('userLevel');
  sessionStorage.setItem('proVisible', profileVisible);

  return (
    <>
    <Navbar collapseOnSelect expand="lg" className="nav-alignment" bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/trainee/view">
        <img src={MFicon} alt="" className='logo-img'/> 
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Nav style={{marginLeft:20, width:290}}>
        <Nav.Link as={NavLink} to="/DashBoard" className={` ${userLevel==1000 ? "hide-visibility" : ""}`}>
          MAX FITNESS
        </Nav.Link>
      </Nav>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Trainee" id="collasible-nav-dropdown">
            <NavDropdown.Item as={NavLink} to="/trainee/view">
              View Trainee
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/trainee/add">
              Add Trainee
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/trainee/membership">
              Membership
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Trainers" id="collasible-nav-dropdown" className={` ${userLevel==1000 ? "hide-visibility" : ""}`}>
            <NavDropdown.Item as={NavLink} to="/trainers/view">
              View Trainers
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/trainers/add">
              Add Trainers
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Equipment" id="collasible-nav-dropdown">
            <NavDropdown.Item as={NavLink} to="/equipment/view">
              View Equipment
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/equipment/add">
              Add Equipment
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Exercises" id="collasible-nav-dropdown">
            <NavDropdown.Item as={NavLink} to="/exercises/view">
              View Exercises
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/exercises/add">
              Add Exercises
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/exercises/modify">
              Manage Exercises
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Schedules" id="collasible-nav-dropdown">
            <NavDropdown.Item as={NavLink} to="/schedules/view">
              View Schedules
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/schedules/add">
              Add Manual Schedules
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Trainee Metrics" id="collasible-nav-dropdown">
            <NavDropdown.Item as={NavLink} to="/traineemetrics/view">
              View Trainee Metrics
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/traineemetrics/add">
              Add Trainee Metrics
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Revenue" id="collasible-nav-dropdown" className={` ${userLevel==1000 ? "hide-visibility" : ""}`}>
            <NavDropdown.Item as={NavLink} to="/revenue/makePayment">
              Make Payments
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/revenue/viewPayment">
              View Payments
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav className="ms-auto">
          <Nav.Link as={NavLink} style={{marginRight:"30px"}} onClick={()=> setProfileVisible(!profileVisible)}>
                <span>Profile</span><CgProfile style={{width:"40px", margin:"0px 0px 3px -4px"}}/>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <AdminProfile/>
    </>
  );
};

export default NavigationBar;