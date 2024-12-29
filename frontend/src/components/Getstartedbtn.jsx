import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const GetStartedButton = () => {
  const handleClick = () => {
    // Redirect to Clerk sign-up page
    window.location.assign('https://warm-sheepdog-53.accounts.dev/sign-up'); // Using window.location.assign for redirection
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.1, backgroundColor: "rgb(27, 253, 11)", color: "black" }}
      transition={{ duration: 0.3 }}
      style={{
        padding: '10px 20px',
        backgroundColor: '#39ff14', 
        color: 'black',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '19px',
        display: 'flex',
        alignItems: 'center', // Align text and arrow
        gap: '8px', // Space between text and arrow
      }}
    >
      Get Started <FaArrowRight style={{ fontSize: '20px' }} /> {/* Arrow icon added */}
    </motion.button>
  );
};

export default GetStartedButton;
