import React from 'react';
import { useNavigate } from 'react-router-dom'; // For React Router navigation

const DirectedToCalendar = () => {
  const navigate = useNavigate();
  
  const navigateToCalendar = () => {
    navigate('/calendar'); // Redirect to the calendar page
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px', translate: '550px -953px' }}>
      <button
        onClick={navigateToCalendar}
        className="bg-gradient-to-b from-gray-800 to-gray-900 text-white font-bold text-lg py-3 px-6 rounded-129px shadow-md cursor-pointer transition-all duration-300 ease-in-out"
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.1)';
          e.target.style.boxShadow = '0px 8px 20px rgba(0, 0, 0, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0px 4px 15px rgba(0, 0, 0, 0.1)';
        }}
      >
        Go to Calendar
      </button>
      
    </div>
  );
};

export default DirectedToCalendar;
