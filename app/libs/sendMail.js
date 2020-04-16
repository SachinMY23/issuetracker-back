const nodemailer=require('nodemailer');

let sendMail=(email,subj,msg)=>{


    const transporter = nodemailer.createTransport({
        name:'localhost',
        host: 'smtp.gmail.com',
        port: 587,
        secure:false,
        auth: {
            user: 'smy22360@gmail.com',
            pass: 'Smy@2323'
        }, tls: {
            rejectUnauthorized: false
        }
    });
  

  // send mail with defined transport object
  let mailOptions={
    from: 'smy22360@gmail.com', // sender address
    to: email, // list of receivers
    subject: subj, // Subject line
    html: msg, // plain text body
  };

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log(info);
    console.log('Message sent: ' + info.response);
});

  

}

module.exports={
    sendMailFunction:sendMail
}