import nodemailer from 'nodemailer'
import dotenv from 'dotenv';
dotenv.config();

const transporter=nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth:{
        user:process.env.SENDER_EMAIL,
        pass:process.env.EMAIL_PASSWORD,  
    }
});

export default transporter;