
let state={movie:"",audi:"",day:"",month:""};//initializing state

const removeShow=function(movie,audi,res){

    const db=require('./database_initializer.js');

    let matchingTicketFound=false;

    let today=new Date();
    today.setDate(today.getDate()-1);
    today.setHours(23);
    today.setMinutes(59);

    if(!(state.movie===movie&&state.audi===audi&&state.day===today.getDate()&&state.month===(today.getMonth()))){

        db.all("SELECT * FROM booked_tickets",(error,rows)=>{
            rows.every((row)=>{
                JSON.parse(row.Ticket_Details).every((val)=>{
                    let date_show=val.Date.split('-');
                    if(((new Date(parseInt(date_show[2]),parseInt(date_show[1])-1,parseInt(date_show[0])+1,0).getTime())>=(today.getTime()))&&(val.Audi===audi.slice(-1))&&(val.Movie===movie)){
                        res.send("ERROR");
                        matchingTicketFound=true;
                        return false;
                    }
                    return true;
                })
                return !matchingTicketFound;
                });

            if(!matchingTicketFound){
                db.run(`DELETE FROM movies WHERE Movie_name="${movie}" AND Audi="${audi}"`);
                db.run(`DELETE FROM auditoriums WHERE Movie="${movie}" AND Auditorium="${audi.substr(audi.length-1)}"`);
                res.send("OK");
            }
        })
    }

    else {
        db.run(`DELETE FROM movies WHERE Movie_name="${movie}" AND Audi="${audi}"`);
        db.run(`DELETE FROM auditoriums WHERE Movie="${movie}" AND Auditorium="${audi.substr(audi.length-1)}"`);
        res.send("OK");
    }
    state.movie=movie;
    state.audi=audi;
    state.day=today.getDate();
    state.month=today.getMonth();
}

module.exports=removeShow;