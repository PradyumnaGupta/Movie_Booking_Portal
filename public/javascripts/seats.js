
let selected_seats=[];
let val;

const modifySeat=function(event){
    val=JSON.parse(event.target.value);
    if(selected_seats.indexOf(val)!=-1)
    selected_seats.splice(selected_seats.indexOf(val),1);
    else selected_seats.push(val);
}

const on_submit=function(){
    if(selected_seats.length>6){
        alert("You can't select more than 6 seats.");
        return;
    }
    else if(selected_seats.length<=0){
        alert("Please select atleast 1 seat to book.")
        return;
    }
    else {
        console.log("done");
    }
}

class Renderseats extends React.Component {
    render(){
        return (
        <div>
            <table>
                <tr>
                    <td><input onClick={modifySeat} value="1" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} value="2" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} value="3" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} value="4" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} value="5" type="checkbox"></input></td>
                    <td><input type="checkbox" class="mid"></input></td>
                    <td><input onClick={modifySeat} value="6" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} value="7" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} value="8" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} value="9" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} value="10" type="checkbox"></input></td>
                </tr>
                <tr>
                    <td><input onClick={modifySeat} value="11" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} value="12" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} value="13" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} value="14" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} value="15" type="checkbox"></input></td>
                    <td><input type="checkbox" class="mid"></input></td>
                    <td><input onClick={modifySeat} value="16" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} value="17" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} value="18" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} value="19" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} value="20" type="checkbox"></input></td>
                </tr>
                <tr>
                    <td><input onClick={modifySeat} value="21" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} value="22" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} value="23" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} value="24" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} value="25" type="checkbox"></input></td>
                    <td><input type="checkbox" class="mid"></input></td>
                    <td><input onClick={modifySeat} value="26" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} value="27" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} value="28" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} value="29" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} value="30" type="checkbox"></input></td>
                </tr>
                <tr>
                    <td><input onClick={modifySeat} value="31" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} value="32" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} value="33" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} value="34" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} value="35" type="checkbox"></input></td>
                    <td><input type="checkbox" class="mid"></input></td>
                    <td><input onClick={modifySeat} value="36" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} value="37" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} value="38" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} value="39" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} value="40" type="checkbox"></input></td>
                </tr>
                <tr>
                    <td><input onClick={modifySeat} value="41" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} value="42" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} value="43" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} value="44" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} value="45" type="checkbox"></input></td>
                    <td><input type="checkbox" class="mid"></input></td>
                    <td><input onClick={modifySeat} value="46" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} value="47" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} value="48" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} value="49" type="checkbox"></input></td>
                    <td><input onClick={modifySeat} value="50" type="checkbox"></input></td>
                </tr>
            </table>
            <button id="submit">Submit</button>
        </div>
        );
    }
};

getAvailableSeats();
ReactDOM.render(<Renderseats/>,document.getElementById("body"));


const submit_button=document.getElementById("submit");
submit_button.addEventListener("click",on_submit);
