const emailTicket=require("./email_ticket.js");
const checkIfSeatsAvailable=require("./utils.js");
const Auditoriums=require("../Databases/auditoriums_collection.js");
const Booked_Tickets=require("../Databases/booked_tickets_collection.js");

const submitFinalTicket=function(user,movie,audi,slot,day,seats,res){

    let today=new Date().getDay();
    day=parseInt(day);
    day=(day<today)?(7-today+day):(day-today);//converting weekday to 0/1/2

    Auditoriums.findOne({
        Auditorium:audi
    }).then((doc)=>{
        seats=JSON.parse(seats);
        available_seats_matrix=doc[`Slot_${Array("A","B","C")[JSON.parse(slot)-1]}`];
        
        available_seats=available_seats_matrix[day];
        
        if(!checkIfSeatsAvailable(available_seats,seats)){
            res.status(409).send("SEATS NOT FOUND");
            return ;
        }
        else {
            for(let i=0;i<seats.length;i++)
            available_seats.splice(available_seats.indexOf(seats[i]),1);

            available_seats_matrix[day]=available_seats;

            if((JSON.parse(slot)-1)===0) 
            Auditoriums.findOneAndUpdate({Auditorium:audi},{Slot_A:available_seats_matrix},{new:true,runValidators:true}).catch(error=>{console.log(error)});
            else if ((JSON.parse(slot)-1)===1)
            Auditoriums.findOneAndUpdate({Auditorium:audi},{Slot_B:available_seats_matrix},{new:true,runValidators:true}).catch(error=>{console.log(error)});
            else 
            Auditoriums.findOneAndUpdate({Auditorium:audi},{Slot_C:available_seats_matrix},{new:true,runValidators:true}).catch(error=>{console.log(error)});

            let date=new Date();
            date.setDate(date.getDate()+day);
            date=`${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;

            Booked_Tickets.findOne({
                Username:user
            }).then((doc)=>{
                let new_ticket={
                    Date:date,
                    Movie:movie,
                    Slot:Array("9 AM","2 PM","7 PM")[JSON.parse(slot)-1],
                    Audi:audi,
                    Seats:seats
                };
                if(!doc){
                    let new_user_history=[];
                    new_user_history.push(new_ticket);
                    
                    let new_entry=new Booked_Tickets({
                        Username:user,
                        Ticket_Details:new_user_history
                    });
                    new_entry.save();
                }
                else {
                    
                    doc=doc.Ticket_Details;
                    doc.push(new_ticket);
                    
                    Booked_Tickets.findOneAndUpdate(
                        {
                            Username:user
                        },
                        {
                            $set:{'Ticket_Details':doc}
                        },
                        {new:true,runValidators:true}
                    ).then((doc)=>{/*console.log(doc)*/}).catch((error)=>{console.log(error)});
                }
            }).catch((error)=>{
                console.log(error);
            });

            res.status(200).send("OK");

            emailTicket(user,seats,movie,new Array("9 AM","2 PM","7 PM")[JSON.parse(slot)-1],audi,date);
        }
    });

};


module.exports=submitFinalTicket;