# CodeSync

CodeSync is a platform designed to help developers sync and manage their coding platform handles (like Codeforces, Leetcode, Codechef) in one place. Users can register and log in, securely storing their coding platform credentials, and use the platform to easily access and manage their progress across multiple coding websites.

## Features

- **User Authentication:** Secure login and signup with email and password.
- **Sync Coding Platforms:** Connect your handles from Codeforces, Leetcode, and Codechef.
- **Matrix Effect:** A fun background effect on the login/signup page, adding a cool visual experience.
- **User Dashboard:** Easily view and manage your coding platform handles in one place.
- **Agenda:** Set reminders and track upcoming tasks and deadlines within your dashboard.
- **Email Notifications:** Integrated with Nodemailer to send account-related emails (e.g., welcome email, password reset).

## Technologies Used

- **Frontend:** React, React Router, React Hook Form
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Styling:** CSS, Custom Canvas for matrix effect
- **Email Service:** Nodemailer (for sending notifications)
- **Task Scheduling:** Agenda (for handling tasks and reminders)

## Installation

To run CodeSync locally, follow these steps:

### Prerequisites
- Node.js
- npm (or yarn)
- MongoDB (or use MongoDB Atlas for cloud database)

### Steps to Run

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/codesync.git
2. Navigate to the project directory
  cd codesync
3. Install dependencies

For the backend: 
cd backend
npm install
For the frontend:
cd frontend
npm install
4. Set up environment variables:
  Create a .env file in the backend directory and set up your MongoDB connection string and any other necessary keys .
  <-------------------------------------------------------------------------------------------------------------------------------------------------------------------->
  PORT=
  MONGO_URI=
  pass=
  JWT_SECRET=
  <-------------------------------------------------------------------------------------------------------------------------------------------------------------------->
5. Run the backend server
  cd backend
  npm start
6. Run the frontend server
  cd frontend
  npm start
Contributing
1. Fork the repository.
2. Create a new branch (git checkout -b feature-name).
3. Commit your changes (git commit -am 'Add new feature').
4. Push to the branch (git push origin feature-name).
5. Open a pull request.

License
This project is licensed under the MIT License.

Contact
For any questions or suggestions, feel free to reach out to me at abhaypawar0817@gmail.com.

