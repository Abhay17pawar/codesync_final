import React from 'react';
import { UserButton } from '@clerk/clerk-react';
import ProfileCard from '../components/ProfileCard';
import Totalques from '../Profile/Totalques';
import Heatmaps from '../Profile/Heatmap';
import Totalcontest from '../Profile/Totalcontest';
import ProblemsSolved from '../Profile/ProfileQues';
const Homepage = () => {
  return (
    <div className="flex space-x-6"> 
      <div>
        <UserButton />
        <ProfileCard />
        <ProblemsSolved
  dsaPercentage={55}
  dsaEasy={36}
  dsaMedium={18}
  dsaHard={1}
  cpPercentage={100}
  cpCodeforces={212}
/>
      </div>
      <div>
        <Totalques />
        <Totalcontest/>
      </div>
        <Heatmaps />
    </div>
  );
};

export default Homepage;
