import React from 'react';
import './addtrainer.css';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Nav } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from "../utils/api";



const AddTrainer = () => {

  const userlevel = '1000';
  const [err, setErr] = useState("");
  const [formData, setFormData] = useState({
    nic: '',
    dob: '',
    contact_number: '',
    address: '',
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
      toast.success('Trainer Added Successfully!', {
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
      toast.error('Error in add trainer!', {
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
    NewTrainer(userData, formData);
  };

  const NewTrainer = async (userData, formData) => {
    // console.log(process.env.REACT_APP_API_URL)
    try {
      const body = {
        user: userData,
        trainer: formData,
      };
      const res = await API.post(`/trainer`, body);
      if(res.status === 200){
        setErr("");
        window.location.replace("/trainers/view");
        notifySuccess();
      }
      
    } catch (error) {
      setErr("Process faild !!!");
      console.log(error);
      notifyError();
    }
  };

  


  // const getMe = async () => {
  //   try {
  //     const res = await API.get(`/me`);
  //     const data = await res.data;
  //     window.location.replace("/adminlogin");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getMe();
  // }, []);

  return (
    <div className="home-container">
      <Navbar/>
      <Container className='container-home'>
        <h3 className='title-div'>NEW TRAINER</h3>
        <Form onSubmit={handleSubmit}>
          <Row className='left-padding form-row'>
            <Col md={5}>
              <Form.Group controlId="first_name">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="first_name"
                  className="text-secondary"
                  autoComplete="new-password"
                  value={userData.first_name}
                  onChange={handleUserChange}
                />
              </Form.Group>
            </Col>
            <Col md="1"></Col>
            <Col md={5}>
              <Form.Group controlId="last_name">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="last_name"
                  className="text-secondary"
                  autoComplete="new-password"
                  value={userData.last_name}
                  onChange={handleUserChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className='left-padding form-row'>
            <Col md={5}>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  className="text-secondary"
                  autoComplete="new-password"
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
                  className="text-secondary"
                  autoComplete="new-password"
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
                  className="text-secondary"
                  autoComplete="new-password"
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
                  className="text-secondary"
                  autoComplete="new-password"
                  value={formData.address}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md="1"></Col>
            <Col md={5}>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  className="text-secondary"
                  autoComplete="false"
                  value={userData.password}
                  onChange={handleUserChange}
                />
              </Form.Group>
            </Col>
          </Row>
        <Row className='button-row-add-trainer'>
          <Col md={1} style={{marginRight:"-10px"}}>
            <Button variant="primary" type="submit" className='button-submit submit-button'>
              Submit
            </Button>
          </Col>
          <Col md={1} style={{marginLeft:"-10px"}}>
            <Nav.Link as={Link} to="/trainer/view">
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

export default AddTrainer;