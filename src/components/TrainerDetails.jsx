// TrainerDetails.js
import React from 'react';
import './trainerdetails.css';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import {MdOutlineClose} from 'react-icons/md';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from "../utils/api";

const TrainerDetails = ({ trainer, isVisible, onClose }) => {

    const [formData, setFormData] = useState('');
    const [userData, setUserData] = useState('');
    const [isDisabled, setIsDisabled] = useState(true)
    const [err, setErr] = useState("");

    //notifications
   const notifyUpdate=()=>{
    toast.success('Trainer Updated Successfully!', {
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
  const notifyDelete=()=>{
      toast.success('Trainer Deleted Successfully!', {
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
    toast.error('Error in process!', {
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

    useEffect(() => {
      if (trainer) {
        // Filter and set userData
        const { user_id,first_name, last_name, email } = trainer;
        setUserData({ user_id, first_name, last_name, email });
  
        // Filter and set formData
        const { id, address, nic, dob, contact_number, gender } = trainer;
        setFormData({ trainer_id: id, dob, nic, address, contact_number, gender });
      }
    }, [trainer]);
    
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
        // console.log(formData);
        UpdateTrainer(userData, formData);
      };

      const handleDelete = (e) => {
        e.preventDefault();
        DeleteTrainer(userData, formData);
      }

      const handleEnable = () => {
        setIsDisabled(!isDisabled);
      }

      const UpdateTrainer = async () => {
        try {
          // Combine userData and formData into a single object for the update API call
          const query = {
            user: userData,
            trainer: formData,
          };
      
          // Make the API call to update the trainee data
          const response = await API.put(`/trainer?trainer_id=${formData.trainer_id}&user_id=${userData.user_id}`, query);
      
          if (response.status === 200) {
            console.log('Trainer data updated successfully.');
            window.location.replace("/trainers/view");
            notifyUpdate();
          } else {
            console.log('Failed to update trainer data.');
            notifyError();
          }
        } catch (error) {
          console.log('Error updating trainer data:', error);
          notifyError();
        }
      };

      const DeleteTrainer = async () => {
        try {
          const response = await API.delete(`/trainer/:id?trainer_id=${formData.trainer_id}&user_id=${userData.user_id}`);
      
          if (response.status === 200) {
            console.log('Trainer deleted successfully.');
            window.location.replace("/trainers/view");
            notifyDelete();
          } else {
            console.log('Failed to delete trainer.');
            notifyError();
          }
        } catch (error) {
          console.log('Error deleting trainer:', error);
          notifyError();
        }
      };


  return (
    <div className={`trainer-details ${isVisible ? 'show-details' : ''} col-12`}>
      <div className='component-close-button-div col-12'>
        <Button onClick={onClose} className='btn-danger component-close-button'><MdOutlineClose className='close-button-icon'/></Button>
      </div>
      <h2>{trainer?.first_name}'s Details</h2>
        <Form onSubmit={handleSubmit}>
          <Row className='left-padding form-row'>
            <Col md={5}>
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="first_name"
                  className="text-secondary"
                  value={userData.first_name}
                  onChange={handleUserChange}
                  autoComplete="new-password"
                  disabled={isDisabled}
                />
              </Form.Group>
            </Col>
            <Col md={1}></Col>
            <Col md={5}>
              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="last_name"
                  className="text-secondary"
                  value={userData.last_name}
                  onChange={handleUserChange}
                  autoComplete="new-password"
                  disabled={isDisabled}
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
                  value={userData.email}
                  onChange={handleUserChange}
                  autoComplete="new-password"
                  disabled={isDisabled}
                />
              </Form.Group>
            </Col>
            <Col md={1}></Col>
            <Col md={5}>
              <Form.Group controlId="nic">
                <Form.Label>NIC</Form.Label>
                <Form.Control
                  type="text"
                  name="nic"
                  className="text-secondary"
                  value={formData.nic}
                  onChange={handleChange}
                  autoComplete="new-password"
                  disabled={isDisabled}
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
                  disabled={isDisabled}
                />
              </Form.Group>
            </Col>
            <Col md={1}></Col>
            <Col md={5}>
              <Form.Group controlId="contactNumber">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  name="contact_number"
                  className="text-secondary"
                  value={formData.contact_number}
                  onChange={handleChange}
                  autoComplete="new-password"
                  disabled={isDisabled}
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
                  value={formData.address}
                  onChange={handleChange}
                  autoComplete="new-password"
                  disabled={isDisabled}
                />
              </Form.Group>
            </Col>
            <Col md={1}></Col>
            <Col md={5}>
              {/* <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  className="text-secondary"
                  value={trainer.password}
                  onChange={handleChange}
                />
              </Form.Group> */}
            </Col>
          </Row>
        <Row className='button-row-add-trainer'>
          <Col md={12}>
            <button variant="" type="button" className='button-secondary button-submit' onClick={handleEnable}>
                {isDisabled ? 'Enable' : 'Disable'}
            </button>
            <button variant="" type="submit" className='button-primary button-submit' onClick={handleSubmit}>
              Update
            </button>
            <button variant="" type="button" className='button-danger-transparent' onClick={handleDelete}>
              Delete
            </button>
          </Col>
        </Row>
        </Form>
        <ToastContainer/>
    </div>
  );
};

export default TrainerDetails;
