
const Users=require("../Databases/users_collection.js");
const nodemailer = require('nodemailer');

const emailTicket=function(user,seats,movie,slot,audi,date){
    
    Users.findOne({
        Username:user
    }).then((doc)=>{
        let transporter = nodemailer.createTransport({
            //host: 'smtp.gmail.com',
            //port: 465,
            //secure: true,
            service:'gmail',
            auth: {
                user: 'moviebookingportal@gmail.com',
                pass: 'movie@123'
            }
        });
        process.stdout.write("sending mail...");
        let mailOptions = {
            from: 'moviebookingportal@outlook.com', 
            to: doc.Email, 
            subject: 'Ticket Booked', 
            text: `Dear ${doc.Username}, The details for your ticket are as follows:\n \n MOVIE : ${movie} \n Auditorium:Auditorium ${audi} \n Date: ${date} \n Time : ${slot} \n Seats : ${seats} `
        };
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log("An Error occured while sending mail!!");
                console.log(error);
            }
            return;
        });
        console.log("done");
    }).catch((error)=>{
        console.log(error);
    })
};

module.exports=emailTicket;