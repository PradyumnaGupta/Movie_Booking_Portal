
class RenderMovieSlideShow extends React.Component{
    static slideIndex=1;

    static showSlides=function(n) {
        const slides=document.querySelectorAll(".mySlides");
        const dots=document.querySelectorAll(".dot");
        slides.forEach((val) => {
            val.style.display="none";
        });
        dots.forEach((val)=>{
            val.className = val.className.replace(" active", "");
        });
        slides[RenderMovieSlideShow.slideIndex].style.display = "block";
        dots[RenderMovieSlideShow.slideIndex].className += " active";
        
        RenderMovieSlideShow.slideIndex=(RenderMovieSlideShow.slideIndex+1)%movie_posters.length;

        setTimeout(RenderMovieSlideShow.showSlides,1500);
    }

    moveSlide=function(e) {
        RenderMovieSlideShow.showSlides(RenderMovieSlideShow.slideIndex = e.target.id);
    }

    render(){
        let slides=this.props.data.map((val,index)=>{
            return (
                <div class="mySlides fade">
                    <div class="numbertext">{index+1} / {this.props.data.length}</div>
                    <img src={val}></img>
                    {/*<div class="text">Caption Text</div>*/}
                </div>
            )
        });
        let dots=this.props.data.map((_,index)=>{return (<span id={index} class="dot" onClick={this.moveSlide}></span>)});
        return (
            <div>
                {slides}
                <br></br>
                <div>
                    {dots}
                </div>
                <hr></hr>
            </div>
        );
    }
}


class RenderMovies extends React.Component{

    movie_details=function(event){
        let audi_array=[];
        for(let i=0;i<rows.length;i++){
            if(rows[i].Movie_name===event.currentTarget.value)
            audi_array.push(rows[i]);
        }
        ReactDOM.render(<RenderMovieDetails data={audi_array} movie={event.currentTarget.value}/>,document.getElementById(`showdetails_${event.currentTarget.value}`));
    }

    render(){
        let movieList=this.props.data[0].map((val,index)=>{
            return(
            <div class="movie">
                <img src={this.props.data[1][index]}></img>
                <div id={`showdetails_${val}`}><button class="button" onClick={this.movie_details} value={val}><span>{val}</span></button></div>
            </div>
            );
        });
        return(
            <div>
                <span id="ongoing_text">Currently Ongoing Movies...</span>
                <br></br>
                {movieList}
            </div>
        );
    }
}

class RenderMovieDetails extends React.Component{
    activateSlot=function(e){
        let current_time=new Date();
        this.props.data.forEach((val)=>{
            if(parseInt(sessionStorage.getItem("day"))===parseInt(current_time.getDay())){
                if(parseInt(current_time.getHours())>9)
                document.querySelectorAll(`#${val.Audi.slice(-1)} .A`).forEach(val=>{val.disabled=true});
                if(parseInt(current_time.getHours())>14)
                document.querySelectorAll(`#${val.Audi.slice(-1)} .B`).forEach(val=>{val.disabled=true});
                if(parseInt(current_time.getHours())>19)
                document.querySelectorAll(`#${val.Audi.slice(-1)} .C`).forEach(val=>{val.disabled=true});
            }
            else {
                document.querySelectorAll(`#${val.Audi.slice(-1)} .A`).forEach(val=>{val.disabled=false});
                document.querySelectorAll(`#${val.Audi.slice(-1)} .B`).forEach(val=>{val.disabled=false});
                document.querySelectorAll(`#${val.Audi.slice(-1)} .C`).forEach(val=>{val.disabled=false});
            }
        })
    }

    alertFastFillingSeats=async function(){
        this.props.data.forEach((val)=>{
            retrieveAvailableSeats(val.Audi.slice(-1),"1",sessionStorage.getItem("day"));
            if(availableSeats.length<10)
            document.querySelector(`#${val.Audi.slice(-1)} .A`).style.background="orangered";
            else 
            document.querySelector(`#${val.Audi.slice(-1)} .A`).style.background="#fee23e";

            retrieveAvailableSeats(val.Audi.slice(-1),"2",sessionStorage.getItem("day"));
            if(availableSeats.length<10)
            document.querySelector(`#${val.Audi.slice(-1)} .B`).style.background="orangered";
            else 
            document.querySelector(`#${val.Audi.slice(-1)} .B`).style.background="#fee23e";

            retrieveAvailableSeats(val.Audi.slice(-1),"3",sessionStorage.getItem("day"));
            if(availableSeats.length<10)
            document.querySelector(`#${val.Audi.slice(-1)} .C`).style.background="orangered";
            else 
            document.querySelector(`#${val.Audi.slice(-1)} .C`).style.background="#fee23e";
        });
    }

    render(){
        let weekdays=new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
        let today=new Date();
        let tommorow=new Date(); tommorow.setDate(tommorow.getDate()+1);
        let day_after_tommorow=new Date(); day_after_tommorow.setDate(day_after_tommorow.getDate()+2);
        let auditoriums=[];
        sessionStorage.setItem("slot","none");
        for(let i=0;i<this.props.data.length;i++)
        auditoriums.push((
            <tr class="audi" id={this.props.data[i].Audi.slice(-1)}>
                    <td>{this.props.data[i].Audi}</td>
                    <td><button class="A" onClick={(e)=>{sessionStorage.setItem("slot","1");sessionStorage.setItem("audi",this.props.data[i].Audi.substr(-1));}}> 9 AM </button></td>
                    <td><button class="B" onClick={(e)=>{sessionStorage.setItem("slot","2");sessionStorage.setItem("audi",this.props.data[i].Audi.substr(-1));}}> 2 PM </button></td>
                    <td><button class="C" onClick={(e)=>{sessionStorage.setItem("slot","3");sessionStorage.setItem("audi",this.props.data[i].Audi.substr(-1));}}> 7 PM </button></td>
            </tr>
        ));
        return(
            <div>
            <select id="Date-Buttons" onChange={(e)=>{document.getElementById(`inner ${this.props.movie}`).style.display="table";document.getElementById(`show_select ${this.props.movie}`).style.display="block";sessionStorage.setItem("day",weekdays.indexOf(e.target.value.split('-')[0]));this.activateSlot();this.alertFastFillingSeats();}}>
                <option value="" disabled selected>Select a day</option>
                <option id="d1">{weekdays[today.getDay()]}-{today.getDate()}/{today.getMonth()}/{today.getFullYear()}</option>
                <option id="d2">{weekdays[(today.getDay()+1)%7]}-{tommorow.getDate()}/{tommorow.getMonth()}/{tommorow.getFullYear()}</option>
                <option id="d3">{weekdays[(today.getDay()+2)%7]}-{day_after_tommorow.getDate()}/{day_after_tommorow.getMonth()}/{day_after_tommorow.getFullYear()}</option>
            </select>
            <table id={`inner ${this.props.movie}`} class="inner" style={{display:"none"}}>
            {auditoriums}
            </table>
            <button id={`show_select ${this.props.movie}`} class="show_select" style={{display:"none"}} onClick={()=>{if(sessionStorage.getItem("slot")==="none"){alert("Select a time!!");return;};sessionStorage.setItem("movie",this.props.movie);window.location.href="./seats.htm";}}>Submit</button>
            </div>
        );
    }
};


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
