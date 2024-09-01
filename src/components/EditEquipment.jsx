import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import {MdOutlineClose} from 'react-icons/md';

const EditEquipment = ({ equipment, onClose }) => {
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true)
  const [formData, setFormData] = useState({
    image: '',
    name: '',
    description: '',
    targetmuscle: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update the equipment with the new image file
console.log(formData)
  };

  const handleEnable = () => {
    setIsDisabled(!isDisabled);
  }

  return (
    <div className={`trainee-details ${equipment ? 'show-details' : ''} col-12`}>
      <div className='component-close-button-div col-12'>
        <Button onClick={onClose} className='btn-danger component-close-button'><MdOutlineClose className='close-button-icon'/></Button>
      </div>
      <h2>{equipment?.name}'s Details</h2>
      <Form onSubmit={handleSubmit}>
        <Row className='left-padding form-row'>
          <Col md={5}>
            <Form.Group controlId="description">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={equipment.name}
                onChange={handleChange}
                disabled={isDisabled}
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
                disabled={isDisabled}
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
                value={equipment.description}
                onChange={handleChange}
                style={{ height: '130px' }}
                disabled={isDisabled}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className='left-padding form-row'>
          <Col md={11}>
            <Form.Group controlId="targetmuscle">
              <Form.Label>Target Muscles</Form.Label>
              <Form.Control
                as="textarea"
                name="targetmuscle"
                value={equipment.targetmuscle}
                onChange={handleChange}
                style={{ height: '130px' }}
                disabled={isDisabled}
              />
            </Form.Group>
          </Col>
        </Row>
        
        <Row>
                <Col md={12}>
                    <button variant="" type="button" className='button-secondary button-submit' onClick={handleEnable}>
                      {isDisabled ? 'Enable' : 'Disable'}
                    </button>
                    <button variant="" type="submit" className='button-primary button-submit'>
                    Update
                    </button>
                    <button variant="" type="button" className='button-danger-transparent'>
                    Delete
                    </button>
                </Col>
            </Row>
      </Form>
    </div>
  );
};

export default EditEquipment;
