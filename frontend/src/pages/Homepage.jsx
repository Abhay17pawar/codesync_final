import React from 'react';
import { UserButton } from '@clerk/clerk-react';
import ProfileCard from '../components/ProfileCard';
import Totalques from '../Profile/Totalques';
import Heatmaps from '../Profile/Heatmap';
import Totalcontest from '../Profile/Totalcontest';
import ProblemsSolved from '../Profile/ProfileQues';
import RatingChart from '../Profile/Charts';
import CodeforcesRatingChart from '../Profile/ChartsCf';
import BadgeIcons from '../Profile/BadgesLeetcode';
import Calendars from './Calender'; // Make sure this path is correct
import BadgeCF from '../Profile/BadgeCF';
import UserCard from '../Profile/BadgeCC';

const Homepage = () => {
  return (
    <>
   
      <Calendars />
      {/* <div className="h-screen overflow-y-scroll"> 
        <div className="flex space-x-6"> 
          <div>
            <ProfileCard />
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
        <div>
          <RatingChart />
          <CodeforcesRatingChart />
        </div>
        <div>
          <BadgeIcons />
          <BadgeCF />
          <UserCard />
        </div>
      </div> */}
    </>
  );
};

export default Homepage;
