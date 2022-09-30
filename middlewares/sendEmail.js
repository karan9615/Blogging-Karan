const nodeMailer = require("nodemailer"); 

exports.sendEmail = async (options) => {
    var transport = nodeMailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "2efea115475019",
          pass: "e83e420e4add49"
        }
      });
    const mailOptions  = {
        from: process.env.SMPT_MAIL, //my mail id
        to: options.email,
        subject: options.subject, 
        text: options.message
    }; 

    await transport.sendMail(mailOptions);
}