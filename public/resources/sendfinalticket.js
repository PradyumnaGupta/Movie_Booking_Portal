
const sendFinalTicket=function(seats){
    const server="http://192.168.1.4:4002";//ipconfigiserver-url
    const endpoint=`/submit_ticket/?user=${sessionStorage.getItem("Username")}&movie=${sessionStorage.getItem("movie")}&audi=${sessionStorage.getItem("audi")}&slot=${sessionStorage.getItem("slot")}&day=${sessionStorage.getItem("day")}&seats=${JSON.stringify(seats)}`;
    const xhr=new XMLHttpRequest();
    //xhr.responseType='json';
    xhr.onreadystatechange=()=>{
        if(xhr.readyState===XMLHttpRequest.DONE){
            console.log(xhr.response);
            if(xhr.response==="SEATS NOT FOUND")
            alert("Sorry these sets were booked just now. Please reload the page and select seats again !!");
            else 
            sessionStorage.setItem("Booked","true");
        }
    }
    xhr.open('GET',endpoint,false);
    xhr.send();
}
