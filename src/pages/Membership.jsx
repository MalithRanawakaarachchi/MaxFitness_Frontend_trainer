import React from 'react';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import EditTraineeMetrics from '../components/EditTraineeMetrics';
import API from "../utils/api";
import './membership.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const ViewTraineeMetrics = () => {

    const [err, setErr] = useState("");
    const [searchTerm, setSearchTerm] = useState('');
    const [trainee, setTrainee] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [searchData, setSearchData] = useState({
        nic: '',
        first_name: '',
        last_name: '',
        contact_number: '',
        user_id: '',
        email: '',
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
              email: selectedTrainee.email || '',
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
        const email = trainee.email ? trainee.email.toLowerCase() : '';
  
        return (
          first_name.includes(searchTerm.toLowerCase()) ||
          last_name.includes(searchTerm.toLowerCase()) ||
          nic.includes(searchTerm.toLowerCase()) ||
          contact_number.includes(searchTerm.toLowerCase()) ||
          user_id.includes(searchTerm.toLowerCase())||
          email.includes(searchTerm.toLowerCase())
        );
    });

    const handleSuccess =()=>{
        MySwal.fire({
            icon: 'success',
            title: 'Payment was successful',
            time: 4000,
            
        });
      }
    
      const handleError =()=>{
        MySwal.fire({
            icon: 'error',
            title: 'Transaction faild !!!',
            time: 4000,
        });
      }

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

      const handleSubmit = async (e) => {
        e.preventDefault();
        const balance = e.target.amount.value;
        PayNow(balance);
      };

      const PayNow = async (balance) => {
        try {
        const body = {
            payments: {
                user_id: searchData.user_id,
                amount: balance,
                method: 'Cash',
                type: 'Registration Fee',
                added_time: new Date().toLocaleTimeString('en-US', { hour12: false }),
                first_name: searchData.first_name,
                last_name: searchData.last_name,
                email: searchData.email,
            },  
        };
        console.log('show:', body)
        const response = await API.post('/payments', body);
        setErr('');
        window.location.replace('/trainee/membership');

        if(response.status == 200){

            handleSuccess();
            console.log('Your payment was successful');
        }

        } catch (error) {
            handleError();
            setErr('Process failed !!!');
            console.log(error);
        }
    };

    const [isConfirmed, setConfirmed] = useState(false);
    const handleCheckboxChange = () => {
        setConfirmed(!isConfirmed);
      };

  return (
    <div className="home-container">
      <Navbar/>
      <Container className='container-home'>
        <h1 className='title-div'>MEMBERSHIP</h1>
        <div className="main-div-metrics" >
        <Row>
            <Col md={1}></Col>
            <Col md={10}>
                <div className=''>
                    <Row className='left-padding form-row' >
                        <Col md={5}>
                            <Form.Group controlId="search" lg={3} className=' searc-bar'>
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
                        <Col md={1}></Col>
                        <Col md={5}></Col>
                    </Row>

                    <Row className='left-padding form-row' >
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

                            <div style={{marginTop:30}}></div>

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

                            <div style={{marginTop:30}}></div>

                            <Form.Group controlId="description">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                autoComplete="new-password"
                                value={searchData.email}
                                className="text-secondary"
                            />       
                            </Form.Group>

                            <div style={{marginTop:30}}></div>

                            <Form.Group controlId="description">
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                autoComplete="new-password"
                                value={searchData.contact_number}
                                className="text-secondary"
                            />       
                            </Form.Group>

                        </Col>
                        <Col md={1}></Col>
                        <Col md={5} className='upper-div-metrics' style={{marginTop:-110, marginBottom:-10}}>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="description"style={{marginTop:35}}>
                            <Form.Label>Fee Type</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                autoComplete="new-password"
                                value="Registration Fee"
                                disabled
                            />       
                            </Form.Group>

                            <div style={{marginTop:30}}>

                            <div className="form-group">
                                <label htmlFor="name" className='font-style font-color' style={{marginBottom:7}}>Payment Amount</label>
                                    <Row>
                                            <Col xl={6}>
                                                <input
                                                    type="text"
                                                    className="form-control text-input text-border1"
                                                    id="name"
                                                    value="LKR"
                                                    disabled
                                                    />
                                            </Col>
                                            <Col xl={6}>
                                                <input
                                                    type="text"
                                                    className="form-control text-input text-border2 text-secondary"
                                                    id="name"
                                                    name="amount"
                                                    style={{textAlign:'right'}}
                                                />
                                            </Col>
                                    </Row>
                                </div>
                            </div>

                            <div style={{ marginTop: 40 }}>
                                <Form.Check
                                type="checkbox"
                                id="confirmCheckbox"
                                label="I confirm that the details are correct."
                                onChange={handleCheckboxChange}
                                />
                            </div>

                            <div style={{marginTop:130, paddingBottom:20, textAlign:'center'}}>
                                <button 
                                    type="submit" 
                                    className={`btn btn-success button-submit button-register ${isConfirmed ? '' : 'disabled'}`} 
                                    disabled={!isConfirmed}
                                >
                                     Confirm Payment
                                </button>
                            </div>
                        </Form>
                        </Col>
                    </Row>
                    
                </div>
            </Col>
            <Col md={1}></Col>
        </Row>
        </div>
      </Container>
    </div>
  )
}

export default ViewTraineeMetrics;