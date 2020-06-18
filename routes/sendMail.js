const nodemailer = require('nodemailer')


async function mailSender (req, res, next) {
  
  let testEmailAccount = await nodemailer.createTestAccount()

  // let transporter = nodemailer.createTransport({
  //   host: 'smtp.ethereal.email',
  //   port: 587,
  //   secure: false,
  //   auth: {
  //     user: testEmailAccount.user,
  //     pass: testEmailAccount.pass
  //   }
  // })

  

  //Для gmail:
 let transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
     user: 'rus.nazarenko@gmail.com',
     pass: 'xxxxxxxxxxx'
   }
 })

  let result = await transporter.sendMail({
    from: '"Node js" <conference@example.com>',
    to: 'rus.nazarenko@gmail.com',    //req.body.email
    subject: 'Registration',
    text: `You have successfully registered for the conference.
          You have provided the following data:

          First Name: ${req.body.fName},
          Last Name:  ${req.body.lName},
          Date of arrival:  ${req.body.arrivalDate},
          Date of departure:  ${req.body.departureDate},
          Company:  ${req.body.company},
          Country:  ${req.body.country},
          Position:  ${req.body.position},
          Sex:  ${req.body.sex},
          Birthdate:  ${req.body.birthdate},
          Email:  ${req.body.email},
          Role:  ${req.body.role}.

          Awaiting clarification!
    `
  })

  console.log("send mail: ", result)  
  next()  
}

const runFuncMailSender = (req, res, next) => {
  mailSender(req, res, next).catch(console.error);
}

module.exports = runFuncMailSender