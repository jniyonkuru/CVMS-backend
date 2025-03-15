import nodemailer from 'nodemailer';
import path from 'path';
import hbs from 'nodemailer-express-handlebars'
import dotenv from "dotenv";

dotenv.config();

interface mailOptions{
  template:string,
  subject:string,
  event:string,
}

const transporter= nodemailer.createTransport(  {
    service: 'gmail',
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASSKEY
    }
})



const handlebarOptions:any = {
    viewEngine: {
        partialsDir: path.resolve('./views/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./views/'),
};

transporter.use('compile',hbs(handlebarOptions))
const sendEmailToVolunteer=async(user:any,{template,subject,event}:mailOptions)=>{
        if (user.email) {
          const mailOptions = {
            from: '"CVMS" <cvms25486@gmail.com>',
            template:template, 
            to: user.email,
            subject: `${subject.charAt(0).toUpperCase().concat(subject.slice(1))}, ${user.firstName}`,
            context: {
              name: user.firstName,
              event: event,
            },
          };
          try {
           return await transporter.sendMail(mailOptions);
          

          } catch (error) {
            console.log(`Nodemailer error sending email to ${user.email}`, error);
          }
        }
      }
      const  sendEmailToOrganization=async(organization:any,{template,subject,event}:mailOptions)=>{
          if(organization.email){
    const mailOptions={
      from: '"CVMS" <cvms25486@gmail.com>',
      template:template, 
      to: organization.email,
      subject: `${subject.charAt(0).toUpperCase().concat(subject.slice(1))}, ${organization.name}`,
      context: {
        name: organization.name,
        event: event,
      },

    }
    try {
       return await transporter.sendMail(mailOptions)
    } catch (error) {
      console.log(`Nodemailer error sending email to ${organization.email}`,error)
    }

          }
      }
export { sendEmailToVolunteer,sendEmailToOrganization}



