
const deleteMovie=function(movie,audi){
    const server=sessionStorage.getItem("url");//ipconfigiserver-url
    const endpoint=server+`/remove_show/?movie=${movie}&audi=${audi}`;
    const xhr=new XMLHttpRequest();
    //xhr.responseType='json';
    xhr.onreadystatechange=()=>{
        if(xhr.readyState===XMLHttpRequest.DONE){
            console.log(xhr.response);
        }
    }
    xhr.open('GET',endpoint,false);
    xhr.send();    
}