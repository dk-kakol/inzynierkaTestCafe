var nodemailer = require('nodemailer');
var params = require('./readConsoleParams')


console.log(params.mail);
console.log(params);
//dodać obsługę maila gdy brak parametru odbiorcy!
exports.mail = function(testName, url){ 
    var transporter = nodemailer.createTransport({
        service: process.env.MAIL_SERVICE,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS
        }
      });
      
      var mailOptions = {
        from: process.env.MAIL_FROM,
        to: `${params.mail}`,
        subject: `Error on test ${testName}`,
        text: 'Check details on report page: ' + url
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}