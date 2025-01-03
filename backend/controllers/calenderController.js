const nodemailer = require('nodemailer');

// Configure the transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465, // Correct port for SSL
    secure: true, // Use SSL
    auth: {
        user: 'nodemailercodesync@gmail.com', // Replace with your email
        pass: 'haghnsemkhxzipqq' // Replace with your app password
    }
});

// Email sending logic
exports.sendMail = async (req, res) => {
    const { to, subject, message } = req.body; // Extract data from the request body

    try {
        const info = await transporter.sendMail({
            from: 'nodemailercodesync@gmail.com', // Sender's email
            to: to,
            subject: subject,
            html: message
        });

        res.status(200).json({ message: 'Email sent successfully', info: info.response });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email', error: error.message });
    }
};
