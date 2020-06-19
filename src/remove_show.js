const Auditoriums=require("../Databases/auditoriums_collection.js");
const Movies=require("../Databases/movies_collection.js");
const Booked_Tickets=require("../Databases/booked_tickets_collection.js");

//Here state is used to check if the request repeated for the removal of same movie which means user has confirmed deletion
let state={movie:"",audi:"",day:"",month:""};//initializing state 

const removeShow=function(movie,audi,res){

    let matchingTicketFound=false;//flag for if a ticket is found booked against the movie admin wants to remove

    let today=new Date();
    today.setDate(today.getDate()-1);
    today.setHours(23);
    today.setMinutes(59);

    //state being checked so that after the first time warning ,the second time movie gets deleted
    if(!(state.movie===movie&&state.audi===audi&&state.day===today.getDate()&&state.month===(today.getMonth()))){
        
        Booked_Tickets.find({}).then((docs)=>{
            docs.every((doc)=>{
                doc.Ticket_Details.every((val)=>{
                    //console.log(val);
                    let date_show=val.Date.split('-');
                    if(((new Date(parseInt(date_show[2]),parseInt(date_show[1])-1,parseInt(date_show[0])+1,0).getTime())>=(today.getTime()))&&(val.Audi===audi.slice(-1))&&(val.Movie===movie)){
                        res.send("ERROR");//if any booking found send warning
                        matchingTicketFound=true;
                        return false;
                    }
                    return true;
                })
                return !matchingTicketFound;
                });
            if(!matchingTicketFound){//no booking found , delete movie
                
                Movies.findOneAndRemove({
                    Audi:audi
                }).catch(error=>{console.log(error)});

                Auditoriums.findOneAndRemove({
                    Auditorium:audi.substr(audi.length-1)
                }).catch(error=>{console.log(error)});

                res.status(200).send("OK");
            }
        });
    }

    else {//second request after first time warning , delete movie
        Movies.findOneAndRemove({
            Audi:audi
        }).catch(error=>{console.log(error)});

        Auditoriums.findOneAndRemove({
            Auditorium:audi.substr(audi.length-1)
        }).catch(error=>{console.log(error)});
        
        res.status(200).send("OK");
    }
    state.movie=movie;
    state.audi=audi;
    state.day=today.getDate();
    state.month=today.getMonth();
}

module.exports=removeShow;