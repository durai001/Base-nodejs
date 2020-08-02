let nodemailer = require('nodemailer');
let sendInBlue = require('nodemailer-sendinblue-transport');
let config = require('../../config/config'); 
let {cloudURL,sendInBlueKEY,mailFrom}={...config}
const transporter = nodemailer.createTransport(sendInBlue({ apiKey: sendInBlueKEY }));
 module.exports.mailOTP = function(user, OTP) {
  console.log("toEmail",user.email)
  let mailOptions = {
    from: mailFrom, // sender address
    to: user.email, // list of receivers
    subject: 'easy_chat - Reset Password', // Subject line
    html: `Hi ${user.U_name} your OTP (One Time Password) is ${OTP}`
  };
  sendMail(mailOptions) 
}; 

function sendMail(mailOptions,error) {
  console.log(mailOptions)
   transporter.sendMail(mailOptions, function(error, body) {

  if(error){
    console.log("error", error);
  }else{
    console.log("Successfully send Mail to :",mailOptions.to);
    console.log("Detail :",body)
  }
   })

  };