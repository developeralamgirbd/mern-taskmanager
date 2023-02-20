const sgMail = require('@sendgrid/mail');

const sendEmailUtility= async (EmailTo, EmailText, EmailSubject) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/*    const transporter = nodemailer.createTransport({
        // host: 'mail.teamrabbil.com',
        host: 'smtp.ethereal.email',
        // port: 25,
        port: 587,
        secure: false,
        auth: {
            /!*user: "info@teamrabbil.com",
            pass: '~sR4[bhaC[Qs'*!/
            user: 'lonny.bahringer@ethereal.email',
            pass: 'mCGKAF1Yv8ghyQM72n'
        },tls: {
            rejectUnauthorized: false
        },
    });*/

    const mailOptions = {
        to: EmailTo,
        from: process.env.SENDGRID_EMAIL_FROM,
        subject: EmailSubject,
        text: EmailText
    }

    return sgMail.send(mailOptions);



}
module.exports= sendEmailUtility