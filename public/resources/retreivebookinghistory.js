
const retreiveBookingHistory=function(){
    const server="http://192.168.1.4:4002";//ipconfigiserver-url
    const endpoint=`/history/?user=${sessionStorage.getItem("Username")}`;
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