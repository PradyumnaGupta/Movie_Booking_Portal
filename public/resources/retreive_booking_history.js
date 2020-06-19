
const retreiveBookingHistory=function(){
    const server=sessionStorage.getItem("url");
    const endpoint=server+`/user/bookings/?user=${sessionStorage.getItem("Username")}`;
    const xhr=new XMLHttpRequest();
    //xhr.responseType='json';
    xhr.onreadystatechange=()=>{
        if(xhr.readyState===XMLHttpRequest.DONE){
            if(xhr.response)
            sessionStorage.setItem("user_history",xhr.response);
            else 
            sessionStorage.setItem("user_history","[]");
        }
    }
    xhr.open('GET',endpoint,false);
    xhr.send();
}