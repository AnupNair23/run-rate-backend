import nodemailer from "nodemailer"

// let testAccount = nodemailer.createTestAccount();

// const transport = nodemailer.createTransport({
//     host: process.env.SMTP_HOST || 'smtp.ethereal.email',
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//         user: process.env.SMTP_USER || testAccount.user,
//         pass: process.env.SMTP_PASS || testAccount.pass,
//     },
// });

const sendConfirmationEmail = async (name, email, confirmationCode) => {
    console.log('process.e-- ', process.env.SMTP_PASS, process.env.SMTP_USER)
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
    console.log("Check");
    transporter.sendMail({
        from: "Run Rate",
        to: email,
        subject: "Please confirm your account",
        html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
          <a href=http://localhost:3000/confirm/${confirmationCode}> Click here</a>
          </div>`,
    }).catch(err => console.log(err));
};

export { sendConfirmationEmail }