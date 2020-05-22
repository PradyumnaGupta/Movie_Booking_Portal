const movie_details=function(event){
    let audi_array=[];
    for(let i=0;i<rows.length;i++){
        if(rows[i].Movie_name===event.target.innerHTML)
        audi_array.push(rows[i]);
    }
    ReactDOM.render(<RenderMovieDetails data={audi_array}/>,document.getElementById('movdetails'))
}

class RenderMovies extends React.Component{
    render(){
        let movies=this.props.data.map((name,index)=>{
           return <li onClick={movie_details}>{name}</li>;
        });
        return(
            <ul id="movie_list">
                {movies}
            </ul>   
        );
    }
};

class RenderMovieDetails extends React.Component{
    render(){
        return(
            <div>
            <div id="image-placeholder"></div>
            <div id="Date-Buttons">
                <button id="d1">Sun</button>
                <button id="d2">Mon</button>
                <button id="d3">Tue</button>
            </div>
            <table id="inner">
                <tr class="audi">
                    <td> Auditorium A</td>
                    <td><button> 9 AM >></button></td>
                    <td><button> 2 PM >></button></td>
                    <td><button> 7 PM >></button></td>
                </tr>
                <tr class="audi"></tr>
            </table>
            </div>
        );
    }
};


//main 

retreiveMoviesAndShows();

const rows=JSON.parse(sessionStorage.getItem("movie_list"));
const movies=[];

for(let i=0;i<rows.length;i++)
movies.push(rows[i].Movie_name);

ReactDOM.render(<RenderMovies data={movies}/>,document.getElementById('movlist'));

