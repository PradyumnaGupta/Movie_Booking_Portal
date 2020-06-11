
let availableSeats=[];

const retrieveAvailableSeats=function(audi,slot,day){
    const server=sessionStorage.getItem("url");//ipconfigiserver-url
    const endpoint=server+`/seat_info/?audi=${audi}&slot=${slot}&day=${day}`;
    const xhr=new XMLHttpRequest();
    //xhr.responseType='json';
    xhr.onreadystatechange=()=>{
        if(xhr.readyState===XMLHttpRequest.DONE){
            availableSeats=JSON.parse(xhr.response);
        }
    }
    xhr.open('GET',endpoint,false); 
    xhr.send();
}