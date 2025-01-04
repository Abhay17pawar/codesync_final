import React from 'react';

const Text = () => {
  return (
    <div
      style={{
        fontSize: '24px',
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
        borderRadius: '15px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
        translate: '480px -200px',  // Subtle translation
        transition: 'transform 0.3s ease', // Smooth transition effect
        marginTop: '50px',
      }}
    
    >
      All your coding stats at one place
    </div>
  );
};

export default Text;
