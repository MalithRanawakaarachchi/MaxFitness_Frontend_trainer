import React from 'react';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from "../utils/api";


const AddTraineeMetrics = () => {
    const [err, setErr] = useState("");
    const [trainee, setTrainee] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchData, setSearchData] = useState({
        nic: '',
        first_name: '',
        last_name: '',
        contact_number: '',
        user_id: '',
        weight: '',
        height: '',
        bmi: '',
        whr: '',
        blood_group: '',
        bfp: '',
        lbm: '',
        fat_mass: '',
        ideal_body_weight: '',
        waist_circumference: '',
        special_notes: '',
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
    toast.error('Process Faild!', {
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const scheduleData = {
            user_id: searchData.user_id,
            weight: searchData.weight,
            height: searchData.height,
            bmi: searchData.bmi,
            whr: searchData.whr,
            blood_group: searchData.blood_group,
            bfp: searchData.bfp,
            lbm: searchData.lbm,
            fat_mass: searchData.fat_mass,
            ideal_body_weight: searchData.ideal_body_weight,
            waist_circumference: searchData.waist_circumference,
            special_notes: searchData.special_notes,
            level:searchData.level
          };
        //console.log(scheduleData)
        metrics(scheduleData);
    };

    const metrics = async (scheduleData) => {
        try {
        const body = {
            metrics: scheduleData,  // Match the backend expectation here
        };
            console.log('show:', body)
            const res = await API.post('/metrics', body);  // Use the correct endpoint
            if(res.status===200)
            {
                setErr('');
                window.location.replace('/traineemetrics/add');
                notifySuccess();
            }
        } catch (error) {
            setErr('Process failed !!!');
            console.log(error);
            notifyError();
        }
    };


  return (
    <div className="home-container">
      <Navbar/>
      <Container className='container-home'>
        <h3 className='title-div'>New Trainee Metrics</h3>
        <div className="scrollable-container main-div-metrics">
        <div className='upper-div-metrics'>
            <Row className='left-padding form-row'>
                <Col md={5}>
                    <Form.Group controlId="search" className='searc-bar'>
                    <Form.Control
                        type="text"
                        name="search"
                        placeholder="Search trainee by name or NIC"
                        className="text-secondary"
                        autoComplete="new-password"
                        value={searchTerm}
                        onChange={handleSearch}
                        onKeyPress={handleEnterKeyPress}
                    />
                    </Form.Group>
                </Col>
                <Col md={2}></Col>
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
                    <Form.Group controlId="level">
                        <Form.Select
                            name="level"
                            value={searchData.level}
                            onChange={handleSearchChange}
                            >
                            <option value="">Select Fitness Level</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Row className='left-padding form-row' style={{marginTop:-30}}>
                    <Col md={5}>
                        <Form.Group controlId="Name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            autoComplete="new-password"
                            value={`${searchData.first_name} ${searchData.last_name}`}
                        />       
                        </Form.Group>
                    </Col>
                    <Col md={2}></Col>
                    <Col md={5}>
                        <Form.Group controlId="nic">
                        <Form.Label>NIC</Form.Label>
                        <Form.Control
                            type="text"
                            name="nic"
                            autoComplete="new-password"
                            value={searchData.nic}
                        />       
                        </Form.Group>
                    </Col>
            </Row>
        </div>
        
        <Form onSubmit={handleSubmit}>
            
            <Row className='left-padding form-row'>
                <Col md={5}>
                    <Form.Group controlId="weight">
                    <Form.Label>Weight</Form.Label>
                    <Form.Control
                        type="text"
                        name="weight"
                        autoComplete="new-password"
                        value={searchData.weight}
                        onChange={handleSearchChange}
                    />       
                    </Form.Group>
                </Col>
                <Col md={2}></Col>
                <Col md={5}>
                    <Form.Group controlId="bfp">
                    <Form.Label>Body fat percentage</Form.Label>
                    <Form.Control
                        type="text"
                        name="bfp"
                        autoComplete="new-password"
                        value={searchData.bfp}
                        onChange={handleSearchChange}
                    />       
                    </Form.Group>
                </Col>
            </Row>
            <Row className='left-padding form-row'>
                <Col md={5}>
                    <Form.Group controlId="height">
                    <Form.Label>Height</Form.Label>
                    <Form.Control
                        type="text"
                        name="height"
                        autoComplete="new-password"
                        value={searchData.height}
                        onChange={handleSearchChange}
                    />       
                    </Form.Group>
                </Col>
                <Col md={2}></Col>
                <Col md={5}>
                    <Form.Group controlId="lbm">
                    <Form.Label>Lean body mass</Form.Label>
                    <Form.Control
                        type="text"
                        name="lbm"
                        autoComplete="new-password"
                        value={searchData.lbm}
                        onChange={handleSearchChange}
                    />       
                    </Form.Group>
                </Col>
            </Row>
            <Row className='left-padding form-row'>
                <Col md={5}>
                    <Form.Group controlId="bmi">
                    <Form.Label>Body Mass Index (BMI)</Form.Label>
                    <Form.Control
                        type="text"
                        name="bmi"
                        autoComplete="new-password"
                        value={searchData.bmi}
                        onChange={handleSearchChange}
                    />       
                    </Form.Group>
                </Col>
                <Col md={2}></Col>
                <Col md={5}>
                    <Form.Group controlId="fat_mass">
                    <Form.Label>Fat mass</Form.Label>
                    <Form.Control
                        type="text"
                        name="fat_mass"
                        autoComplete="new-password"
                        value={searchData.fat_mass}
                        onChange={handleSearchChange}
                    />       
                    </Form.Group>
                </Col>
            </Row>
            <Row className='left-padding form-row'>
                <Col md={5}>
                    <Form.Group controlId="whr">
                    <Form.Label>Waist to hip ratio</Form.Label>
                    <Form.Control
                        type="text"
                        name="whr"
                        autoComplete="new-password"
                        value={searchData.whr}
                        onChange={handleSearchChange}
                    />       
                    </Form.Group>
                </Col>
                <Col md={2}></Col>
                <Col md={5}>
                    <Form.Group controlId="ideal_body_weight">
                    <Form.Label>Ideal body weight</Form.Label>
                    <Form.Control
                        type="text"
                        name="ideal_body_weight"
                        autoComplete="new-password"
                        value={searchData.ideal_body_weight}
                        onChange={handleSearchChange}
                    />       
                    </Form.Group>
                </Col>
            </Row>
            <Row className='left-padding form-row'>
                <Col md={5}>
                    <Form.Group controlId="blood_group">
                    <Form.Label>Blood group</Form.Label>
                    <Form.Control
                        type="text"
                        name="blood_group"
                        autoComplete="new-password"
                        value={searchData.blood_group}
                        onChange={handleSearchChange}
                    />       
                    </Form.Group>
                </Col>
                <Col md={2}></Col>
                <Col md={5}>
                    <Form.Group controlId="waist_circumference">
                    <Form.Label>Waist Circumference</Form.Label>
                    <Form.Control
                        type="text"
                        name="waist_circumference"
                        autoComplete="new-password"
                        value={searchData.waist_circumference}
                        onChange={handleSearchChange}
                    />       
                    </Form.Group>
                </Col>
            </Row>
            <Row className='left-padding form-row'>
                <Col md={12}>
                    <Form.Group controlId="special_notes">
                    <Form.Label>Special Notes</Form.Label>
                    <textarea
                        className="form-control special-notes"
                        id="message"
                        name="special_notes"
                        rows="4"
                        value={searchData.special_notes}
                        onChange={handleSearchChange}
                    ></textarea>     
                    </Form.Group>
                </Col>   
            </Row>   
            <Row className='left-padding form-row'>
                <Col md={12} style={{textAlign:'right'}}>
                    <button variant="" type="submit" className='button-primary button-submit'>
                        Submit
                    </button>
                    <button variant="" type="button" className='button-danger-transparent'>
                        Cancel
                    </button>
                </Col>
            </Row>         
        </Form>
        </div>
        <ToastContainer/>
      </Container>
    </div>
  )
}

export default AddTraineeMetrics;