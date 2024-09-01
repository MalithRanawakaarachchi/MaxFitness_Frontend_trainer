import React from 'react'
import './viewtrainee.css';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import { Container, Table, Form, Button, Row, Col } from 'react-bootstrap';
import PaymentDetails from '../components/PaymentDetails';
import API from "../utils/api";

const ViewPayments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [payment, setPayment] = useState([]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

      const filteredPayment = payment.filter((payment) => {
      const first_name = payment.first_name ? payment.first_name.toLowerCase() : '';
      const last_name = payment.last_name ? payment.last_name.toLowerCase() : '';
      const email = payment.email ? payment.email.toLowerCase() : '';

      return (
        first_name.includes(searchTerm.toLowerCase()) ||
        last_name.includes(searchTerm.toLowerCase()) ||
        email.includes(searchTerm.toLowerCase())
      );
  });



  const handleViewDetails = (payment) => {
    setSelectedPayment(payment);
  };

  const handleCloseDetails = () => {
    setSelectedPayment(null);
  };

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const res = await API.get('/payments');
        if (res.status === 200) {
          const sortedData = res.data.sort((a, b) => new Date(b.added_date) - new Date(a.added_date));
          setPayment(sortedData);
        }
      } catch (error) {
        console.log('Error fetching payment data:', error);
      }
    };

    fetchPaymentData();
  }, []);

  return (
    <div className="home-container">
      <Navbar/>
      <Container fluid className='container-home'>
        <Row>
            <Col mx={1}></Col>
            <Col mx={10} md={10}>
                <h2 style={{marginBottom:40}}>Payments</h2>
                
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
                        <th>Date</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Amount</th>
                        <th>Check</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredPayment.map((payment) => {
                        const formattedDate = new Date(payment.added_date).toLocaleDateString();
                        return (
                        <tr key={payment.id} className='tr-height-trainee table-column-data lower-text-equipment'>
                            <td align='left'>{formattedDate}</td>
                            <td align='left'>{payment.first_name}{' '}{payment.last_name}</td>
                            <td align='left'>{payment.email}</td>
                            <td>{payment.amount}</td>
                            <td>
                            <Button variant="primary" size="sm" onClick={() => handleViewDetails(payment)}>
                                View
                            </Button>
                            </td>
                        </tr>
                        );
                    })}
                    </tbody>
                </Table>
                </div>
                {selectedPayment && (
                <PaymentDetails payment={selectedPayment} onClose={handleCloseDetails} />
                )}
            </Col>
            <Col mx={1}></Col>
        </Row>
      </Container>
    </div>
  )
}

export default ViewPayments;