import React from 'react';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import EditTraineeMetrics from '../components/EditTraineeMetrics';
import API from "../utils/api";


const ViewTraineeMetrics = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [trainee, setTrainee] = useState([]);
    const [metrics, setMetrics] = useState([]);
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
        const fetchMetricsData = async () => {
            try { 
                console.log(searchData.user_id)
                const res = await API.get(`/metrics/${searchData.user_id}`);       
                if (res.status === 200) {
                    setMetrics(res.data);
                }
            } catch (error) {
                console.log('Error fetching schedule data:', error);
            }
        };
    
        if (searchData.user_id !== '') {
            fetchMetricsData();
          }
      }, [searchData.user_id]);

  return (
    <div className="home-container">
      <Navbar/>
      <Container className='container-home'>
        <h1 className='title-div'>View Trainee Metrics</h1>
        <div className="scrollable-container main-div-metrics">
        <div className='upper-div-metrics'>
            <Row className='left-padding form-row'>
                <Col md={5}>
                    <Form.Group controlId="search" className='searc-bar'>
                    <Form.Control
                        type="text"
                        placeholder="Search trainee by name or NIC"
                        value={searchTerm}
                        className="text-secondary"
                        autoComplete="new-password"
                        onChange={handleSearch}
                        onKeyPress={handleEnterKeyPress}
                    />
                    </Form.Group>
                </Col>
                <Col md={2}></Col>
                    <Col md={5}>
                        
                    </Col>
                <Col md={6}>    
                    
                
                </Col>
            </Row>
            <Row className='left-padding form-row' style={{marginTop:-30}}>
                    <Col md={5}>
                        <Form.Group controlId="description">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            autoComplete="new-password"
                            className="text-secondary"
                            value={`${searchData.first_name} ${searchData.last_name}`}
                        />       
                        </Form.Group>
                    </Col>
                    <Col md={2}></Col>
                    <Col md={5}>
                        <Form.Group controlId="description">
                        <Form.Label>NIC</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            autoComplete="new-password"
                            value={searchData.nic}
                            className="text-secondary"
                        />       
                        </Form.Group>
                    </Col>
            </Row>
        </div>
        
        <Form>
            
            <Row className='left-padding form-row'>
                <Col md={5}>
                {metrics.map((metrics) => (
                    <Form.Group controlId="description">
                    <Form.Label>Weight</Form.Label>
                    <Form.Control
                        type="text"
                        name="description"
                        autoComplete="new-password"
                        value={metrics.weight}
                    />       
                    </Form.Group>
                ))}
                </Col>
                <Col md={2}></Col>
                <Col md={5}>
                {metrics.map((metrics) => (
                    <Form.Group controlId="description">
                    <Form.Label>Body fat percentage</Form.Label>
                    <Form.Control
                        type="text"
                        name="description"
                        autoComplete="new-password"
                        value={metrics.bfp}
                    />       
                    </Form.Group>
                ))}
                </Col>
            </Row>
            <Row className='left-padding form-row'>
                <Col md={5}>
                {metrics.map((metrics) => (
                    <Form.Group controlId="description">
                    <Form.Label>Height</Form.Label>
                    <Form.Control
                        type="text"
                        name="description"
                        autoComplete="new-password"
                        value={metrics.height}
                    />       
                    </Form.Group>
                ))}
                </Col>
                <Col md={2}></Col>
                <Col md={5}>
                {metrics.map((metrics) => (
                    <Form.Group controlId="description">
                    <Form.Label>Lean body mass</Form.Label>
                    <Form.Control
                        type="text"
                        name="description"
                        autoComplete="new-password"
                        value={metrics.lbm}
                    />       
                    </Form.Group>
                ))}
                </Col>
            </Row>
            <Row className='left-padding form-row'>
                <Col md={5}>
                {metrics.map((metrics) => (
                    <Form.Group controlId="description">
                    <Form.Label>Body Mass Index (BMI)</Form.Label>
                    <Form.Control
                        type="text"
                        name="description"
                        autoComplete="new-password"
                        value={metrics.bmi}
                    />       
                    </Form.Group>
                ))}
                </Col>
                <Col md={2}></Col>
                <Col md={5}>
                {metrics.map((metrics) => (
                    <Form.Group controlId="description">
                    <Form.Label>Fat mass</Form.Label>
                    <Form.Control
                        type="text"
                        name="description"
                        autoComplete="new-password"
                        value={metrics.fat_mass}
                    />       
                    </Form.Group>
                ))}
                </Col>
            </Row>
            <Row className='left-padding form-row'>
                <Col md={5}>
                {metrics.map((metrics) => (
                    <Form.Group controlId="description">
                    <Form.Label>Waist to hip ratio</Form.Label>
                    <Form.Control
                        type="text"
                        name="description"
                        autoComplete="new-password"
                        value={metrics.whr}
                    />       
                    </Form.Group>
                ))}
                </Col>
                <Col md={2}></Col>
                <Col md={5}>
                {metrics.map((metrics) => (
                    <Form.Group controlId="description">
                    <Form.Label>Ideal body weight</Form.Label>
                    <Form.Control
                        type="text"
                        name="description"
                        autoComplete="new-password"
                        value={metrics.ideal_body_weight}
                    />       
                    </Form.Group>
                ))}
                </Col>
            </Row>
            <Row className='left-padding form-row'>
                <Col md={5}>
                {metrics.map((metrics) => (
                    <Form.Group controlId="description">
                    <Form.Label>Blood group</Form.Label>
                    <Form.Control
                        type="text"
                        name="description"
                        autoComplete="new-password"
                        value={metrics.blood_group}
                    />       
                    </Form.Group>
                ))}
                </Col>
                <Col md={2}></Col>
                <Col md={5}>
                {metrics.map((metrics) => (
                    <Form.Group controlId="description">
                    <Form.Label>Waist Circumference</Form.Label>
                    <Form.Control
                        type="text"
                        name="description"
                        autoComplete="new-password"
                        value={metrics.waist_circumference}
                    />       
                    </Form.Group>
                ))}
                </Col>
            </Row>
            <Row className='left-padding form-row'>
                <Col md={12}>
                {metrics.map((metrics) => (
                    <Form.Group controlId="description">
                    <Form.Label>Special Notes</Form.Label>
                    <textarea
                        className="form-control special-notes"
                        id="message"
                        rows="4"
                        value={metrics.special_notes}
                    ></textarea>     
                    </Form.Group>
                ))}
                </Col>   
            </Row>   
            <Row className='left-padding form-row'>
                <Col md={12} style={{textAlign:'right'}}>
                    <button variant="" type="submit" className='button-secondary button-submit'>
                        Update
                    </button>
                </Col>
            </Row>         
        </Form>
        </div>
        {/* {selectedMetrics && (
          <EditTraineeMetrics trainee={selectedMetrics} onClose={handleCloseDetails} />
        )} */}
      </Container>
    </div>
  )
}

export default ViewTraineeMetrics;