import React, { useEffect, useState } from "react";
import axios from "axios";

const UserCard = () => {
  const [userData, setUserData] = useState(null); // State to store user data
  const storedHandles = localStorage.getItem('usercodechef');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the user data from the CodeChef API
        const response = await axios.get(
          `https://codechef-api.vercel.app/handle/${storedHandles}`
        );

        const { stars, highestRating } = response.data;

        // Set user data (stars and maxRating)
        setUserData({
          stars,
          maxRating: highestRating,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [storedHandles]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="rounded-lg shadow-md"
      style={{
        width: "290px", // Reduced width
        height: "155px", // Reduced height
        padding: "10px", // Reduced padding
        border: "1px solid #ccc",
        translate: "1195px -1962px",
        margin: "10px",
      }}
    >
      {/* Display user stars and max rating */}
      <div style={{ marginBottom: "20px", color: "white", textAlign: "center" }}>
        <h3 style={{fontSize : "25px"}}>CodeChef Rating</h3>
        <p style={{fontSize : "18px"}}>{storedHandles}</p>
        <p style={{fontSize : "18px"}}>Stars: {userData.stars || 'No stars available'}</p>
        <p style={{fontSize : "18px"}}>Max Rating: {userData.maxRating || 'No rating available'}</p>
      </div>
    </div>
  );
};

export default UserCard;
