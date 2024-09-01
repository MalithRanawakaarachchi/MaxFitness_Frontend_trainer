import React from 'react';
import './adminDash.css';
import Navbar from '../components/Navbar';
import { Container} from 'react-bootstrap';

export default function AdminDash() {
  return (
    <div className="home-container">
      <Navbar/>
      <Container fluid className='container-home'>
        <h1>Welcome to Admin Dashboard</h1>
        <p>This is the content of the Admin Dashboard page.</p>
      </Container>
    </div>
  )
}
