
const addMovie=function(new_movie,new_audi,new_poster){

    if(!new_audi||!new_movie||!new_poster){
        alert("Please fill all fields.");
        return;
    }

    if(!(/^[A-Za-z0-9 ]+$/.test(new_movie))){
        alert("No special characters allowed in movie name.");
        return;
    }

    if(!(/^[A-Za-z0-9 ]+$/.test(new_audi))){
        alert("No special characters allowed in auditorium name.");
        return;
    }

    if(!(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/.test(new_poster))){
        alert("Please enter a valid url.");
        return;
    }

    if((JSON.parse(sessionStorage.getItem("movie_list"))).length>=4){
        alert("Sorry,you can't have more than 4 auditoriums at a time.");
        return;
    }

    if((JSON.parse(sessionStorage.getItem("movie_list"))).find((val)=>{return new_movie===val.Movie_name}).Movie_name===new_movie){
        alert("Sorry this movie is already in the house.");
        return;
    }

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