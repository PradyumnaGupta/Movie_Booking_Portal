
let availableSeats=[];

const getAvailableSeats=function(){
    const server="http://192.168.1.4:4002";//ipconfigiserver-url
    const endpoint=`/seat_info/?audi=${sessionStorage.getItem("audi")}&slot=${sessionStorage.getItem("slot")}&day=${sessionStorage.getItem("day")}`;
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