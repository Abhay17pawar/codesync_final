import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { SignUp } from '@clerk/clerk-react'; // Import Clerk SignUp component
import Landingpage from './pages/Landingpage';
import Homepage from './pages/Homepage';
import CodefocesHandle from './pages/CodeforcesHandle';
import Login from './pages/LoginHandle';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/Landingpage" element={<Landingpage />} />
          <Route path='/signup' element={ <CodefocesHandle/> }/>
          <Route path='/login' element={ <Login/> }/>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
