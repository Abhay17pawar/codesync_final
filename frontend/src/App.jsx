import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Landingpage from './pages/Landingpage';
import Homepage from './pages/Homepage';
import CodefocesHandle from './pages/CodeforcesHandle';
import Login from './pages/LoginHandle'
import CodeforcesCalendar from './pages/Calender';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/Landingpage" element={<Landingpage />} />
          <Route path='/calendar' element={<CodeforcesCalendar />} />
          <Route path='/signup' element={ <CodefocesHandle/> }/>
          <Route path='/login' element={ <Login /> }/>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
