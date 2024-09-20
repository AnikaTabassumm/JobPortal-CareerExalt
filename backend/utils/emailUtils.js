const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();

const createTransporter = () => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
        },
    });
    return transporter;
};

const sendOTP = async (email, otp) => {
    const transporter = createTransporter();

    const mailInfo = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otp}`,
    };

    try {
        const info = await transporter.sendMail(mailInfo);
        console.log(`Email sent: ${info.response}`);
    } catch (error) {
        console.log('Error sending email:', error)
    }
};

module.exports = {
    sendOTP,
}