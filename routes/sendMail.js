const nodemailer = require('nodemailer')


async function mailSender (req, res, next) {
  
  let testEmailAccount = await nodemailer.createTestAccount()

  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testEmailAccount.user,
      pass: testEmailAccount.pass
    }
  })

  //Для gmail:
//  let transporter = nodemailer.createTransport({
//    service: 'gmail',
//    auth: {
//      user: 'youremail@gmail.com',
//      pass: 'yourpassword'
//    }
//  })

  let result = await transporter.sendMail({
    from: '"Node js" <conference@example.com>',
    to: 'rus.nazarenko@gmail.com',
    subject: 'Registration',
    text: 'You have successfully registered for the conference. Expect clarification.'
  })

  console.log(result)  
  next()  
}

const runFuncMailSender = (req, res, next) => {
  mailSender(req, res, next).catch(console.error);
}

module.exports = runFuncMailSender