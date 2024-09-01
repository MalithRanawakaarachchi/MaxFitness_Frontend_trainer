import React from 'react'
import Navbar from '../components/Navbar';
import { useState } from 'react';
import { Container, Table, Form, Button } from 'react-bootstrap';
import poweraquatrack from '../images/poweraquatrack.png';
import benchpress from '../images/benchpress.png';
import cablesanpulleys from '../images/cablesanpulleys.png';
import barbells from '../images/barbells.png';
import dumbells from '../images/dumbells.png';
import pullapbar from '../images/pullapbar.png';
import legextension from '../images/legextension.png';
import dippingbars from '../images/dippingbars.png';
import EditEquipment from '../components/EditEquipment';
import './viewtrainee.css';

const ViewEquipment = () => {

  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [equipment, setEquipment] = useState([
    {
      id: 1,
      image: <img src={poweraquatrack} alt="" className='equipment-img'/>,
      name:'Squat Rack',
      description: 'Where serious squatting takes place.In fitness and strength training, the squat exercise trains your full body. All serious strength training regiments should incorporate the squat station gym equipment.',
      targetmuscle: 'thighs, hips, and butt,quads, hamstrings',
    },
    {
      id: 2,
      image: <img src={benchpress} alt="" className='equipment-img'/>,
      name:'Bench Press',
      description: 'Used for upper body strength training exercises, where you are pushing weight upwards as you’re laying on your back. Do you want the perfect chest? This is one of the tools you use to train for that chest.',
      targetmuscle: 'Used for upper body strength training exercises, where you are pushing weight upwards as you’re laying on your back. Do you want the perfect chest? This is one of the tools you use to train for that chest.',
    },
    {
      id: 3,
      image: <img src={barbells} alt="" className='equipment-img'/>,
      name:'Barbells',
      description: 'A complementary piece to the squat rack. A barbell is essential to strength training, it holds the free weights, or sometimes the weights are attached to the ends..',
      targetmuscle: 'Pretty much all muscles are affected when training with barbells, especially if doing deadlifts',
    },
    {
      id: 4,
      image: <img src={cablesanpulleys} alt="" className='equipment-img'/>,
      name:'Cabled And Pulleys',
      description: 'Very diverse workout machine in the amount and types of exercises that can be performed by attaching grips to the end of the cables.',
      targetmuscle: 'The inherent design and versatility of this machine allow for it to essentially touch upon every muscle in the body.',
    },
    {
      id: 5,
      image: <img src={dumbells} alt="" className='equipment-img'/>,
      name:'Dumbbels',
      description: 'Pretty much the go-to gym equipment most people first think of when they think of bodybuilding. Varying in weight, but the same concept, a handlebar with weights on opposite ends. A must-have free weight for any fitness regiment. There are even adjustable dumbbells with differing weights all in one piece.',
      targetmuscle: 'You can target a good amount of muscles with dumbbells. Some of the muscles you can work with dumbbells are: chest, shoulders, triceps, traps, biceps, lats, glutes, quads, hammies, and calves.',
    },
    {
      id: 6,
      image: <img src={pullapbar} alt="" className='equipment-img'/>,
      name:'Pullup bar',
      description: 'The best tool for upper body exercise and strengthening. You can pull yourself up with any grip, though palms facing froward is the most popular one seen in demonstrations. Different grips and hand positions can affect different muscles. You pull yourself up until your chin is over the bar.',
      targetmuscle: 'Trunk, arms, shoulders, abs, pelvic floor muscles, hands, and forearms. Different types of pull-ups affect different muscles. Some of the more common types of pullup exercises are: behind the neck, underhand grip, pullup to the waist, wide/butterfly grip.',
    },
    {
      id: 7,
      image: <img src={legextension} alt="" className='equipment-img'/>,
      name:'Leg Extension Machine',
      description: 'Lifting the weights up with your quads, holding steady for a second or two once you fully extend at the top. Leg extension machines are the perfect gym equipment to use when you are rehabilitating from an injury or just trying to strength train your quads.',
      targetmuscle: 'Quadriceps, gluteal deltoid',
    },
    {
      id: 8,
      image: <img src={dippingbars} alt="" className='equipment-img'/>,
      name:'Dipping Bars',
      description: 'Holding onto the handles, one with each hand, lower your body and lift yourself up. It’s important to adhere to good form to avoid any potential shoulder injuries when dabbling with this gym equipment type.',
      targetmuscle: 'Shoulders, triceps, lower pecs. Dips can be performed with weight, or without, by keeping your body vertical.',
    },
    

  ]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleViewDetails = (Equipment) => {
        setSelectedEquipment(Equipment);
  };
    
  const handleCloseDetails = () => {
        setSelectedEquipment(null);
  };

  const filteredEquipment = equipment.filter((equipment) =>
    equipment.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="home-container">
      <Navbar/>
      <Container fluid className='container-home'>
        <h1 className='title-div'>Equipment List</h1>
        
        <Form.Group controlId="search" lg={5} className='col-5 searc-bar'>
          <Form.Control
            type="text"
            placeholder="Search equipment by name..."
          />
        </Form.Group>
        <div className="table-container">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Description</th>
                <th>Muscles used</th>
              </tr>
            </thead>
            <tbody>
              {filteredEquipment.map((equipment) => (
                  <tr key={equipment.id} className='tr-height-trainee table-column-data clickable-row lower-text-equipment' onClick={() => handleViewDetails(equipment)}>
                    <td>{equipment.image}</td>
                    <td>{equipment.name}</td>
                    <td align='justify'>{equipment.description}</td>
                    <td align='justify'>{equipment.targetmuscle}</td>
                  </tr>
              ))};
            </tbody>
          </Table>
        </div>

        {selectedEquipment && (
          <EditEquipment equipment={selectedEquipment} onClose={handleCloseDetails} />
        )}
      </Container>
    </div>
  )
}

export default ViewEquipment;