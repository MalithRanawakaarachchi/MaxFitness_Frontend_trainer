import React from 'react'
import Navbar from '../components/Navbar';
import { useState } from 'react';
import { Container, Table, Form, Button } from 'react-bootstrap';
import arnoldpresses from '../images/Arms/arnoldpresses.gif';
import diamondpushup from '../images/Arms/diamondpushup.gif';
import weighteddips from '../images/Arms/weighteddips.gif';
import singlearmdumbbellrow from '../images/Arms/singlearmdumbbellrow.gif';
import closegripchinup from '../images/Arms/closegripchinup.gif';
import abwheel from '../images/Abs/abwheel.gif';
import glutebridge from '../images/Abs/glutebridge.gif';
import vacuumholds from '../images/Abs/vacuumholds.gif';
import sideplank from '../images/Abs/sideplank.png';
import widegriplatpulldown from '../images/Back/widegriplatpulldown.gif';
import pullup from '../images/Back/pullup.gif';
import barbellrackpull from '../images/Back/barbellrackpull.gif';
import supermans from '../images/Back/supermans.gif';
import kettlebell from '../images/Back/kettlebell.gif';
import barbellgoodmorning from '../images/Back/barbellgoodmorning.gif';
import dumbbellchestflymuscles from '../images/Chest/dumbbellchestflymuscles.gif';
import dumbbellchestpress from '../images/Chest/dumbbellchestpress.gif';
import dumbbellonearmchestpress from '../images/Chest/dumbbellonearmchestpress.gif';
import onearmdumbbellfly from '../images/Chest/onearmdumbbellfly.gif';
import legpresscalfraise from '../images/Legs/legpresscalfraise.gif';
import legextensionmachine from '../images/Legs/legextensionmachine.gif';
import singleleglegextension from '../images/Legs/singleleglegextension.gif';
import legextensiontoesinward from '../images/Legs/legextensiontoesinward.gif';
import dumbbellfrontraise from '../images/Sholders/dumbbellfrontraise.gif';
import barbellbenchpress from '../images/Sholders/barbellbenchpress.gif';
import barbelluprightrowstanding from '../images/Sholders/barbelluprightrowstanding.gif';
import seatedoverheadpress from '../images/Sholders/seatedoverheadpress.gif';
import dumbbellinclinerow from '../images/Sholders/dumbbellinclinerow.gif';
import EditExercise from '../components/EditExercise';

