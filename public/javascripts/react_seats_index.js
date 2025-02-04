
class RenderMessage extends React.Component {
    render(){
        document.getElementById("message_placeholder").style.display="block";
        return (
            <div id="message" style={{color:this.props.color}}>
                {this.props.message}
            </div>
        )
    }
}

class RenderSeats extends React.Component {
    static selected_seats=[];
    static user_earlier_bookings=[];

    static hideBookedSeats=function(){
        for(let i=1;i<=50;i++){
            if(availableSeats.indexOf(i)===-1)
            document.getElementById(i.toString()).disabled=true;
        }
    }
    
    seats_initialize=function(){
        RenderSeats.user_earlier_bookings=[];
        retreiveBookingHistory();
        let history=JSON.parse(sessionStorage.getItem("user_history"));
        history.forEach((val) => {
            let ticket_date=parseInt(val.Date.split('-')[0]);
            let today=new Date().getDay();
            let day=parseInt(sessionStorage.getItem("day"));
            let show_date=new Date().getDate()+((day<today)?(7-today+day):(day-today));

            if(ticket_date===show_date&&val.Audi.substr(-1)===sessionStorage.getItem("audi")&&val.Slot===["9 AM","2 PM","7 PM"][parseInt(sessionStorage.getItem("slot"))-1])
            RenderSeats.user_earlier_bookings.push(...val.Seats);
        });
        console.log(RenderSeats.user_earlier_bookings);
    }

    modifySeat=function(event){
        let val=parseInt(event.target.id);
        if(RenderSeats.selected_seats.indexOf(val)!=-1)
        RenderSeats.selected_seats.splice(RenderSeats.selected_seats.indexOf(val),1);
        else RenderSeats.selected_seats.push(val);
    }
    
    static on_submit=(event)=>{
        event.preventDefault();
        if((RenderSeats.selected_seats.length+RenderSeats.user_earlier_bookings.length)>6){
            ReactDOM.render(<RenderMessage message="You can't book more than 6 seats for a show." color="red"/>,document.getElementById("message_placeholder"));
            return;
        }
        else if(RenderSeats.selected_seats.length<=0){
            ReactDOM.render(<RenderMessage message="Please select atleast 1 seat to book." color="red"/>,document.getElementById("message_placeholder"));
            return;
        }
        else {
            event.target.disabled=true;
            sessionStorage.setItem("Booked","false");
            sendFinalTicket(RenderSeats.selected_seats);
            if(sessionStorage.getItem("Booked")==="true"){
                ReactDOM.render(<RenderMessage message="Congratulations,your seats have been booked !! Please check your mail for the ticket." color="black"/>,document.getElementById("message_placeholder"));
            }
            else {
                ReactDOM.render(<RenderMessage message="Sorry these sets were booked just now by somebody else. Please select seats again !!" color="black"/>,document.getElementById("message_placeholder"));
            }
            retrieveAvailableSeats(sessionStorage.getItem("audi"),sessionStorage.getItem("slot"),sessionStorage.getItem("day"));//sets 'availableSeats' array   
            ReactDOM.render(<RenderSeats/>,document.getElementById("main_body"));
            RenderSeats.hideBookedSeats();
            RenderSeats.selected_seats=[];
            event.target.disabled=false;
        }
    }

    render(){
        this.seats_initialize();
        const seatmatrix=[];
        const n_rows=5;
        const n_columns=10;
        for(let i=0;i<n_rows;i++) {
            let seatrow=[];
            for(let j=1;j<=n_columns;j++){
                seatrow.push((<td><input onClick={this.modifySeat} id={10*i+j} type="checkbox"></input></td>));

                if(j===(n_columns/2))
                seatrow.push((<td><input type="checkbox" class="mid"></input></td>));
            }
            seatmatrix.push((
                <tr>
                    {seatrow}
                </tr>
            ));
        }

        return (
        <div id="main">
            <table>
                {seatmatrix}
            </table>
            <br></br>
            <button id="submit">Submit</button>
        </div>
        );
    }
};