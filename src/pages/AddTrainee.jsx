import React from 'react';
import './addtrainee.css';
import Navbar from '../components/Navbar';
import { useState } from 'react';
import { Container, Row, Col, Form, Button, Nav } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from "../utils/api";


const AddTrainee = () => {

  const userlevel = '100';
  const [err, setErr] = useState("");
  const [formData, setFormData] = useState({
    nic: '',
    dob: '',
    contact_number: '',
    address: '',
    gender: '',
  });
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    user_level: userlevel,
  })

   //notifications
   const notifySuccess=()=>{
    toast.success('Trainee Added Successfully!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
  }
  const notifyError=()=>{
      toast.error('Error in add trainee!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData,userData)
    NewTrainee(userData, formData);
  };

  const NewTrainee = async (userData, formData) => {
    try {
      const body = {
        user: userData,
        trainee: formData,
      };
      const res = await API.post(`/trainee`, body);
      if(res.status === 200)
      {
        setErr("");
        window.location.replace("/trainee/view");
        notifySuccess();
      }
    } catch (error) {
      setErr("Process faild !!!");
      console.log(error);
      notifyError();
    }
  };

  return (
    <div className="home-container">
      <Navbar/>
      <Container className='container-home'>
        <h3 className='title-div'>NEW TRAINEE</h3>
        <Form onSubmit={handleSubmit}>
          <Row className='left-padding form-row'>
            <Col md={5}>
              <Form.Group controlId="first_name">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="first_name"
                  autoComplete="new-password"
                  className="text-secondary"
                  value={userData.first_name}
                  onChange={handleUserChange}
                />
              </Form.Group>
            </Col>
            <Col md="1"></Col>
            <Col md={5}>
              <Form.Group controlId="last-name">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="last_name"
                  autoComplete="new-password"
                  className="text-secondary"
                  value={userData.last_name}
                  onChange={handleUserChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className='left-padding form-row'>
            <Col md={5}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  autoComplete="new-password"
                  className="text-secondary"
                  value={userData.email}
                  onChange={handleUserChange}
                />
              </Form.Group>
            </Col>
            <Col md="1"></Col>
            <Col md={5}>
              <Form.Group controlId="nic">
                <Form.Label>NIC</Form.Label>
                <Form.Control
                  type="text"
                  name="nic"
                  autoComplete="new-password"
                  className="text-secondary"
                  value={formData.nic}
                  onChange={handleChange}
                />
            </Form.Group>
            </Col>
          </Row>
          <Row className='left-padding form-row'>
            <Col md={5}>
              <Form.Group controlId="dob">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  autoComplete="new-password"
                  className="text-secondary"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md="1"></Col>
            <Col md={5}>
              <Form.Group controlId="contact_number">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  name="contact_number"
                  autoComplete="new-password"
                  className="text-secondary"
                  value={formData.contact_number}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className='left-padding form-row'>
            <Col md={5}>
              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="address"
                  autoComplete="new-password"
                  className="text-secondary"
                  value={formData.address}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md="1"></Col>
            <Col md={5}>
              <Form.Group controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="password" className='password-group'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  autoComplete="false"
                  className="text-secondary"
                  value={userData.password}
                  onChange={handleUserChange}
                />
              </Form.Group>
            </Col>
          </Row>
        <Row className='button-row'>
          <Col md={1} style={{marginRight:"-10px"}}>
            <Button variant="primary" type="submit" className='button-submit submit-button'>
              Submit
            </Button>
          </Col>
          <Col md={1} style={{marginLeft:"-10px"}}>
            <Nav.Link as={Link} to="/trainee/view">
              <Button variant="bg-light" type="button" className='cancel-button'>
                Cancel
              </Button>
            </Nav.Link>
          </Col>
        </Row>
        </Form>
        <ToastContainer/>
      </Container>
    </div>
  )
}

export default AddTrainee;