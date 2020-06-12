
function retreiveMoviesAndShows(){

    const server=sessionStorage.getItem("url");//ipconfigiserver-url
    const endpoint=server+'/movies/';
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