import React, { useEffect, useState } from 'react';
import './Calender.css'; // Import custom styles

const CodeforcesCalendar = () => {
  const [contests, setContests] = useState([]); // Store the list of contests
  const [date, setDate] = useState(new Date()); // Current selected date
  const [selectedContest, setSelectedContest] = useState(null); // Selected contest on the clicked date
  const [hoveredContest, setHoveredContest] = useState(null); // Contest shown on hover (for details)
  const [notifyStates, setNotifyStates] = useState({}); // Store notify button states for each contest
  const [email, setEmail] = useState(''); // State to store email ID

  // Fetch upcoming Codeforces contests from the API
  const fetchContests = async () => {
    try {
      const response = await fetch('https://codeforces.com/api/contest.list');
      const data = await response.json();
      const futureContests = data.result.filter(contest => contest.phase === 'BEFORE');
      setContests(futureContests);
    } catch (error) {
      console.error('Error fetching contests:', error);
    }
  };

  // Fetch notify states from localStorage on page load
  const loadNotifyStates = () => {
    const savedStates = localStorage.getItem('notifyStates');
    return savedStates ? JSON.parse(savedStates) : {};
  };

  // Fetch email from localStorage on component mount
  const loadEmail = () => {
    const savedEmail = localStorage.getItem('email');
    return savedEmail ? savedEmail : ''; // Default to empty string if no email found
  };

  // Handle date click (selecting a contest)
  const handleDateClick = (clickedDate) => {
    setDate(clickedDate);
    // Find the contest for this date
    const selectedContest = contests.find(contest => {
      const contestDate = new Date(contest.startTimeSeconds * 1000);
      return contestDate.toDateString() === clickedDate.toDateString();
    });
    setSelectedContest(selectedContest || null); // Set selected contest or null if none
  };

  // Generate calendar for the current month
  const generateCalendar = () => {
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const calendarDays = [];
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Render Weekdays
    const weekdayElements = weekdays.map((day, index) => (
      <div key={index} className="weekday">
        {day}
      </div>
    ));

    // Fill the grid with empty spaces before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(<div className="calendar-day empty" key={`empty-${i}`}></div>);
    }

    // Fill the grid with the actual days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const dayDate = new Date(date.getFullYear(), date.getMonth(), i);
      const contestOnThisDay = contests.some(contest => {
        const contestDate = new Date(contest.startTimeSeconds * 1000);
        return contestDate.toDateString() === dayDate.toDateString();
      });
      
      calendarDays.push(
        <div
          className={`calendar-day ${contestOnThisDay ? 'contest-day' : ''} ${dayDate.toDateString() === new Date().toDateString() ? 'today' : ''}`}
          key={i}
          onClick={() => handleDateClick(dayDate)}
          onMouseEnter={() => handleDateHover(dayDate)}
          onMouseLeave={() => setHoveredContest(null)} // Reset hover state
        >
          {i}
          {contestOnThisDay && hoveredContest && (
            <div className="event-details-hover">
              <p><strong>{contests.find(contest => {
                const contestDate = new Date(contest.startTimeSeconds * 1000);
                return contestDate.toDateString() === dayDate.toDateString();
              }).name}</strong></p>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="calendar-grid">
        {weekdayElements}
        {calendarDays}
      </div>
    );
  };

  // Handle hover event for contest details
  const handleDateHover = (dayDate) => {
    const contest = contests.find(contest => {
      const contestDate = new Date(contest.startTimeSeconds * 1000);
      return contestDate.toDateString() === dayDate.toDateString();
    });
    setHoveredContest(contest);
  };

  // Format contest date to a readable format
  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  // Get the month name from its index (e.g., 'January' from index 0)
  const getMonthName = (monthIndex) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[monthIndex];
  };

  // Handle Notify Me button click for the selected contest
  const handleNotifyMeClick = async (contestId) => {
    if (notifyStates[contestId]) return; // Prevent button from being clicked multiple times

    // Update the notify button state for the clicked contest
    const updatedStates = { ...notifyStates, [contestId]: true };
    setNotifyStates(updatedStates);

    // Save the updated state to localStorage
    localStorage.setItem('notifyStates', JSON.stringify(updatedStates));

    // Find the contest by its ID
    const contest = contests.find(contest => contest.id === contestId);

    if (!contest) {
      alert('No contest selected!');
      return;
    }

    // Get email from localStorage
    const userEmail = localStorage.getItem('userEmail')
    
    if (!userEmail || !/\S+@\S+\.\S+/.test(userEmail)) {
      alert('Please enter a valid email address!');
      return;
    }

    try {
      console.log(contest.id); console.log(contest.name); console.log(contest.startTimeSeconds)
      console.log(userEmail)
      const response = await fetch('http://localhost:3000/api/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contestId: contest.id,
          contestName: contest.name,
          contestStartTime: contest.startTimeSeconds,
          email: userEmail, 
        }),
      });

      if (response.ok) {
        alert(`You will be notified about the contest: ${contest.name}`);
      } else {
        alert('Failed to send notification request.');
      }
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Error occurred while sending notification.');
    }
  };

  // Fetch contests and notify states on component mount
  useEffect(() => {
    fetchContests();
    setNotifyStates(loadNotifyStates()); // Load notify states from localStorage
    setEmail(loadEmail()); // Load email from localStorage
  }, []);

  return (
    <div className="calendar-container">
      <h1>Codeforces Upcoming Contests</h1>
      
      {/* Display Current Month */}
      <div className="month-display">
        <span>{getMonthName(date.getMonth())} {date.getFullYear()}</span>
      </div>

      {generateCalendar()}

      {selectedContest && (
        <div className="contest-details">
          <h2>Contest Details</h2>
          <p><strong>Name:</strong> {selectedContest.name}</p>
          <p><strong>Start Time:</strong> {formatDate(selectedContest.startTimeSeconds)}</p>
          <p><strong>Duration:</strong> {selectedContest.durationSeconds / 60} minutes</p>

          {/* Notify Me Button */}
          <button 
            className="notify-me-btn" 
            onClick={() => handleNotifyMeClick(selectedContest.id)} 
            disabled={notifyStates[selectedContest.id]}
          >
            {notifyStates[selectedContest.id] ? 'Notified' : 'Notify Me'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CodeforcesCalendar;
