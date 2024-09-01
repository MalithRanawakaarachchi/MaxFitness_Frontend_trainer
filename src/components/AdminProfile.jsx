import "./adminprofile.css"
import React, { useState } from 'react';
import { Nav, Button, Form, Row, Col } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import pro_icon from '../images/pro_icon.gif';

const AdminProfile = ()=> {
  const proVisible = sessionStorage.getItem('proVisible');
  const firstName = sessionStorage.getItem('firstName');
  const lastName = sessionStorage.getItem('lastName');
  const emailAddress = sessionStorage.getItem('emailAddress');
  const contactNumberr = sessionStorage.getItem('contactNumber');
  const addressTrainer = sessionStorage.getItem('addressTrainer');
  const nicTrainer = sessionStorage.getItem('nicTrainer');
  const dobTrainer = sessionStorage.getItem('dobTrainer');
  const checkTrainer = sessionStorage.getItem('checkTrainer');

    return(
      <div className={`${proVisible=='true' ? 'pro-container' : 'hide-visibility'}`}>
        <div style={{height:"15px"}}></div>
        <div><img src={pro_icon} alt="" style={{height:"60px", marginBottom:"10px"}}/></div>
        <spam><b>{`${firstName}${' '}${lastName}`}</b></spam><br/>
        <spam>{emailAddress}</spam>
        <div style={{height:"25px"}}></div>

        <div className={`${checkTrainer=='true' ? 'hide-visibility' : ''}`}>
          <div>
            <h2 style={{marginTop:'40px', marginBottom:'80px'}}>Super Admin</h2>
          </div>
        </div>
        <div className={`${checkTrainer=='true' ? '' : 'hide-visibility'}`}>
          <spam>Contact number: {contactNumberr}</spam><br/>
          <spam>NIC: {nicTrainer}</spam><br/>
          <spam>Date of Birth: {dobTrainer}</spam><br/>
          <div style={{height:"25px"}}></div>
          <div style={{height:"70px", paddingLeft:"10px", paddingRight:"10px"}}><spam>{addressTrainer}</spam><br/></div> 
          <div style={{height:"15px"}}></div>
        </div>

        <Nav.Link as={Link} to="/adminlogin">
          <Button className="btn btn-sm btn-info"><font color="ash">Logout</font></Button>
        </Nav.Link>
        <div style={{height:"15px"}}></div>
      </div>
    )
}

export default AdminProfile;