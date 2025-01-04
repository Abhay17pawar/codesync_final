const nodemailer = require('nodemailer');
const Agenda = require('agenda');
require('dotenv').config();

// Configure the transporter for email
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    service: 'gmail',
    secure: true,
    auth: {
        user: 'nodemailercodesync@gmail.com',
        pass: process.env.PASS, 
    },
});

// Initialize Agenda with MongoDB
const agenda = new Agenda({
    db: { address: process.env.MONGO_URI, collection: 'agendaJobs' },
});

// Log when Agenda starts or encounters an error
agenda.on('ready', () => {
    console.log('Agenda connected to MongoDB');
    agenda.start();
});

agenda.on('error', (err) => {
    console.error('Error with Agenda:', err);
});

// Define the job for sending emails
agenda.define('send email', async (job) => {
    const { email, contestName, contestDate } = job.attrs.data;

    const mailOptions = {
        from: 'nodemailercodesync@gmail.com',
        to: email,
        subject: `Reminder: ${contestName}`,
        html: `
            <h1>Contest Notification</h1>
            <p><strong>Contest Name:</strong> ${contestName}</p>
            <p><strong>Start Time:</strong> ${contestDate}</p>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
});

// Schedule the email job
const scheduleEmail = async (contestStartTime, email, contestName) => {
    const contestDate = new Date(contestStartTime * 1000).toLocaleString();
    const emailSendTime = new Date(contestStartTime * 1000 - 2 * 60 * 60 * 1000); // 2 hours before the contest

    console.log(`Scheduling email for ${emailSendTime}`);
    await agenda.schedule(emailSendTime, 'send email', {
        email,
        contestName,
        contestDate,
    });
    console.log(`Email scheduled for ${emailSendTime}`);
};


exports.scheduleContestEmail = async (req, res) => {
    const { contestId, contestName, contestStartTime, email } = req.body;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ message: 'Invalid email address' });
    }

    try {
        await scheduleEmail(contestStartTime, email, contestName);
        res.status(200).json({ message: 'Email scheduled successfully' });
    } catch (error) {
        console.error('Error scheduling email:', error);
        res.status(500).json({ message: 'Failed to schedule email', error: error.message });
    }
};
