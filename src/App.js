import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import AdminDash from './pages/AdminDash';
import AddTrainer from './pages/AddTrainer';
import ViewTrainer from './pages/ViewTrainer';
import AddTrainee from './pages/AddTrainee';
import ViewTrainee from './pages/ViewTrainee';
import ViewEquipment from './pages/ViewEquipment';
import AddEquipment from './pages/AddEquipment';
import ViewExercise from './pages/ViewExercise';
import AddExercise from './pages/AddExercise';
import ViewTraineeMetrics from './pages/ViewTraineeMetrics';
import AddTraineeMetrics from './pages/AddTraineeMetrics';
import AddManualSchedule from './pages/AddManualSchedule';
import ViewSchedule from './pages/ViewSchedule';
import Membership from './pages/Membership';
import MakePayment from './pages/MakePayment';
import ViewPayments from './pages/ViewPayments';
import DashBoard from './pages/DashBoard';

function App() {
  return (
    <BrowserRouter>
        <div className='App'>
          <>
            <Routes>
              <Route path="/adminlogin" element={
                <AdminLogin/>
              } />
              <Route path="/" element={<Navigate to="/trainee/view"/>}/>
              <Route path="/trainee/view" element={<ViewTrainee/>}/>
              <Route path="/trainee/add" element={<AddTrainee/>}/>
              <Route path="/trainee/membership" element={<Membership/>}/>
              <Route path="/trainers/view" element={<ViewTrainer/>}/>
              <Route path="/trainers/add" element={<AddTrainer/>}/>
              <Route path="/equipment/view" element={<ViewEquipment/>}/>
              <Route path="/equipment/add" element={<AddEquipment/>}/>
              <Route path="/exercises/view" element={<ViewExercise/>}/>
              <Route path="/exercises/add" element={<AddExercise/>}/>
              <Route path="/traineemetrics/view" element={<ViewTraineeMetrics/>}/>
              <Route path="/traineemetrics/add" element={<AddTraineeMetrics/>}/>
              <Route path="/schedules/add" element={<AddManualSchedule/>}/>
              <Route path="/schedules/view" element={<ViewSchedule/>}/>
              <Route path="/revenue/makePayment" element={<MakePayment/>}/>
              <Route path="/revenue/viewPayment" element={<ViewPayments/>}/>
              <Route path="/DashBoard" element={<DashBoard/>}/>
            </Routes>     
          </>   
        </div>
      </BrowserRouter>
  );
};


export default App;