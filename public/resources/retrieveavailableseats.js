
let availableSeats=[];

const retrieveAvailableSeats=function(){
    const server=sessionStorage.getItem("url");//ipconfigiserver-url
    const endpoint=server+`/seat_info/?audi=${sessionStorage.getItem("audi")}&slot=${sessionStorage.getItem("slot")}&day=${sessionStorage.getItem("day")}`;
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