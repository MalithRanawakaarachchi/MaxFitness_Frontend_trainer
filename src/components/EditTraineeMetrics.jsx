// TrainerDetails.js
import React from 'react';
import './trainerdetails.css';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import {MdOutlineClose} from 'react-icons/md';
import API from "../utils/api";

const EditTraineeMetrics = ({ onClose }) => {

    const [formData, setFormData] = useState('');
    const [userData, setUserData] = useState('');
    const [isDisabled, setIsDisabled] = useState(true)
    const [err, setErr] = useState("");

    const isVisible = sessionStorage.getItem('Visible');

    // useEffect(() => {
    //   if (trainer) {
    //     // Filter and set userData
    //     const { user_id,first_name, last_name, email } = trainer;
    //     setUserData({ user_id, first_name, last_name, email });
  
    //     // Filter and set formData
    //     const { id, address, nic, dob, contact_number, gender } = trainer;
    //     setFormData({ trainer_id: id, dob, nic, address, contact_number, gender });
    //   }
    //}, [trainer]);
    
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
            // Handle any success logic here (e.g., show a success message)
          } else {
            console.log('Failed to update trainer data.');
            // Handle any error logic here (e.g., show an error message)
          }
        } catch (error) {
          console.log('Error updating trainer data:', error);
          // Handle any error logic here (e.g., show an error message)
        }
      };

      const DeleteTrainer = async () => {
        try {
          const response = await API.delete(`/trainer/:id?trainer_id=${formData.trainer_id}&user_id=${userData.user_id}`);
      
          if (response.status === 200) {
            console.log('Trainer deleted successfully.');
            window.location.replace("/trainers/view");
          } else {
            console.log('Failed to delete trainer.');
          }
        } catch (error) {
          console.log('Error deleting trainer:', error);
        }
      };


  return (
    <div className={`trainee-details ${isVisible ? 'show-details' : ''} col-12`}>
      <div className='component-close-button-div col-12'>
        <Button onClick={onClose} className='btn-danger component-close-button'><MdOutlineClose className='close-button-icon'/></Button>
      </div>
      <h2>Trainee Metrics</h2>
        <Form onSubmit={handleSubmit}>
          <Row className='left-padding form-row'>
            <Col md={5}>
                <Form.Group controlId="description">
                    <Form.Label>Weight</Form.Label>
                    <Form.Control
                        type="text"
                        name="description"
                        autoComplete="new-password"
                        className="text-secondary"
                        disabled={isDisabled}
                    />       
                </Form.Group>
            </Col>
            <Col md={1}></Col>
            <Col md={5}>
                <Form.Group controlId="description">
                    <Form.Label>Body fat percentage</Form.Label>
                    <Form.Control
                        type="text"
                        name="description"
                        autoComplete="new-password"
                        className="text-secondary"
                        disabled={isDisabled}
                    />       
                </Form.Group>
            </Col>
          </Row>
          <Row className='left-padding form-row'>
            <Col md={5}>
                    <Form.Group controlId="description">
                    <Form.Label>Height</Form.Label>
                    <Form.Control
                        type="text"
                        name="description"
                        autoComplete="new-password"
                        className="text-secondary"
                        disabled={isDisabled}
                    />       
                    </Form.Group>
                </Col>
            <Col md={1}></Col>
            <Col md={5}>
                <Form.Group controlId="description">
                    <Form.Label>Lean body mass</Form.Label>
                    <Form.Control
                        type="text"
                        name="description"
                        autoComplete="new-password"
                        className="text-secondary"
                        disabled={isDisabled}
                    />       
                </Form.Group>
            </Col>
          </Row>
          <Row className='left-padding form-row'>
            <Col md={5}>
                <Form.Group controlId="description">
                    <Form.Label>Body Mass Index (BMI)</Form.Label>
                    <Form.Control
                        type="text"
                        name="description"
                        autoComplete="new-password"
                        className="text-secondary"
                        disabled={isDisabled}
                    />       
                </Form.Group>
            </Col>
            <Col md={1}></Col>
            <Col md={5}>
                <Form.Group controlId="description">
                    <Form.Label>Fat mass</Form.Label>
                    <Form.Control
                        type="text"
                        name="description"
                        autoComplete="new-password"
                        className="text-secondary"
                        disabled={isDisabled}
                    />       
                </Form.Group>
            </Col>
          </Row>
          <Row className='left-padding form-row'>
            <Col md={5}>
                <Form.Group controlId="description">
                    <Form.Label>Waist to hip ratio</Form.Label>
                    <Form.Control
                        type="text"
                        name="description"
                        autoComplete="new-password"
                        className="text-secondary"
                        disabled={isDisabled}
                    />       
                </Form.Group>
            </Col>
            <Col md={1}></Col>
            <Col md={5}>
                <Form.Group controlId="description">
                    <Form.Label>Ideal body weight</Form.Label>
                    <Form.Control
                        type="text"
                        name="description"
                        autoComplete="new-password"
                        className="text-secondary"
                        disabled={isDisabled}
                    />       
                </Form.Group>
            </Col>
          </Row>
          <Row className='left-padding form-row'>
            <Col md={5}>
                <Form.Group controlId="description">
                    <Form.Label>Waist Circumference</Form.Label>
                    <Form.Control
                        type="text"
                        name="description"
                        autoComplete="new-password"
                        className="text-secondary"
                        disabled={isDisabled}
                    />       
                </Form.Group>
            </Col>
            <Col md={1}></Col>
            <Col md={5}>
                <Form.Group controlId="description">
                    <Form.Label>Special Notes</Form.Label>
                    <textarea
                        className="form-control special-notes"
                        id="message"
                        rows="4"
                        disabled={isDisabled}
                    ></textarea>     
                </Form.Group>
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
    </div>
  );
};

export default EditTraineeMetrics;
