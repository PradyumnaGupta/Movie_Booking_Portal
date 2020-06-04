
const emailTicket=function(user,seats,movie,slot,audi,date){
    const sqlite=require('sqlite3');
    const db=new sqlite.Database('../Databases/MBP.db');
    db.get("SELECT * FROM users WHERE Username=$user",{
        $user:user
    },(error,row)=>{
        let nodemailer = require('nodemailer');
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: 'moviebookingportal@gmail.com',
                pass: 'movie@123'
            }
        });
        process.stdout.write("sending mail...");
        let mailOptions = {
            from: 'moviebookingportal@outlook.com', 
            to: row.Email, 
            subject: 'Ticket Booked', 
            text: `Dear ${row.Username}, The details for your ticket are as follows:\n MOVIE : ${movie} \n Auditorium:Auditorium ${audi} \n Date: ${date} \n Time : ${slot} \n Seats : ${seats} `
        };
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log("An Error occured while sending mail!!");
                console.log(error);
            }
            return;
        });
        console.log("done");
    })
};

module.exports=emailTicket;