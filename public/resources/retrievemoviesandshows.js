
function retreiveMoviesAndShows(){

    const server="http://192.168.1.4:4002";//ipconfigiserver-url
    const endpoint='/movies_info/';
    const xhr=new XMLHttpRequest();
    //xhr.responseType='json';
    xhr.onreadystatechange=()=>{
        if(xhr.readyState===XMLHttpRequest.DONE){
            let res=xhr.response;
            //console.log(JSON.parse(res));
            sessionStorage.setItem("movie_list",res);
        }
    }
    xhr.open('GET',endpoint,false);
    xhr.send();
}