const ViewExercise = () => {

  const [selectedExercise, setSelectedExercise] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [exercise, setExercise] = useState([
    {
      image: <img src={arnoldpresses} style={{width:250}} alt="" className='equipment-img'/>,
      name: 'Arnold-presses',
      description: 'The Arnold Press, created to develop powerful, sculpted shoulders, is regarded as one of the top strength training exercises. The Arnold press, developed by renowned bodybuilder Arnold Schwarzenegger, stimulates all three heads of the deltoid muscles and offers a full range of motion, helping to create more strength and size.',
      muscle: 'Arms',
      equipment: 'Dumbels'
    },
    {
      image: <img src={diamondpushup} style={{width:250}} alt="" className='equipment-img'/>,
      name: 'Diamond push-ups',
      description: 'When performed correctly, diamond push-ups engage the triceps brachii, pectoralis major, anterior deltoid, and quadriceps. In addition, the core stabilizer muscles are also involved during a diamond push-up.',
      muscle: 'Arms',
      equipment: ''
    },
    {
      image: <img src={weighteddips} style={{width:250}} alt="" className='equipment-img'/>,
      name: 'Weighted dips',
      description: 'Weighted dips are exercises for advanced weightlifters as it requires significant muscular strength and recruitment to lift the body and the added weight from a weighted vest or dip belt with weights.',
      muscle: 'Arms',
      equipment: 'Weighted dips'
    },
    {
      image: <img src={singlearmdumbbellrow} style={{width:250}} alt="" className='equipment-img'/>,
      name: 'Single-arm Dumbbell rows',
      description: 'Dumbbell rows are a workout that entails bending forward at the hips while holding something heavy in one hand and letting it hang toward the ground. Next, the weight is lifted, bringing it closer to the chest before lowering it back to the beginning position.',
      muscle: 'Arms',
      equipment: 'Dumbels'
    },
    {
      image: <img src={closegripchinup} style={{width:250}} alt="" className='equipment-img'/>,
      name: 'Supinated close-grip pull-ups',
      description: 'Supinated close-grip pull-ups are an excellent upper-body workout that develops the inner lats and improves the back, arms, and core muscles. The close-grip pull-up exercise is ideal for improving your upper body muscles since they engage the biceps, lats, traps, and pecs.',
      muscle: 'Arms',
      equipment: 'pull-up bars'
    },
    {
        image: <img src={abwheel} style={{width:250}} alt="" className='equipment-img'/>,
        name: 'Ab Wheels',
        description: 'Perhaps one of the most effective abdominal exercises, ab wheels function quite well when paired with deadlifts due to their high intensity of core muscle recruitment and highly dynamic range of motion. However, when pairing ab wheels with deadlifts, it is important to pay attention to the state of your lower back, as both exercises can be quite taxing on the muscles therein and can lead to injury if performed excessively.',
        muscle: 'Abs',
        equipment: 'Ab Wheels'
      },
      {
        image: <img src={glutebridge} style={{width:250}} alt="" className='equipment-img'/>,
        name: 'Glute Bridges',
        description: 'Glute bridges are a compound bodyweight exercise that train both the posterior chain and the core musculature in a low-impact and easily accessible manner. As a consequence of the torso’s position during the exercise, glute bridges are also quite effective at reinforcing the linea alba as well.',
        muscle: 'Abs',
        equipment: 'Dumbbels'
      },
      {
        image: <img src={vacuumholds} style={{width:250}} alt="" className='equipment-img'/>,
        name: 'Vacuum Holds',
        description: 'A forgotten exercise from early competitive bodybuilders, vacuum holds or stomach vacuums involve  targeting the transverse abdominis muscle, of which meshes quite well with the core muscle training of the deadlift due to the positioning of the former muscle within the abdomen.',
        muscle: 'Abs',
        equipment: ''
      },
      {
        image: <img src={sideplank} style={{width:250}} alt="" className='equipment-img'/>,
        name: 'Side Plankss',
        description: 'Side planks are primarily an isometric exercise that train the muscles (and linea alba) by forcing them to maintain a steady position despite the presence of resistance. This, in turn, builds impressive strength and muscular endurance, and is arguably safer to perform than more dynamic exercises due to a lack of movement.',
        muscle: 'Abs',
        equipment: ''
      },
      {
        image: <img src={widegriplatpulldown} style={{width:250}} alt="" className='equipment-img'/>,
        name: 'Lat Pulldowns',
        description: 'The lat pulldown is done through the use of a lat pulldown machine, this exercise aids in strength training of several muscles such as the latissimus dorsi, biceps, rear delts, rhomboids, and traps. This exercise is known to develop the overall strength of the back muscles.',
        muscle: 'Back',
        equipment: 'Lat pulldown machine'
      },
      {
        image: <img src={pullup} style={{width:250}} alt="" className='equipment-img'/>,
        name: 'Pull-ups',
        description: 'Of all calisthenic exercises, pull-ups are one of the most common. It is an excellent way to measure an individual’s baseline strength to bodyweight ratio. This workout activates multiple muscles such as the deltoid, rhomboid, trapezius,  and core muscles but focuses more on the development of the lats and biceps. ',
        muscle: 'Back',
        equipment: 'Pull-up Bars'
      },
      {
        image: <img src={barbellrackpull} style={{width:250}} alt="" className='equipment-img'/>,
        name: 'Rack Pulls',
        description: 'The rack pulls are an excellent compound exercise that works the whole body. This exercise specifically targets multiple muscle groups in one movement such as the glutes, hamstrings, erector spinae, latissimus dorsi, quadriceps, forearm, and hand muscles. With proper form, this exercise can build muscle mass and muscle hypertrophy throughout the lower body. ',
        muscle: 'Back',
        equipment: 'Weighted dips'
      },
      {
        image: <img src={supermans} style={{width:250}} alt="" className='equipment-img'/>,
        name: 'Supermans',
        description: 'The Superman exercise is an effective and excellent exercise for individuals that look to target the lower back muscles. This exercise can be done at home and without any equipment needed.',
        muscle: 'Back',
        equipment: ''
      },
      {
        image: <img src={kettlebell} style={{width:250}} alt="" className='equipment-img'/>,
        name: 'Russian Kettlebell Swings',
        description: 'The Russian kettlebell swing is a complex compound exercise that activates multiple muscle groups in one movement. This is an excellent exercise that works the muscles of the upper back, but it is also great for other muscles such as the glutes, and hamstrings. The movement itself can improve an individual’s flexibility and mobility over time.',
        muscle: 'Back',
        equipment: 'Kettlebell'
      },
      {
        image: <img src={barbellgoodmorning} style={{width:250}} alt="" className='equipment-img'/>,
        name: 'Barbell Good Mornings',
        description: 'The good morning is a compound exercise that works multiple muscles in the posterior chain, like the lower back muscles, hamstrings, and glutes. It also works several other muscles such as the hip flexors, abductors,  and quads. This is a hip hinge exercise that will help improve the strength, and mobility of the muscles, and improve the range of motion of the hip flexion.',
        muscle: 'Back',
        equipment: 'Barbell'
      },
      {
        image: <img src={dumbbellchestflymuscles} style={{width:250}} alt="" className='equipment-img'/>,
        name: 'Dumbbell Fly',
        description: 'Lie on the back on the floor or on a mat with a dumbbell in each hand. Extend the arms straight up over the chest, with the palms facing in. Slowly lower the dumbbells out to the sides, keeping a slight bend in the elbows. When the arms are parallel to the floor, pause for a moment and then bring the dumbbells back up to the starting position.',
        muscle: 'Chest',
        equipment: 'Dumbbells'
      },
      {
        image: <img src={dumbbellchestpress} style={{width:250}} alt="" className='equipment-img'/>,
        name: 'Dumbbell Chest Press',
        description: 'Lie on the back on the floor or on a mat with a dumbbell in each hand. Extend the arms straight up over the chest, with the palms facing in. Slowly lower the dumbbells down towards the chest, keeping the elbows close to the sides. Pause for a moment and then press the dumbbells back up to the starting position.',
        muscle: 'Chest',
        equipment: ''
      },
      {
        image: <img src={dumbbellonearmchestpress} style={{width:250}} alt="" className='equipment-img'/>,
        name: 'One-Arm Dumbbell Chest Press',
        description: 'Lie on the back on the floor or on a mat with a dumbbell in one hand. Bend the elbow and bring the dumbbell down towards the chest, keeping the other arm extended out to the side. Pause for a moment and then press the dumbbell back up to the starting position. Repeat on the other side.',
        muscle: 'Chest',
        equipment: 'Dumbbells'
      },
      {
        image: <img src={onearmdumbbellfly} style={{width:250}} alt="" className='equipment-img'/>,
        name: 'One-Arm Dumbbell Fly',
        description: 'Lie on the back on the floor or on a mat with a dumbbell in one hand. Extend the arm straight up over the chest, with the palm facing in. Slowly lower the dumbbell out to the side, keeping a slight bend in the elbow. When the arm is parallel to the floor, pause for a moment and then bring the dumbbell back up to the starting position. Repeat on the other side.',
        muscle: 'Chest',
        equipment: 'Dumbbells'
      },
      {
        image: <img src={legpresscalfraise} style={{width:250}} alt="" className='equipment-img'/>,
        name: 'Leg Press Machine Variations',
        description: 'You can incorporate leg press variations by changing the position of the feet on the platform, adjusting the distance between the feet, or using specific parts of the feet to push the platform during a leg press.',
        muscle: 'Legs',
        equipment: 'Leg Extension Machine'
      },
      {
        image: <img src={legextensionmachine} style={{width:250}} alt="" className='equipment-img'/>,
        name: 'Diamond push-ups',
        description: 'By pointing the toes inwards during a leg extension repetition, a greater emphasis may be placed on the vastus lateralis portion of the quadriceps femoris – or what is otherwise known as the outer-facing “teardrop” head. While the rest of the quadriceps will nonetheless be recruited, making this small change in foot orientation can help lifters further specify the training stimulus of their workout.',
        muscle: 'Legs',
        equipment: 'Leg Extension Machine'
      },
      {
        image: <img src={singleleglegextension} style={{width:250}} alt="" className='equipment-img'/>,
        name: 'Single-Leg Leg Extension',
        description: 'While less resistance will be possible, performing the leg extension with only a single leg at a time can allow lifters to better focus on proper muscular contraction. If performing single-leg leg extensions, additional attention should be paid to form as the risk of injury is relatively greater.',
        muscle: 'Legs',
        equipment: 'Leg Extension Machine'
      },
      {
        image: <img src={legextensiontoesinward} style={{width:250}} alt="" className='equipment-img'/>,
        name: 'Inward Pointing Leg Extensions',
        description: 'By pointing the toes inwards during a leg extension repetition, a greater emphasis may be placed on the vastus lateralis portion of the quadriceps femoris – or what is otherwise known as the outer-facing “teardrop” head. While the rest of the quadriceps will nonetheless be recruited, making this small change in foot orientation can help lifters further specify the training stimulus of their workout.',
        muscle: 'Legs',
        equipment: 'Leg Extension Machine'
      },
      {
        image: <img src={dumbbellfrontraise} style={{width:250}} alt="" className='equipment-img'/>,
        name: 'Front Raises',
        description: 'An excellent upper body compound exercise that primarily targets the anterior deltoids is the front raises. This workout also works several supporting muscles such as the lateral deltoid, biceps, trapezius, and pectoralis major muscles.',
        muscle: 'Shoulders',
        equipment: 'Dumbbels'
      },
      {
        image: <img src={barbellbenchpress} style={{width:250}} alt="" className='equipment-img'/>,
        name: 'Bench Press',
        description: 'A great compound exercise for the upper body that primarily targets the triceps and pectoralis major muscles is the bench press. This exercise also engages the back, and anterior deltoids, and traps muscles. The exercise is lying horizontally on a bench while this is being done. Put the head under the barbell that is on the rack while lying down on the bench to perform this exercise.',
        muscle: 'Shoulders',
        equipment: 'Barbell, Bench'
      },
      {
        image: <img src={barbelluprightrowstanding} style={{width:250}} alt="" className='equipment-img'/>,
        name: 'Barbell Upright Row',
        description: 'The barbell upright row is an excellent exercise that builds strength in the shoulders and upper back region. This is a compound pull exercise, which means the weight is being pulled toward the body. It can be done in two ways that vary on the distance of the grip on the barbell.',
        muscle: 'Shoulders',
        equipment: 'Barbell'
      },
      {
        image: <img src={seatedoverheadpress} style={{width:250}} alt="" className='equipment-img'/>,
        name: 'Barbell Overhead Press',
        description: 'This exercise works the pecs, deltoids, triceps, and trapezius muscles. Although the barbell overhead press can be performed in a variety of postures, sitting on a bench is the most effective since it prohibits the user from utilizing their legs as propulsion.',
        muscle: 'Shoulders',
        equipment: 'Barbell'
      },
      {
        image: <img src={dumbbellinclinerow} style={{width:250}} alt="" className='equipment-img'/>,
        name: 'Supported Incline Dumbbell Rows',
        description: 'The supported incline dumbbell rows are an excellent exercise to strengthen the shoulders and other muscles, namely the biceps, latissimus dorsi, trapezius, and rhomboids muscles. This exercise is done with the person lying on a 45-degree inclined bench with the chest facing the backrest of the bench. ',
        muscle: 'Shoulders',
        equipment: 'Dumbbels'
      }
  ]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleViewDetails = (exercise) => {
        setSelectedExercise(exercise);
  };
    
  const handleCloseDetails = () => {
        setSelectedExercise(null);
  };

  const filteredExercise = exercise.filter((exercise) =>
  exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      <Navbar/>
      <Container fluid className='container-home'>
        <h1 className='title-div'>Exercises List</h1>
        
        <Form.Group controlId="search" lg={5} className='col-5 searc-bar'>
          <Form.Control
            type="text"
            placeholder="Search exercise by name..."
          />
        </Form.Group>
        <div className="table-container">
          <Table striped bordered hover>
            <thead>
              <tr style={{textAlign:'center'}}>
                <th></th>
                <th style={{width:200}}>Name</th>
                <th>Description</th>
                <th style={{width:150}}>Target Muscle</th>
                <th style={{width:200}}>Equipment</th>
              </tr>
            </thead>
            <tbody>
              {filteredExercise.map((exercise) => (
                  <tr key={exercise.id} className='tr-height-trainee table-column-data clickable-row lower-text-equipment' onClick={() => handleViewDetails(exercise)}>
                    <td align='left'>{exercise.image}</td>
                    <td>{exercise.name}</td>
                    <td align='justify'>{exercise.description}</td>
                    <td>{exercise.muscle}</td>
                    <td>{exercise.equipment}</td>
                  </tr>
              ))};
            </tbody>
          </Table>
        </div>

        {selectedExercise && (
          <EditExercise exercise={selectedExercise} onClose={handleCloseDetails} />
        )}
      </Container>
    </div>
  )
}

export default ViewExercise;