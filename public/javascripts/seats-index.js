
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

    static hideBookedSeats=function(){
        for(let i=1;i<=50;i++){
            if(availableSeats.indexOf(i)===-1)
            document.getElementById(i.toString()).disabled=true;
        }
    }
    
    modifySeat=function(event){
        let val=parseInt(event.target.id);
        if(RenderSeats.selected_seats.indexOf(val)!=-1)
        RenderSeats.selected_seats.splice(RenderSeats.selected_seats.indexOf(val),1);
        else RenderSeats.selected_seats.push(val);
    }
    
    static on_submit=(event)=>{
        event.preventDefault();
        if(RenderSeats.selected_seats.length>6){
            ReactDOM.render(<RenderMessage message="You can't select more than 6 seats." color="red"/>,document.getElementById("message_placeholder"));
            return;
        }
        else if(RenderSeats.selected_seats.length<=0){
            ReactDOM.render(<RenderMessage message="Please select atleast 1 seat to book." color="red"/>,document.getElementById("message_placeholder"));
            return;
        }
        else {
            sessionStorage.setItem("Booked","false");
            sendFinalTicket(RenderSeats.selected_seats);
            if(sessionStorage.getItem("Booked")==="true"){
                ReactDOM.render(<RenderMessage message="Congratulations,your seats have been booked !! Please check your mail for the ticket." color="black"/>,document.getElementById("message_placeholder"));
                retrieveAvailableSeats();
                ReactDOM.render(<RenderSeats/>,document.getElementById("main_body"));
                RenderSeats.hideBookedSeats();
                RenderSeats.selected_seats=[];
            }
            else {
                window.location.reload();
            }
        }
    }

    render(){
        const seatmatrix=[];
        const n_rows=5;
        for(let i=0;i<n_rows;i++) {
            seatmatrix.push((
                <tr>
                    <td><input onClick={this.modifySeat} id={10*i+1} type="checkbox"></input></td>
                    <td><input onClick={this.modifySeat} id={10*i+2} type="checkbox"></input></td>
                    <td><input onClick={this.modifySeat} id={10*i+3} type="checkbox"></input></td>
                    <td><input onClick={this.modifySeat} id={10*i+4} type="checkbox"></input></td>
                    <td><input onClick={this.modifySeat} id={10*i+5} type="checkbox"></input></td>
                    <td><input type="checkbox" class="mid"></input></td>
                    <td><input onClick={this.modifySeat} id={10*i+6} type="checkbox"></input></td>
                    <td><input onClick={this.modifySeat} id={10*i+7} type="checkbox"></input></td>
                    <td><input onClick={this.modifySeat} id={10*i+8} type="checkbox"></input></td>
                    <td><input onClick={this.modifySeat} id={10*i+9} type="checkbox"></input></td>
                    <td><input onClick={this.modifySeat} id={10*i+10} type="checkbox"></input></td>
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

//main

retrieveAvailableSeats();//sets 'availableSeats' array   

ReactDOM.render(<RenderSeats/>,document.getElementById("main_body"));

RenderSeats.hideBookedSeats();


const submit_button=document.getElementById("submit");
submit_button.addEventListener("click",RenderSeats.on_submit);

document.getElementById("logout").addEventListener('click',()=>{sessionStorage.setItem("authenticated","false");window.location.href="../login.htm";})
document.getElementById("home").addEventListener('click',()=>{window.location.href="../login.htm";})