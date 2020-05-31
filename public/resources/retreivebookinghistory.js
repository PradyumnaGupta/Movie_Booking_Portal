
const retreiveBookingHistory=function(){
    const server=url;
    const endpoint=server+`/history/?user=${sessionStorage.getItem("Username")}`;
    const xhr=new XMLHttpRequest();
    //xhr.responseType='json';
    xhr.onreadystatechange=()=>{
        if(xhr.readyState===XMLHttpRequest.DONE){
            sessionStorage.setItem("user_history",xhr.response);
        }
    }
    xhr.open('GET',endpoint,false);
    xhr.send();
}