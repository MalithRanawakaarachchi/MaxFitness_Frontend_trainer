import React from 'react';
import './addManualSchedule.css';
import Navbar from '../components/Navbar';
import { Container, Table, Row, Col, Form, Button, Nav } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import API from "../utils/api";

const AddManualSchedule = ({userLevel}) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [trainee, setTrainee] = useState([]);
    const [searchData, setSearchData] = useState({
        nic: '',
        first_name: '',
        last_name: '',
        contact_number: '',
        user_id: '',
        exercise: '',
        target: '',
        equipment: '',
        sets: '',
        reps: '',
        rest: '',
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

      const [err, setErr] = useState("");
    
      const handleSubmit = async (e) => {
        e.preventDefault();

        const scheduleData = {
            user_id: searchData.user_id,
            exercise: searchData.exercise,
            target: searchData.target,
            equipment: searchData.equipment,
            sets: searchData.sets,
            reps: searchData.reps,
            rest: searchData.rest,
          };
        NewSchedule(scheduleData);
      };

        const NewSchedule = async (scheduleData) => {
            try {
            const body = {
                schedule: scheduleData,
            };
            console.log('show:', body)
            await API.post('/schedule', body);
            setErr('');
            window.location.replace('/schedules/add');
            } catch (error) {
            setErr('Process failed !!!');
            console.log(error);
            }
        };
        
    useEffect(() => {
        NewSchedule();
      }, []);

return(
    <div className="home-container">
      <Navbar/>
      <Container className='container-home'>
        <h3 className='title-div'>ADD MANUAL SCHEDULE</h3>
        <Form onSubmit={handleSubmit}>

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
                  className="text-secondary"
                  autoComplete="new-password"
                  value={searchData.last_name}
                />
              </Form.Group>
            </Col>
            
          </Row>
          
          <Row className='left-padding form-row'>
            <Col md={5}>
            <Form.Group controlId="exercise">
                <Form.Label>Exercise</Form.Label>
                <Form.Select
                  name="exercise"
                  value={searchData.exercise}
                  onChange={handleSearchChange}
                >
                  <option value="">Select Exercise</option>
                  <option value="Arnold-presses">Arnold-presses</option>
                  <option value="Diamond push-ups">Diamond push-ups</option>
                  <option value="Weighted dips">Weighted dips</option>
                  <option value="Single-arm Dumbbell rows">Single-arm Dumbbell rows</option>
                  <option value="Supinated close-grip pull-ups">Supinated close-grip pull-ups</option>
                  <option value="Ab Wheels">Ab Wheels</option>
                  <option value="Glute Bridges">Glute Bridges</option>
                  <option value="Vacuum Holds">Vacuum Holds</option>
                  <option value="Side Plankss">Side Plankss</option>
                  <option value="Lat Pulldowns">Lat Pulldowns</option>
                  <option value="Pull-ups">Pull-ups</option>
                  <option value="Rack Pulls">Rack Pulls</option>
                  <option value="Supermans">Supermans</option>
                  <option value="Russian Kettlebell Swings">Russian Kettlebell Swings</option>
                  <option value="Barbell Good Mornings">Barbell Good Mornings</option>
                  <option value="Dumbbell Fly">Dumbbell Fly</option>
                  <option value="maDumbbell Chest Pressle">Dumbbell Chest Press</option>
                  <option value="One-Arm Dumbbell Chest Press">One-Arm Dumbbell Chest Press</option>
                  <option value="One-Arm Dumbbell Fly">One-Arm Dumbbell Fly</option>
                  <option value="Leg Press Machine Variations">Leg Press Machine Variations</option>
                  <option value="Diamond push-upss">Diamond push-upss</option>
                  <option value="Single-Leg Leg Extensions">Single-Leg Leg Extensions</option>
                  <option value="Inward Pointing Leg Extensions">Inward Pointing Leg Extensions</option>
                  <option value="Front Raises">Front Raises</option>
                  <option value="Bench Press">Bench Press</option>
                  <option value="Barbell Upright Row">Barbell Upright Row</option>
                  <option value="Barbell Overhead Press">Barbell Overhead Press</option>
                  <option value="Supported Incline Dumbbell Rows">Supported Incline Dumbbell Rows</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md="1"></Col>
            <Col md={5}>
            <Form.Group controlId="target">
                <Form.Label>Target Muscle</Form.Label>
                <Form.Select
                  name="target"
                  value={searchData.target}
                  onChange={handleSearchChange}
                >
                  <option value="">Select Muscle</option>
                  <option value="Arms">Arms</option>
                  <option value="Legs">Legs</option>
                  <option value="Chest">Chest</option>
                  <option value="Shoulders">Shoulders</option>
                  <option value="Abs">Abs</option>
                  <option value="Back">Back</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className='left-padding form-row'>
            <Col md={5}>
            <Form.Group controlId="gender">
                <Form.Label>Equipment</Form.Label>
                <Form.Select
                  name="equipment"
                  value={searchData.equipment}
                  onChange={handleSearchChange}
                >
                  <option value="">Select Equipment</option>
                  <option value="Squat Rack">Squat Rack</option>
                  <option value="Bench Press">Bench Press</option>
                  <option value="Barbells">Barbells</option>
                  <option value="Cabled And Pulleys">Cabled And Pulleys</option>
                  <option value="Dumbbels">Dumbbels</option>
                  <option value="Pullup bar">Pullup bar</option>
                  <option value="Leg Extension Machine">Leg Extension Machine</option>
                  <option value="Dipping Bars">Dipping Bars</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md="1"></Col>
            <Col md={5}>
              <Form.Group controlId="sets">
                <Form.Label>SETS</Form.Label>
                <Form.Control
                  type="text"
                  name="sets"
                  className="text-secondary"
                  autoComplete="new-password"
                  value={searchData.sets}
                  onChange={handleSearchChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className='left-padding form-row'>
            <Col md={5}>
              <Form.Group controlId="reps">
                <Form.Label>REPS</Form.Label>
                <Form.Control
                  type="text"
                  name="reps"
                  className="text-secondary"
                  autoComplete="new-password"
                  value={searchData.reps}
                  onChange={handleSearchChange}
                />
              </Form.Group>
            </Col>
            <Col md="1"></Col>
            <Col md={5}>
              <Form.Group controlId="rest">
                <Form.Label>REST</Form.Label>
                <Form.Control
                  type="text"
                  name="rest"
                  className="text-secondary"
                  autoComplete="false"
                  value={searchData.rest}
                  onChange={handleSearchChange}
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
      </Container>
    </div>
)

};

export default AddManualSchedule;
