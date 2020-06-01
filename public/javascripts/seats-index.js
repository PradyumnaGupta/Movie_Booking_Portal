
let selected_seats=[];
let val;

const modifySeat=function(event){
    val=JSON.parse(event.target.id);
    if(selected_seats.indexOf(val)!=-1)
    selected_seats.splice(selected_seats.indexOf(val),1);
    else selected_seats.push(val);
}

const on_submit=function(event){
    event.preventDefault();
    if(selected_seats.length>6){
        alert("You can't select more than 6 seats.");
        return;
    }
    else if(selected_seats.length<=0){
        alert("Please select atleast 1 seat to book.");
        return;
    }
    else {
        sessionStorage.getItem("Booked")==="false";
        sendFinalTicket(selected_seats);
        if(sessionStorage.getItem("Booked")==="true")
        alert("Congratulations,your seats have been booked !!");
        else {
            window.location.reload();
        }
    }
}

class Renderseats extends React.Component {
    render(){
        return (
        <div id="main">
            <table>
                <tr>
                    <td><input onClick={modifySeat} id="1" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} id="2" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} id="3" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} id="4" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} id="5" type="checkbox"></input></td>
                    <td><input type="checkbox" class="mid"></input></td>
                    <td><input onClick={modifySeat} id="6" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} id="7" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} id="8" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} id="9" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} id="10" type="checkbox"></input></td>
                </tr>
                <tr>
                    <td><input onClick={modifySeat} id="11" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} id="12" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} id="13" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} id="14" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} id="15" type="checkbox"></input></td>
                    <td><input type="checkbox" class="mid"></input></td>
                    <td><input onClick={modifySeat} id="16" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} id="17" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} id="18" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} id="19" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} id="20" type="checkbox"></input></td>
                </tr>
                <tr>
                    <td><input onClick={modifySeat} id="21" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} id="22" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} id="23" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} id="24" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} id="25" type="checkbox"></input></td>
                    <td><input type="checkbox" class="mid"></input></td>
                    <td><input onClick={modifySeat} id="26" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} id="27" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} id="28" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} id="29" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} id="30" type="checkbox"></input></td>
                </tr>
                <tr>
                    <td><input onClick={modifySeat} id="31" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} id="32" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} id="33" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} id="34" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} id="35" type="checkbox"></input></td>
                    <td><input type="checkbox" class="mid"></input></td>
                    <td><input onClick={modifySeat} id="36" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} id="37" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} id="38" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} id="39" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} id="40" type="checkbox"></input></td>
                </tr>
                <tr>
                    <td><input onClick={modifySeat} id="41" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} id="42" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} id="43" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} id="44" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} id="45" type="checkbox"></input></td>
                    <td><input type="checkbox" class="mid"></input></td>
                    <td><input onClick={modifySeat} id="46" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} id="47" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} id="48" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} id="49" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} id="50" type="checkbox"></input></td>
                </tr>
            </table>
            <br></br>
            <button id="submit">Submit</button>
        </div>
        );
    }
};

getAvailableSeats();    

ReactDOM.render(<Renderseats/>,document.getElementById("main_body"));

console.log(availableSeats);
for(let i=1;i<=50;i++){
    if(availableSeats.indexOf(i)===-1)
    document.getElementById(i.toString()).disabled=true;
}

const submit_button=document.getElementById("submit");
submit_button.addEventListener("click",on_submit);

document.getElementById("logout").addEventListener('click',()=>{sessionStorage.setItem("authenticated","false");window.location.href="../login.htm";})
document.getElementById("home").addEventListener('click',()=>{window.location.href="../login.htm";})