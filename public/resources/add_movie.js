
const addMovie=function(new_movie,new_audi,new_poster){
    const server=sessionStorage.getItem("url");//ipconfigiserver-url
    const endpoint=server+`/movies/?movie=${new_movie}&audi=${new_audi}&poster_src=${new_poster}`;
    const xhr=new XMLHttpRequest();
    //xhr.responseType='json';
    xhr.onreadystatechange=()=>{
        if(xhr.readyState===XMLHttpRequest.DONE){
            //console.log(xhr.response);
        }
    }
    xhr.open('PUT',endpoint,false);
    xhr.send();
}