
//main 

retreiveMoviesAndShows();//will fetch and store the list in sessionStorage

const rows=JSON.parse(sessionStorage.getItem("movie_list"));

let movies=[],movie_posters=[];

for(let i=0;i<rows.length;i++){
    movies.push(rows[i].Movie_name);
    movie_posters.push(rows[i].Poster_src);
}
movies=Array.from(new Set(movies));
movie_posters=Array.from(new Set(movie_posters));

ReactDOM.render(<RenderMovieSlideShow data={movie_posters}/>,document.getElementById("slideshow_container"));
RenderMovieSlideShow.showSlides();
ReactDOM.render(<RenderMovies data={[movies,movie_posters,rows]}/>,document.getElementById("movies_list"));

document.getElementById("logout").addEventListener('click',()=>{sessionStorage.setItem("authenticated","false");window.location.href="../home.htm";})
document.getElementById("home").addEventListener('click',()=>{window.location.href="../home.htm";})
