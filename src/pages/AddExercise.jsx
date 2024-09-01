import React from 'react';
import Navbar from '../components/Navbar';
import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';


const AddExercise = () => {

    const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    image: '',
    name: '',
    description: '',
    targetmuscle: '',
    equipment: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  return (
    <div className="home-container">
      <Navbar/>
      <Container className='container-home'>
        <h3 className='title-div'>NEW EXERCISE</h3>
        <Form onSubmit={handleSubmit}>
        <Row className='left-padding form-row'>
            <Col md={5}>
                <Form.Group controlId="description">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    name="description"
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
                    name="image"
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
                    <Form.Group controlId="description">
                    <Form.Label>Target Muscles</Form.Label>
                    <Form.Control
                        type="text"
                        name="targetmuscle"
                        autoComplete="new-password"
                        value={formData.targetmuscle}
                        onChange={handleChange}
                    />       
                    </Form.Group>
                </Col>
            </Row>
            <Row className='left-padding form-row'>
                <Col md={11}>
                    <Form.Group controlId="description">
                    <Form.Label>Target Muscles</Form.Label>
                    <Form.Control
                        type="text"
                        name="equipment"
                        autoComplete="new-password"
                        value={formData.equipment}
                        onChange={handleChange}
                    />       
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
      </Container>
    </div>
  )
}

export default AddExercise;