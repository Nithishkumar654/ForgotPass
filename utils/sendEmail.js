const nodemailer = require('nodemailer');

const sendEmail = async(subject, message, send_to, sent_from, reply_to) =>{
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: "587",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        }
    })
    const options = {
        from: sent_from,
        to: send_to,
        replyTo: reply_to,
        subject: subject,
        html: message,
    }

    transporter.sendMail(options, (err, info) => {
        if(err){
            console.log(err)
        }else{
            console.log('Email sent successfully!');
            console.log('Message ID:', info.messageId);
            console.log('Delivered to:', info.envelope.to);

            // Listen for the 'failed' event to handle delivery failures
            transporter.on('failed', (message) => {
                console.error('Delivery failed for:', message.envelope.to);
                console.error('Error:', message.error);
            });

            // Listen for the 'sent' event to handle successful deliveries
            transporter.on('sent', (message) => {
                console.log('Delivery successful for:', message.envelope.to);
            });
        }
    })
  
    // Listen for the 'error' event to handle any errors that occur during the sending process
    transporter.on('error', (error) => {
        console.error('Error occurred during email sending:', error);
    });
}

module.exports = sendEmail;