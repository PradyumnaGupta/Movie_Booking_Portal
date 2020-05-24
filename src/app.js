const express=require('express');
const cors = require('cors');
const sqlite=require('sqlite3');
//const nodemailer=require('nodemailer');

const db=new sqlite.Database('../Databases/MBP.db');

const addUser=require('./addUser.js');
const checkUser=require('./checkUser.js');
const checkMatchingTickets=require('./checkmatchingtickets.js');
const getMoviesInfo=require('./getmoviesinfo.js');
const getSeats=require('./getseats.js');
const submitFinalTicket=require('./submitfinalticket.js');
const checkIfSeatsAvailable=require('./utils.js');

const app=express();
const Port=4002;


app.use(cors());

app.use(express.static("../public"));

//app.get('/favicon.ico', (req, res) => res.status(204));

app.get("/login/",(req,res,next)=>{
    //console.log(req.query.username);
    //console.log(req.query.password);
    checkUser(req.query.username,req.query.password,res);
});

app.get("/register/",(req,res,next)=>{
    /*console.log(req.query.username);
    console.log(req.query.password);
    console.log(req.query.email);
    console.log(req.query.phone);*/
    addUser(req.query.username,req.query.password,req.query.email,req.query.phone,res);
    //res.send("OK");
});

app.get("/history/",(req,res,next)=>{
    checkMatchingTickets(req.query.username,res);
});

app.get("/movies_info/",(req,res,next)=>{
    console.log("req");
    getMoviesInfo(res);
});

app.get("/seat_info/",(req,res,next)=>{
    getSeats(req,query.audi,req.query.slot,req.query.day,res);
});

app.get("/submit_ticket/",(req,res,next)=>{
    submitFinalTicket(req.query.user,req.query.movie,req.query.audi,req.query.slot,req.query.day,req.query.seats,res);
    res.send("OK");
});

app.listen(Port,()=>{
    console.log(`Listening at port ${Port}`);
});

