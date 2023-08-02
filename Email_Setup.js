const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "soumyaranjansahuliku@gmail.com",
    pass: "fvhvnvgxrwyhtrxi",
  },
});

exports.Mail = function (data) {
  // console.log(data)
  const { email, subject, password, userId } = data;

  const mailoption = {
    from: "soumyaranjansahuliku@gmail.com",
    to: email,
    subject: subject,
    // text : message,
    html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <table cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#ffffff">
                <tr>
                    <td align="center" style="padding: 20px;">
                        <h1 style="color: black; text-shadow: 1px 1px 2px #737373; margin: 0;">Welcome To MCA Examination Portal</h1>
                        <h3 style="color: gray; text-shadow: 1px 1px 2px lightgray; margin: 10px 0;">Your User_ID: ${userId}</h3>
                        <h3 style="color: gray; margin: 10px 0;">Your Password: ${password}</h3>
                        <img height="150" width="150" src="https://upload.wikimedia.org/wikipedia/en/thumb/7/73/Logo_vssut.svg/800px-Logo_vssut.svg.png" alt="Logo">
                        <h4 style="margin: 20px 0;">Please Login To Continue : <a href="https://vssut-exam-portal.cyclic.app/login"><button style="background-color: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 5px;">Login</button></a> </h4>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        `,
  };

  transporter.sendMail(mailoption, (error, info) => {
    if (error) {
      console.log(error);
      return error;
      // res.status(500).send("internal error");
    } else {
      console.log(info.response);
      return info.response;
      // res.status(200).send({"message":"email sent successfylly..."})
    }
  });
};
