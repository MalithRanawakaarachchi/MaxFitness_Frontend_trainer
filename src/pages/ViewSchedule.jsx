import React from 'react';
import './addManualSchedule.css';
import Navbar from '../components/Navbar';
import { Container, Table, Row, Col, Form, Button, Nav } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import API from "../utils/api";

const ViewSchedule = ({userLevel}) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [trainee, setTrainee] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [searchData, setSearchData] = useState({
        nic: '',
        first_name: '',
        last_name: '',
        contact_number: '',
        user_id: '',
      });
  
    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchData({ ...searchData, [e.target.name]: e.target.value });
      };

      const handleEnterKeyPress = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const selectedTrainee = filteredTrainee[0]; // Assuming you want the first match
          if (selectedTrainee) {
            setSearchData({
              nic: selectedTrainee.nic || '',
              first_name: selectedTrainee.first_name || '',
              last_name: selectedTrainee.last_name || '',
              contact_number: selectedTrainee.contact_number || '',
              user_id: selectedTrainee.user_id || '',
            });
          }
        }
      };
  
        const filteredTrainee = trainee.filter((trainee) => {
        const first_name = trainee.first_name ? trainee.first_name.toLowerCase() : '';
        const last_name = trainee.last_name ? trainee.last_name.toLowerCase() : '';
        const nic = trainee.nic ? trainee.nic.toLowerCase() : '';
        const contact_number = trainee.contact_number ? trainee.contact_number.toLowerCase() : '';
        const user_id = trainee.user_id ? trainee.user_id.toLowerCase() : '';
  
        return (
          first_name.includes(searchTerm.toLowerCase()) ||
          last_name.includes(searchTerm.toLowerCase()) ||
          nic.includes(searchTerm.toLowerCase()) ||
          contact_number.includes(searchTerm.toLowerCase()) ||
          user_id.includes(searchTerm.toLowerCase())
        );
    });

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


      useEffect(() => {
        const fetchScheduleData = async () => {
          try {
            const res = await API.get(`/schedule/${searchData.user_id}`);    
            if (res.status === 200) {
              setSchedule(res.data);
            }
          } catch (error) {
            console.log('Error fetching schedule data:', error);
          }
        };
    
        if (searchData.user_id !== '') {
          fetchScheduleData();
        }
      }, [searchData.user_id]);



return(
    <div className="home-container">
      <Navbar/>
      <Container className='container-home'>
        <h3 className='title-div'>View Schedules</h3>
        <Form>

        <Row className='left-padding form-row'>
            <Col md={5}>
                <Form.Group controlId="search" lg={5}>
                <Form.Control
                    type="text"
                    name="search"
                    placeholder="Search trainees by name, NIC or contact number..."
                    value={searchTerm}
                    className="text-secondary"
                    autoComplete="new-password"
                    onChange={handleSearch}
                    onKeyPress={handleEnterKeyPress}
                />
                </Form.Group>
            </Col>
            <Col md={6}>    
                <Button variant="primary" onClick={handleEnterKeyPress}>
                    Search
                </Button>
                
            </Col>
        </Row>
        <div className="scrollable-container-schedule" style={{marginTop:-35}}>
        <Row className='left-padding form-row'>
        
            <Col md={5}>
              <Form.Group controlId="nic">
                <Form.Label>NIC Number</Form.Label>
                <Form.Control
                  type="text"
                  name="nic"
                  className="text-secondary"
                  autoComplete="new-password"
                  value={searchData.nic}
                />
              </Form.Group>
            </Col>
            <Col md="1"></Col>
            <Col md={5}>
              <Form.Group controlId="user_id">
                <Form.Control
                  type="hidden"
                  name="user_id"
                  className="text-secondary"
                  autoComplete="new-password"
                  value={searchData.user_id}
                  onChange={handleSearchChange}
                  onKeyPress={handleEnterKeyPress}
                />
              </Form.Group>
            </Col>
            
          </Row>
          <Row className='left-padding form-row'>
            <Col md={5}>
              <Form.Group controlId="first_name">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="first_name"
                  className="text-secondary"
                  autoComplete="new-password"
                  value={searchData.first_name}
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
                  className="text-secondary "
                  autoComplete="new-password"
                  value={searchData.last_name}
                />
              </Form.Group>
            </Col>
            
          </Row>
          
          <Row className='left-padding form-row'>
          <Col md={11}>
            <div>
              <div style={{height:50}}></div>
              
                <Table striped bordered hover>
                  <thead >
                    <tr>
                      <th>Exercise</th>
                      <th>Target</th>
                      <th>Equipment</th>
                      <th>SETS</th>
                      <th>REPS</th>
                      <th>REST</th>
                      <th>VIEW</th>
                    </tr>
                  </thead>
                  <tbody>
                  {schedule.map((scheduleItem) => (
                      <tr key={scheduleItem.id} className='tr-height table-column-data lower-text'>
                        <td align='left'>{scheduleItem.exercise}</td>
                        <td align='left'>{scheduleItem.target}</td>
                        <td align='left'>{scheduleItem.equipment}</td>
                        <td>{scheduleItem.sets}</td>
                        <td>{scheduleItem.reps}</td>
                        <td>{scheduleItem.rest}</td>
                        <td>
                          <Button variant="primary" size="sm">
                              View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              
            </div>
            </Col>
        </Row>
        </div>
        </Form>
      </Container>
    </div>
)

};

export default ViewSchedule;
