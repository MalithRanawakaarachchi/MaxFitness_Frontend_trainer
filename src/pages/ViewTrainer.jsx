import React from 'react'
import './viewtrainer.css';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import { Container, Table, Form, Button } from 'react-bootstrap';
import TrainerDetails from '../components/TrainerDetails';
import API from "../utils/api";

const ViewTrainer = () => {

  const [isTrainerDetailsVisible, setIsTrainerDetailsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [trainer, setTrainer] = useState([]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTrainer = trainer.filter((trainer) => {
    const first_name = trainer.first_name ? trainer.first_name.toLowerCase() : '';
    const last_name = trainer.last_name ? trainer.last_name.toLowerCase() : '';
    const email = trainer.email ? trainer.email.toLowerCase() : '';
    const contact_number = trainer.contact_number ? trainer.contact_number.toLowerCase() : '';
  
    return (
      first_name.includes(searchTerm.toLowerCase()) ||
      last_name.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase()) ||
      contact_number.includes(searchTerm)
    );
  });

  const handleViewDetails = (trainer) => {
    setSelectedTrainer(trainer);
    setIsTrainerDetailsVisible(true);
  };

  const handleCloseDetails = () => {
    setSelectedTrainer(null);
    setIsTrainerDetailsVisible(false);
  };

  useEffect(() => {
    const fetchTrainerData = async () => {
      try {
        const res = await API.get('/trainer');
        if (res.status === 200) {
          setTrainer(res.data);
          console.log(res.data)
        }
      } catch (error) {
        console.log('Error fetching trainer data:', error);
      }
    };

    fetchTrainerData();
  }, []);


  return (
    <div className="home-container">
      <Navbar/>
      <Container fluid className='container-home'>
        <h1 className='title-div'>Trainer List</h1>
        
        <Form.Group controlId="search" lg={5} className='col-5 searc-bar'>
          <Form.Control
            type="text"
            placeholder="Search trainers by name, email, or contact number..."
            value={searchTerm}
            autoComplete="new-password"
            onChange={handleSearch}
          />
        </Form.Group>
        <div className="table-container">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Contact Number</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrainer.map((trainer) => (
                <tr key={trainer.id} className='tr-height table-column-data lower-text'>
                  <td align='left'>{trainer.first_name}{' '}{trainer.last_name}</td>
                  <td align='left'>{trainer.email}</td>
                  <td align='left'>{trainer.address}</td>
                  <td>{trainer.contact_number}</td>
                  <td>
                    <Button variant="primary" size="sm" onClick={() => handleViewDetails(trainer)}>
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {selectedTrainer && (
          <TrainerDetails trainer={selectedTrainer} isVisible={isTrainerDetailsVisible} onClose={handleCloseDetails} />
        )}

      </Container>
    </div>
  )
}

export default ViewTrainer;