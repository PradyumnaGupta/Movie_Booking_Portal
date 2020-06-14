const express=require('express');
const cors = require('cors');

const addUser=require('./add_user.js');
const checkUser=require('./check_user.js');
const checkMatchingTickets=require('./check_matching_tickets.js');
const getMoviesInfo=require('./get_movies_info.js');
const getSeats=require('./get_seats.js');
const submitFinalTicket=require('./submit_final_ticket.js');
const removeShow=require('./remove_show');
const addShow=require('./add_show.js');
const dailyAudiTableUpdate=require('./daily_auditable_update.js');

const app=express();
const Port=4002;

app.use(cors());

app.use(express.static("../public"));

app.get("/user/",(req,res,next)=>{
    checkUser(req.query.username,req.query.password,res);
});

app.post("/user/",(req,res,next)=>{
    addUser(req.query.username,req.query.password,req.query.email,req.query.phone,res);
});

app.get("/user/bookings/",(req,res,next)=>{
    checkMatchingTickets(req.query.user,res);
});

app.get("/movies/",(req,res,next)=>{
    getMoviesInfo(res);
});

app.get("/movies/seats/",(req,res,next)=>{
    getSeats(req.query.audi,req.query.slot,req.query.day,res);
});

app.post("/user/bookings/",(req,res,next)=>{
    submitFinalTicket(req.query.user,req.query.movie,req.query.audi,req.query.slot,req.query.day,req.query.seats,res);
});

app.put("/movies/",(req,res,next)=>{
    addShow(req.query.movie,req.query.audi,req.query.poster_src,res);
});

app.delete("/movies/",(req,res,next)=>{
    removeShow(req.query.movie,req.query.audi,res);
});

setTimeout(dailyAudiTableUpdate,(new Date((new Date().getFullYear()),(new Date().getMonth()),(new Date().getDate()),24,0).getTime())-(new Date().getTime()));

app.listen(Port,()=>{
    console.log(`Listening at port ${Port}`);
});