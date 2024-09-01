import React from 'react'
import './viewtrainee.css';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import { Container, Table, Form, Button } from 'react-bootstrap';
import TraineeDetails from '../components/TraineeDetails';
import API from "../utils/api";

const ViewTrainee = ({userLevel}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTrainee, setSelectedTrainee] = useState(null);
  const [trainee, setTrainee] = useState([]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

      const filteredTrainee = trainee.filter((trainee) => {
      const first_name = trainee.first_name ? trainee.first_name.toLowerCase() : '';
      const last_name = trainee.last_name ? trainee.last_name.toLowerCase() : '';
      const email = trainee.email ? trainee.email.toLowerCase() : '';
      const contact_number = trainee.contact_number ? trainee.contact_number.toLowerCase() : '';

      return (
        first_name.includes(searchTerm.toLowerCase()) ||
        last_name.includes(searchTerm.toLowerCase()) ||
        email.includes(searchTerm.toLowerCase()) ||
        contact_number.includes(searchTerm)
      );
  });



  const handleViewDetails = (trainee) => {
    setSelectedTrainee(trainee);
  };

  const handleCloseDetails = () => {
    setSelectedTrainee(null);
  };

  useEffect(() => {
    const fetchTraineeData = async () => {
      try {
        const res = await API.get('/trainee');
        if (res.status === 200) {
          setTrainee(res.data);
        }
      } catch (error) {
        console.log('Error fetching trainee data:', error);
      }
    };

    fetchTraineeData();
  }, []);

  return (
    <div className="home-container">
      <Navbar/>
      <Container fluid className='container-home'>
        <h1 className='title-div'>Trainee List</h1>
        
        <Form.Group controlId="search" lg={5} className='col-5 searc-bar'>
          <Form.Control
            type="text"
            placeholder="Search trainees by name, email, or contact number..."
            value={searchTerm}
            autoComplete="new-password"
            onChange={handleSearch}
          />
        </Form.Group>
        <div className="table-container">
          <Table striped bordered hover >
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Contact Number</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody >
              {filteredTrainee.map((trainee) => (
                <tr key={trainee.id} className='tr-height-trainee table-column-data lower-text'>
                  <td align='left'>{trainee.first_name}{' '}{trainee.last_name}</td>
                  <td align='left'>{trainee.email}</td>
                  <td align='left'>{trainee.address}</td>
                  <td>{trainee.contact_number}</td>
                  <td>
                    <Button variant="primary" size="sm" onClick={() => handleViewDetails(trainee)}>
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {selectedTrainee && (
          <TraineeDetails trainee={selectedTrainee} onClose={handleCloseDetails} />
        )}
      </Container>
    </div>
  )
}

export default ViewTrainee;