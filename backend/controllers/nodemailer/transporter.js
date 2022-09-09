import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config();
// console.log(process.env.SMTP_SERVICE);
// console.log(process.env.MAIL_PW);
// console.log(process.env.MAIL_USER);
const options = {
    // host: process.env.SMTP_HOST || 'smtp-relay.sendinblue.com',
    // port: process.env.SMTP_PORT || 587,
    // secure: false, // true for 465, false for other ports
    
    service:'gmail',
    auth: {
        user:process.env.MAIL_USER, // generated ethereal user
        pass: process.env.MAIL_PW, // generated ethereal password
    },
    tls: {
        rejectUnauthorized: false,
    },
}


export const transporter = nodemailer.createTransport(options)
