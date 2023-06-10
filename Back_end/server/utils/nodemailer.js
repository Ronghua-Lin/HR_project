
const nodemailer=require('nodemailer')
require("dotenv").config();
const email_username=process.env.EMAIL_USERNAME
const email_password=process.env.EMAIL_PASSWORD



exports.sendEmail=(target_email,signed_jwt)=>{
  return new Promise((resolve,reject)=>{
    var transporter=nodemailer.createTransport({
      service:'gmail',
      auth:{
        user:email_username,
        pass:email_password
      }
    })

    const mail_configs={
      from:email_username,
      to:target_email,
      subject:'New Employee Registration',
      text:'Please click the button below to register a new account',
      html:` <h3>Click the button below to register your account</h3>
      <a href="http://localhost:4200/signup?jwt=${signed_jwt}" >click me to sign up</a>`
    }
    transporter.sendMail(mail_configs,(error,info)=>{
      if(error){
        console.log(error)
        return reject({message:`An error has orrured ${error}`})
      }
   
      return resolve({message:'Email sent succesfully'})
    })
  })
}


exports.sendEmailNoticefication=(target_email)=>{
  return new Promise((resolve,reject)=>{
    var transporter=nodemailer.createTransport({
      service:'gmail',
      auth:{
        user:email_username,
        pass:email_password
      }
    })

    const mail_configs={
      from:email_username,
      to:target_email,
      subject:'email noticification',
      text:'remember to submit your next CPT file',
      
    }
    transporter.sendMail(mail_configs,(error,info)=>{
      if(error){
        console.log(error)
        return reject({message:`An error has orrured ${error}`})
      }
   
      return resolve({message:'Email sent succesfully'})
    })
  })
}
