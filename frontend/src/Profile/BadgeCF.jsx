import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserCard = ({ user }) => {
  return (
    <div style={styles.card}>
      {/* Move the heading inside the card */}
      <h3 style={{fontSize : "25px"}}>Codeforces Rating</h3>
      <h2 style={{fontSize : "18px"}}>{user.handle}</h2>
      <p style={{fontSize : "18px"}}>Max Rank: {user.maxRank}</p>
      <p style={{fontSize : "18px"}}>Rating: {user.rating}</p> {/* Display the user's rating */}
    </div>
  );
};

const BadgeCF = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get user handles from local storage
        const storedHandles = localStorage.getItem('userCodeforces');

        if (!storedHandles || storedHandles.trim() === '') {
          console.error('No valid handles found in local storage!');
          setLoading(false);
          return;
        }

        const handles = storedHandles.split(',').map(handle => handle.trim());

        // Create query string for API request
        const url = `https://codeforces.com/api/user.info?handles=${handles.join(';')}&checkHistoricHandles=false`;

        // Make the API call
        const response = await axios.get(url);
        const data = response.data.result; // This contains user information

        // Map the user data into an array of handles, max rank, and rating
        const usersData = data.map(user => ({
          handle: user.handle,
          maxRank: user.maxRank || 'No rank available', // Check if maxRank is available
          rating: user.rating || 'No rating available', // Check if rating is available
        }));

        setUsers(usersData); // Set users data
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching data: ', error);
        setLoading(false);
      }
    };

    fetchData(); // Trigger fetch on mount
  }, []); // Empty dependency array ensures this only runs on component mount

  return (
    <div style={styles.container}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        users.map((user) => <UserCard key={user.handle} user={user} />)
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column', 
    justifyContent: 'center',
    alignItems: 'center', 
    flexWrap: 'wrap',
    gap: '20px',
     translate: "590px -1968px",
    marginTop: '20px',
  },
  card: {
    border: '1px solid #ccc',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    width: '290px',
    textAlign: 'center',
  },
};

export default BadgeCF;
