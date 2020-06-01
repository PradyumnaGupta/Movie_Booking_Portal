
const sendFinalTicket=function(seats){
    const server=sessionStorage.getItem("url");//ipconfigiserver-url
    const endpoint=server+`/submit_ticket/?user=${sessionStorage.getItem("Username")}&movie=${sessionStorage.getItem("movie")}&audi=${sessionStorage.getItem("audi")}&slot=${sessionStorage.getItem("slot")}&day=${sessionStorage.getItem("day")}&seats=${JSON.stringify(seats)}`;
    const xhr=new XMLHttpRequest();
    //xhr.responseType='json';
    xhr.onreadystatechange=()=>{
        if(xhr.readyState===XMLHttpRequest.DONE){
            console.log(xhr.response);
            if(xhr.response==="SEATS NOT FOUND"){
                alert("Sorry these sets were booked just now. Please select seats again !!");
                sessionStorage.setItem("Booked","false");
                return;
            }
            else {
                sessionStorage.setItem("Booked","true");
            }
            return;
        }
    }
    xhr.open('GET',endpoint,false);
    xhr.send();
}
