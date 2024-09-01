import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './adminLogin.css'
import MFicon from '../images/MFicon.png';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from "../utils/api";

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState("");

  //notifications
  const notifySuccess=()=>{
    toast.success('Successful!', {
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
      toast.error("Username / password is incorrect!", {
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

  const handleLogin = (e) => {
    e.preventDefault();
    Login(username, password);
    }

  const Login = async (username, password) => {
    try {
          const body = {
            email: username,
            password: password,
          };
          const response = await API.post(`/auth/admin/login`, body);
          if (response.status === 200) {
            const first = response.data.user.first_name;
            sessionStorage.setItem('firstName', first);
            const last = response.data.user.last_name;
            sessionStorage.setItem('lastName', last);
            const email = response.data.user.email;
            sessionStorage.setItem('emailAddress', email);
            const level = response.data.user.user_level;
            sessionStorage.setItem('userLevel', level);
            const number = response.data.user.trainer_contact_number;
            sessionStorage.setItem('contactNumber', number);
            const address = response.data.user.trainer_address;
            sessionStorage.setItem('addressTrainer', address);
            const nic = response.data.user.trainer_nic;
            sessionStorage.setItem('nicTrainer', nic);
            const dob = response.data.user.trainer_dob;
            sessionStorage.setItem('dobTrainer', dob);
            const trainer = response.data.user.isTrainer;
            sessionStorage.setItem('checkTrainer', trainer);
            setErr("");
            notifySuccess();
            if(response.data.user.user_level===2000)
            {
              window.location.replace("/DashBoard");
            }
            if(response.data.user.user_level===1000)
            {
              window.location.replace("/trainee/view");
            }
            
          } else {
            setErr("An error occurred while logging in");   
          }
        } catch (error) {
          setErr("Username or password is incorrect");
          notifyError();
          console.log(error);
        }
    };

  // const getMe = async () => {
  //   try {
  //     const res = await API.get(`/me`);
  //     const data = await res.data;
  //     window.location.replace("/trainee/view");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getMe();
  // }, []);

  return (
    <Container fluid className="h-100 login-background">
      <div className='empty-div topic'>
        <div className=''>
          <img src={MFicon} alt="" className='justify-content-center logo-img-login'/> 
        </div> 
         <h1>MAX FITNESS CENTER</h1>
         <b><font size="5">Admin Login Portal</font></b>
      </div>
      <div className=''>
        
       <Row>
        <Col xs={0} md={3} sm={1} xl={3}>
          <div className=" p-2 mb-2"></div>
        </Col>
        <Col xs={12} md={6} xl={6} >
          <Row>
            <Col xs={0} xl={1}></Col>
            <Col >
            <div className="card p-5 col-xl-12 form-style">
              
                  <Form >
                      <Row>
                          <Col xs={0} md={1} sm={1} lg={1} xl={1}></Col>
                          <Col>
                              <Form.Group className="mb-2" controlId="username">
                                <div className='text-left text-margin2'><b>Username</b></div>
                                <Form.Control className='text-box' autoComplete="new-password" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                              </Form.Group>

                              <Form.Group className="mb-3" controlId="password">
                                <div className='text-left text-margin'><b>Password</b></div>
                                <Form.Control 
                                  className='text-box' 
                                  type="password" 
                                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=\-+]).{8,12}$"
                                  onChange={(e) => setPassword(e.target.value)}
                                  required
                                  />
                              </Form.Group>

                              <small style={{ color: "red" }}></small>
                              <div className='content-right'>
                                  <Button className='b-login-size btn btn-sm b-success login-button-margin' variant="primary" onClick={handleLogin}>
                                      <b>Login</b>
                                  </Button>
                              </div>
                          </Col>
                          <Col xs={0} md={1} sm={1} lg={1} xl={1}></Col>
                      </Row>
                  </Form>
                  <div style={{textAlign:"center", margin:"20px 0px -25px 0px"}}><a href="">forgot password ?</a></div>                 
            </div>
            </Col>
            <Col xs={0} xl={1}></Col>
          </Row>
        </Col>
        <Col xs={0} md={3} xl={3}>
          <div className=" p-2 mb-2"></div>
        </Col>
      </Row>
      <div style={{height:"153px"}}></div>
      </div>
      <ToastContainer/>
    </Container>
  );
};

export default AdminLogin;
