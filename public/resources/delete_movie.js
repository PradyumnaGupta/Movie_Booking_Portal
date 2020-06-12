
const deleteMovie=function(movie,audi){
    const server=sessionStorage.getItem("url");//ipconfigserver-url
    const endpoint=server+`/movies/?movie=${movie}&audi=${audi}`;
    const xhr=new XMLHttpRequest();
    //xhr.responseType='json';
    xhr.onreadystatechange=()=>{
        if(xhr.readyState===XMLHttpRequest.DONE){
            if(xhr.response==="ERROR"){
                if(confirm("There are seats already booked corresponding to this show. Are you sure you want to remove this ?"))
                deleteMovie(movie,audi);
            }
        }
    }
    xhr.open('DELETE',endpoint,false);
    xhr.send();    
}