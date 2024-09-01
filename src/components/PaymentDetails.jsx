
import React from 'react';
import './paymentDetails.css';
import { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Table } from 'react-bootstrap';
import {MdOutlineClose} from 'react-icons/md';
import API from "../utils/api";

const PaymentDetails = ({ payment, onClose }) => {
    
    const [formData, setFormData] = useState('');
    const [paymentDetails, setPaymentDetails] = useState('');
    const [isDisabled, setIsDisabled] = useState(true)
    const [err, setErr] = useState("");

    useEffect(() => {
        const fetchPaymentData = async (user_id) => {
            try {
                    const { user_id } = payment;
                    const res = await API.get(`/payments/${user_id}`);       
                    if (res.status === 200) {
                        setPaymentDetails(res.data);
                    }
                    
            } catch (error) {
                console.log('Error fetching payment data:', error);
            }
        };
    
        fetchPaymentData();
      }, []); 

      console.log(paymentDetails.amount)

      ///add payment plan
      const [payments, setPayments] = useState([]);

      useEffect(() => {
        const startDate = new Date(paymentDetails[0]?.user_added_date);
        
        const currentMonth = startDate.getMonth();
        const currentYear = startDate.getFullYear();
        const today = new Date();
        const currentMonthYear = today.getFullYear() * 12 + today.getMonth();
    
        // Generate payment data for 12 months
        const paymentData = Array.from({ length: 12 }, (_, index) => {
          const month = (currentMonth + index) % 12;
          const year = currentYear + Math.floor((currentMonth + index) / 12);
          const monthYear = year * 12 + month;
    
          return {
            month: getMonthName(month),
            dueDate: getDueDate(month, year),
            payment: index === 0 ? '15000.00' : '10000.00',
            type: index === 0 ? 'Registration Fee' : 'Monthly Fee',
            status:  monthYear <= currentMonthYear ? 'Paid' : 'Unpaid',
          };
        });
    
        setPayments(paymentData);
      }, [paymentDetails[0]?.user_added_date]);

      const getMonthName = (month) => {
        const months = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return months[month];
      };
    
      const getDueDate = (month, year) => {
        const dueDate = new Date(year, month + 1, 0); // Last day of the month
        return dueDate.toLocaleDateString();
      };

  return (
    <div className={`payment-details ${payment ? 'show-details' : ''} col-12`}>
      <div className='component-close-button-div col-12'>
        <Button onClick={onClose} className='btn-danger component-close-button'><MdOutlineClose className='close-button-icon'/></Button>
      </div>
      <div className='scrollable-content' style={{marginLeft:30}}>
      <div style={{textAlign:'left', marginLeft:55}}>
        <h2>Payments</h2>
      </div>
        <Form>
            <Row className='left-padding form-row'>
                <Col md={5}>
                <div style={{display:'flex'}} className='upper-text'>
                    <label style={{marginRight:50}}>Payment Status</label>
                
                    <input
                        type="text"
                        name="first_name"
                        className="status-box"
                        value="Completed"
                        autoComplete="new-password"
                        disabled={isDisabled}
                    />
                </div>
                </Col>
                <Col md="1"></Col>
                <Col md={5}>
                </Col>
            </Row>
            <Row className='left-padding form-row'>
                <Col md={5}>
                <div style={{display:'flex'}} className='upper-text'>
                    <label style={{marginRight:50}}>Registration</label>
                
                    <input
                        type="text"
                        name="first_name"
                        className="regi-box"
                        value="Completed"
                        autoComplete="new-password"
                        disabled={isDisabled}
                    />
                </div>
                </Col>
                <Col md="1"></Col>
                <Col md={5}>
                <div style={{display:'flex', marginLeft:120, marginRight:-70}} className='upper-text'>
                    <label style={{marginRight:30}}>Registered Date</label>
                
                    <input
                        type="text"
                        name="first_name"
                        className="regi-box"
                        value="31/05/2023"
                        autoComplete="new-password"
                        disabled={isDisabled}
                    />
                </div>
                </Col>
            </Row>
            <Row className='form-row' style={{marginLeft:45, marginRight:-20}}>
                <Col md={11} >
                    <div>
                    <Table striped bordered hover >
                        <thead>
                        <tr>
                            <th className='upper-text'>Month</th>
                            <th className='upper-text'>Due Date</th>
                            <th className='upper-text'>Payment (LKR)</th>
                            <th className='upper-text'>Type</th>
                            <th className='upper-text'>Status</th>
                        </tr>
                        </thead>
                        <tbody className='lower-text'>
                            {payments.map((payment, index) => (
                            <tr key={index} className='tr-height-trainee table-column-data table-row-height'>
                                <td align='left' style={{paddingLeft:40, width:180}}>{payment.month}</td>
                                <td align='center'>{payment.dueDate}</td>
                                <td align='right' style={{paddingRight:40}}>{payment.payment}</td>
                                <td align='left' style={{paddingLeft:40, width:180}}>{payment.type}</td>
                                <td>{payment.status}</td>
                            </tr>
                            ))}
                        </tbody>
                    </Table>
                    </div>
                </Col>
                <div style={{textAlign:'left', marginLeft:90, marginTop:40, marginBottom:30}}>
                    <h5>Payment History</h5>
                </div>
                <Col md={11}>
                    <div className="history-table-container">
                    <Table striped bordered hover >
                        <thead>
                        <tr>
                            <th className='upper-text'>Date</th>
                            <th className='upper-text'>Payment (LKR)</th>
                            <th className='upper-text'>Type</th>
                            <th className='upper-text'>Method</th>
                        </tr>
                        </thead>
                        <tbody className='lower-text'>
                        {Array.isArray(paymentDetails) && paymentDetails.map((pay) => {
                            const formattedDate = new Date(pay.added_date).toLocaleDateString();
                            return(
                                <tr key={pay.id} className='tr-height-trainee table-column-data'>
                                    <td align='center'>{formattedDate}</td>
                                    <td align='right' style={{paddingRight:40}}>{pay.amount}</td>
                                    <td align='left' style={{paddingLeft:40}}>{pay.type}</td>
                                    <td align='left'style={{paddingLeft:40}}>{pay.method}</td>
                                </tr>
                            );
                        })};
                        </tbody>
                    </Table>
                    </div>
                </Col>
            </Row>     
        </Form>
        </div>
    </div>
  );
};

export default PaymentDetails;
