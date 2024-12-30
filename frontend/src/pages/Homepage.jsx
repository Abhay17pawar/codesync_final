import React from 'react';
import { UserButton } from '@clerk/clerk-react';
import ProfileCard from '../components/ProfileCard';
import Totalques from '../Profile/Totalques';
import Heatmaps from '../Profile/Heatmap';
import Totalcontest from '../Profile/Totalcontest';
import ProblemsSolved from '../Profile/ProfileQues';

const Homepage = () => {
  return (
    <div className="h-screen overflow-y-scroll"> 
      <div className="flex space-x-6"> 
        <div>
          <UserButton />
          <ProfileCard />
          <ProblemsSolved />
        </div>
        <div>
          <Totalques />
          <Totalcontest />
        </div>
        <Heatmaps />
      </div>
    </div>
  );
};

export default Homepage;
