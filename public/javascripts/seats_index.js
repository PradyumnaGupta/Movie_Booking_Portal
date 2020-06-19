
//main

retrieveAvailableSeats(sessionStorage.getItem("audi"),sessionStorage.getItem("slot"),sessionStorage.getItem("day"));//sets 'availableSeats' array   

console.log(availableSeats);

ReactDOM.render(<RenderSeats/>,document.getElementById("main_body"));

RenderSeats.hideBookedSeats();

const submit_button=document.getElementById("submit");
submit_button.addEventListener("click",RenderSeats.on_submit);

document.getElementById("logout").addEventListener('click',()=>{sessionStorage.setItem("authenticated","false");window.location.href="../home.htm";})
document.getElementById("home").addEventListener('click',()=>{window.location.href="../home.htm";})