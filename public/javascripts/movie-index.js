const movie_details=function(event){
    let audi_array=[];
    for(let i=0;i<rows.length;i++){
        if(rows[i].Movie_name===event.target.innerHTML)
        audi_array.push(rows[i]);
    }
    ReactDOM.render(<RenderMovieDetails data={audi_array}/>,document.getElementById('movdetails'));
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
        let weekdays=new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
        let today=new Date().getDay();
        let auditoriums=[];
        for(let i=0;i<this.props.data.length;i++)
        auditoriums.push((
            <tr class="audi">
                    <td>{this.props.data[i].Audi}</td>
                    <td><button> 9 AM >></button></td>
                    <td><button> 2 PM >></button></td>
                    <td><button> 7 PM >></button></td>
            </tr>
        ));
        return(
            <div>
            <img id="image-placeholder" src={this.props.data[0].Poster_src}></img>
            <div id="Date-Buttons">
                <button id="d1">{weekdays[today]}</button>
                <button id="d2">{weekdays[(today+1)%7]}</button>
                <button id="d3">{weekdays[(today+2)%7]}</button>
            </div>
            <table id="inner">    
            {auditoriums}
            </table>
            <button id="show_select">Submit</button>
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

