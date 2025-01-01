import React, { useEffect, useState } from 'react';
import './Calender.css'; // Import custom styles

const CodeforcesCalendar = () => {
  const [contests, setContests] = useState([]);
  const [date, setDate] = useState(new Date());
  const [selectedContest, setSelectedContest] = useState(null);
  const [hoveredContest, setHoveredContest] = useState(null); // For hover state

  // Fetch upcoming Codeforces contests
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

  // Handle date selection
  const handleDateClick = (clickedDate) => {
    setDate(clickedDate);
    // Check if there is any contest on the selected date
    const selectedContest = contests.find(contest => {
      const contestDate = new Date(contest.startTimeSeconds * 1000);
      return contestDate.toDateString() === clickedDate.toDateString();
    });
    setSelectedContest(selectedContest || null);
  };

  // Generate the calendar grid for the current month
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
          onMouseLeave={() => setHoveredContest(null)} // Reset hover
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

  // Handle hover event
  const handleDateHover = (dayDate) => {
    const contest = contests.find(contest => {
      const contestDate = new Date(contest.startTimeSeconds * 1000);
      return contestDate.toDateString() === dayDate.toDateString();
    });
    setHoveredContest(contest);
  };

  // Format contest date
  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  // Get current month and year for display
  const getMonthName = (monthIndex) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[monthIndex];
  };

  // Handle Notify Me button click
  const handleNotifyMeClick = () => {
    alert(`You will be notified about the contest: ${selectedContest.name}`);
    // Implement actual notification logic here, e.g., setting up reminders or sending notifications.
  };

  useEffect(() => {
    fetchContests();
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
          <button className="notify-me-btn" onClick={handleNotifyMeClick}>Notify Me</button>
        </div>
      )}
    </div>
  );
};

export default CodeforcesCalendar;
