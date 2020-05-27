const movie_details=function(event){
    let audi_array=[];
    sessionStorage.setItem("movie",event.target.innerHTML);
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
                    <td><button onClick={(e)=>{sessionStorage.setItem("slot","1");sessionStorage.setItem("audi",this.props.data[i].Audi.substr(-1));}}> 9 AM >></button></td>
                    <td><button onClick={(e)=>{sessionStorage.setItem("slot","2");sessionStorage.setItem("audi",this.props.data[i].Audi.substr(-1));}}> 2 PM >></button></td>
                    <td><button onClick={(e)=>{sessionStorage.setItem("slot","3");sessionStorage.setItem("audi",this.props.data[i].Audi.substr(-1));}}> 7 PM >></button></td>
            </tr>
        ));
        return(
            <div>
            <img id="image-placeholder" src={this.props.data[0].Poster_src}></img>
            <div id="Date-Buttons">
                <button id="d1" onClick={()=>{sessionStorage.setItem("day",today)}}>{weekdays[today]}</button>
                <button id="d2" onClick={()=>{sessionStorage.setItem("day",(today+1)%7)}}>{weekdays[(today+1)%7]}</button>
                <button id="d3" onClick={()=>{sessionStorage.setItem("day",(today+2)%7)}}>{weekdays[(today+2)%7]}</button>
            </div>
            <table id="inner">    
            {auditoriums}
            </table>
            <button id="show_select" onClick={()=>{window.location.href="./seats.htm"}}>Submit</button>
            </div>
        );
    }
};


//main 

retreiveMoviesAndShows();

console.log(sessionStorage.getItem("movie_list"));
const rows=JSON.parse(sessionStorage.getItem("movie_list"));
const movies=[];

for(let i=0;i<rows.length;i++)
movies.push(rows[i].Movie_name);

ReactDOM.render(<RenderMovies data={movies}/>,document.getElementById('movlist'));

