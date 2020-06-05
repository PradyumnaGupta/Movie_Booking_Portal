const express=require('express');
const cors = require('cors');
const sqlite=require('sqlite3');
const nodemailer=require('nodemailer');

const db=new sqlite.Database('../Databases/MBP.db');

const addUser=require('./addUser.js');
const checkUser=require('./checkUser.js');
const checkMatchingTickets=require('./checkmatchingtickets.js');
const getMoviesInfo=require('./getmoviesinfo.js');
const getSeats=require('./getseats.js');
const submitFinalTicket=require('./submitfinalticket.js');
const removeShow=require("./removeshow");
const addShow=require('./addshow.js');
//const emailTicket=require('./emailticket.js');
//const checkIfSeatsAvailable=require('./utils.js');

const app=express();
const Port=4002;


app.use(cors());

app.use(express.static("../public"));

//app.get('/favicon.ico', (req, res) => res.status(204));

app.get("/login/",(req,res,next)=>{
    checkUser(req.query.username,req.query.password,res);
});

app.get("/register/",(req,res,next)=>{
    addUser(req.query.username,req.query.password,req.query.email,req.query.phone,res);
});

app.get("/history/",(req,res,next)=>{
    checkMatchingTickets(req.query.user,res);
});

app.get("/movies_info/",(req,res,next)=>{
    getMoviesInfo(res);
});

app.get("/seat_info/",(req,res,next)=>{
    getSeats(req.query.audi,req.query.slot,req.query.day,res);
});

app.get("/submit_ticket/",(req,res,next)=>{
    submitFinalTicket(req.query.user,req.query.movie,req.query.audi,req.query.slot,req.query.day,req.query.seats,res);
});

app.get("/add_show/",(req,res,next)=>{
    addShow(req.query.movie,req.query.audi,req.query.poster_src,res);
});

app.get("/remove_show/",(req,res,next)=>{
    removeShow(req.query.movie,req.query.audi,res);
});


//setTimeout(()=>{console.log("test1")},(new Date((new Date().getFullYear()),(new Date().getMonth()),(new Date().getDate()),24,0).getTime())-(new Date().getTime()));
//setInterval(()=>{setTimeout(()=>{console.log("test2")},(new Date((new Date().getFullYear()),(new Date().getMonth()),(new Date().getDate()),24,0).getTime())-(new Date().getTime()))},24*60*60*60);

app.listen(Port,()=>{
    console.log(`Listening at port ${Port}`);
});