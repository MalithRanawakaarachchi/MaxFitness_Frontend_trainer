import React from 'react';
import Navbar from '../components/Navbar';
import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTrainer = () => {

    const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    muscles_used: '',
  });

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
    toast.error('Error in schedule!', {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('formData:',formData);
    // console.log('selectedImage',selectedImage);
    const sequipment = {
      name: formData.name,
      description: formData.description,
      muscles_used: formData.muscles_used,
      gif: selectedImage.file,
    };
    console.log('data:',sequipment);
    notifySuccess();
    // window.location.replace("/equipment/view");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  return (
    <div className="home-container">
      <Navbar/>
      <Container className='container-home'>
        <h3 className='title-div'>NEW EQUIPMENT</h3>
        <Form onSubmit={handleSubmit}>
        <Row className='left-padding form-row'>
            <Col md={5}>
                <Form.Group controlId="description">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    autoComplete="new-password"
                    value={formData.name}
                    onChange={handleChange}
                />       
                </Form.Group>
            </Col>
            <Col md={1}></Col>
            <Col md={5}>
                <Form.Group controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control
                    type="file"
                    name="gif"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                </Form.Group>
            </Col>
            </Row>
            <Row className='left-padding form-row'>
            <Col md={11}>
                <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    style={{ height: '130px' }}
                />
                </Form.Group>
            </Col>
            </Row>
            <Row className='left-padding form-row'>
            <Col md={11}>
                <Form.Group controlId="muscleSelect" className='selection-bars'>
                    <Form.Control
                        as="select"
                        className='form-control list-box'
                        value={formData.muscles_used}
                        onChange={handleChange}
                        name="muscles_used"
                        >
                          <option value="">- Select Target Muscle</option>
                          <option value="Arms">Arms</option>
                          <option value="Legs">Legs</option>
                          <option value="Chest">Chest</option>
                          <option value="Shoulders">Shoulders</option>
                          <option value="Abs">Abs</option>
                          <option value="Back">Back</option>
                    </Form.Control>
                </Form.Group>
            </Col>
        </Row>
        <Row className='button-row-add-eqp'>
          <Col md={3}>
            <Button variant="primary" type="submit" className='button-submit submit-button'>
              Submit
            </Button>
            <Button variant="bg-light" type="button" className='cancel-button'>
              Cancel
            </Button>
          </Col>
        </Row>
        </Form>
        <ToastContainer/>
      </Container>
    </div>
  )
}

export default AddTrainer;