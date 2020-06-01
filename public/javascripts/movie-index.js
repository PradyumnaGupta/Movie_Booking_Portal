

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
    activateSlot=function(e){
        let current_time=new Date();
        if(parseInt(sessionStorage.getItem("day"))===parseInt(current_time.getDay())){
            if(parseInt(current_time.getHours())>9)
            document.getElementById("A").disabled=true;
            if(parseInt(current_time.getHours())>14)
            document.getElementById("B").disabled=true;
            if(parseInt(current_time.getHours())>19)
            document.getElementById("C").disabled=true;
        }
        else {
            document.getElementById("A").disabled=false;
            document.getElementById("B").disabled=false;
            document.getElementById("C").disabled=false;
        }
    }
    render(){
        let weekdays=new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
        let today=new Date().getDay();
        let auditoriums=[];
        sessionStorage.setItem("slot","none");
        for(let i=0;i<this.props.data.length;i++)
        auditoriums.push((
            <tr class="audi">
                    <td>{this.props.data[i].Audi}</td>
                    <td><button id="A" onClick={(e)=>{sessionStorage.setItem("slot","1");sessionStorage.setItem("audi",this.props.data[i].Audi.substr(-1));}}> 9 AM </button></td>
                    <td><button id="B" onClick={(e)=>{sessionStorage.setItem("slot","2");sessionStorage.setItem("audi",this.props.data[i].Audi.substr(-1));}}> 2 PM </button></td>
                    <td><button id="C" onClick={(e)=>{sessionStorage.setItem("slot","3");sessionStorage.setItem("audi",this.props.data[i].Audi.substr(-1));}}> 7 PM </button></td>
            </tr>
        ));
        return(
            <div>
            <img id="image-placeholder" src={this.props.data[0].Poster_src}></img>
            <select id="Date-Buttons" onChange={(e)=>{document.getElementById("inner").style.display="table";document.getElementById("show_select").style.display="block";sessionStorage.setItem("day",weekdays.indexOf(e.target.value));this.activateSlot();}}>
                <option value="" disabled selected>Select a day</option>
                <option id="d1">{weekdays[today]}</option>
                <option id="d2">{weekdays[(today+1)%7]}</option>
                <option id="d3">{weekdays[(today+2)%7]}</option>
            </select>
            <table id="inner" style={{display:"none"}}>
            {auditoriums}
            </table>
            <button id="show_select" style={{display:"none"}} onClick={()=>{if(sessionStorage.getItem("slot")==="none"){alert("Select a time!!");return;};window.location.href="./seats.htm";}}>Submit</button>
            </div>
        );
    }
};


//main 

retreiveMoviesAndShows();

console.log(sessionStorage.getItem("movie_list"));
const rows=JSON.parse(sessionStorage.getItem("movie_list"));
let movies=[];

for(let i=0;i<rows.length;i++)
movies.push(rows[i].Movie_name);
movies=Array.from(new Set(movies));

ReactDOM.render(<RenderMovies data={movies}/>,document.getElementById('movlist'));

document.getElementById("logout").addEventListener('click',()=>{sessionStorage.setItem("authenticated","false");window.location.href="../login.htm";})
document.getElementById("home").addEventListener('click',()=>{window.location.href="../login.htm";})

