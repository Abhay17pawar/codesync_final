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
      className="w-full max-w-sm bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-md"
      style={{
        width: "400px", // Adjust container width
        height: "140px", // Adjust container height
        padding: "20px",
        translate: "590px -1500px",        // Adds padding inside the container
      }}
    >
      {/* Display user stars and max rating */}
      <div style={{ marginBottom: "20px", color: "white", textAlign: "center" }}>
        <h3>CodeChef User Info</h3>
        <p><strong>Stars:</strong> {userData.stars || 'No stars available'}</p>
        <p><strong>Max Rating:</strong> {userData.maxRating || 'No rating available'}</p>
      </div>
    </div>
  );
};

export default UserCard;
