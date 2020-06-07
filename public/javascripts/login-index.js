
const url="http://989d5db1b596.ngrok.io";
sessionStorage.setItem("url",url);

class RenderLRButtons extends React.Component{
    render(){
        return (
            <div id="buttons">
            <span>Already a User ?</span>
            <button id="login-button">Login</button>
            <br></br>
            <span>New User ?</span>
            <button id="register-button">Register</button>
            </div>
        );
    }
};

class RenderLoginFields extends React.Component{
    render(){
        return (
            <div id="login-input">
                <br></br>
                <form>
                    <input type="text" placeholder="Enter Username" id="user"></input>
                    <input type="password" placeholder="Enter Password" id="pass"></input>
                    <br></br>
                    <input type="submit" id="submit" value="Submit" class="submit"></input>
                    <input type="submit" id="back" value="Back" class="submit" onClick={()=>{event.preventDefault();window.location.reload()}}></input>
                </form>
            </div>
        );
    }
};

class RenderRegisterFields extends React.Component{
    render(){
        return (
            <div id="register-input">
                <form>
                    <input type="text" placeholder="Username" id="user"></input>
                    <input type="password" placeholder="Password" id="pass"></input>
                    <br></br>
                    <input type="text" placeholder="Email" id="email"></input>
                    <input type="text" placeholder="Phone no." id="phone"></input>
                    <br></br>
                    <input type="submit" placeholder="Submit" id="submit" class="submit"></input>
                    <input type="submit" id="back" value="Back" class="submit" onClick={()=>{event.preventDefault();window.location.reload()}}></input>
                </form>
            </div>
        );
    }
};

class RenderForwardButtons extends React.Component{
    render(){
        return (
            <div id="forward-buttons">
                <span style={{cursor:"pointer",textDecoration:"underline"}} onClick={()=>{sessionStorage.setItem("authenticated","false");window.location.reload();}}>Hey {sessionStorage.getItem('Username')}</span>
                <br></br>
                <button id="book-history" onClick={getBookingHistory}>Booking History >></button>
                <button id="book-your-movie" onClick={()=>{window.location.href="./movies.htm"}}>Book Your Show >></button>
            </div>
        );
    }
};

class RenderUserHistory extends React.Component{
    render(){
        const user_history=this.props.data.slice(0).reverse().map((val)=>{
            return (
                <tr>
                    <td>{val.Date}</td>
                    <td>{val.Movie}</td>
                    <td>{val.Audi}</td>
                    <td>{val.Slot}</td>
                    <td>{val.Seats.join(',')}</td>
                </tr>
            )
        });

        const recent_user_history=this.props.data.slice(0).reverse().reduce((recent,val)=>{
            if(val.Date.split('-')[1]===(new Date().getMonth()+1).toString())
            recent.push((
                <tr>
                    <td>{val.Date}</td>
                    <td>{val.Movie}</td>
                    <td>{val.Audi}</td>
                    <td>{val.Slot}</td>
                    <td>{val.Seats.join(',')}</td>
                </tr>                
            ));
            return recent;
        },[]);

        if(!user_history.length){
            user_history.push((<tr class="no_history"><td colspan="5">Hmmm.... it's so lonely here. Looks like you haven't booked any movie in a while. Click on the button above and choose your show right away !!!</td></tr>));
            recent_user_history.push((<tr class="no_history"><td colspan="5">Hmmm.... it's so lonely here. Looks like you haven't booked any movie in a while. Click on the button above and choose your show right away !!!</td></tr>));
         } else if (!recent_user_history.length) recent_user_history.push((<tr class="no_history"><td colspan="5">Hmmm.... it's so lonely here. Looks like you haven't booked any movie in a while. Click on the button above and choose your show right away !!!</td></tr>));
        
        const highlightactive=(id)=>{
            document.querySelectorAll('h4').forEach((val)=>{val.style.color="grey"});
            document.getElementById(id).style.color="black";
        }

        return(
            <div>
            <h3>Booking History</h3>   
            <div id="history_tabs">
            <h4 id="recent" class="tab" onClick={(e)=>{ReactDOM.render(recent_user_history,document.getElementById("list"));highlightactive(e.target.id)}}>Recent Bookings</h4>
            <h4 id="past" class="tab" onClick={(e)=>{ReactDOM.render(user_history,document.getElementById("list"));highlightactive(e.target.id)}}>Past Bookings</h4>
            </div>
            <hr></hr>
            <table id="booking_history">
                <thead>
                <tr>
                    <td>Date</td>
                    <td>Movie</td>
                    <td>Auditorium</td>
                    <td>Time Slot</td>
                    <td>Seats</td>
                </tr>
                </thead>
                <tbody id="list">
                    {recent_user_history}
                </tbody>
            </table>
            </div>
        )
    }
};

class RenderAdminForm extends React.Component{
    render(){
        retreiveMoviesAndShows();
        const rows=JSON.parse(sessionStorage.getItem("movie_list"));
        const shows=rows.map((item)=>{
            return (
                <tr>
                    <td>{item.Movie_name}</td>
                    <td>{item.Audi}</td>
                    <td><a href={item.Poster_src}>{item.Poster_src}</a></td>
                </tr>
            )
        });
        const removal=rows.map((item)=>{
            return(
                <option value={[item.Movie_name,item.Audi]}>{item.Audi}-{item.Movie_name}</option>
            )
        });
        const adder=()=>{
            let new_audi=document.getElementById("new_audi").value;
            let new_movie=document.getElementById("new_movie").value;
            let new_poster=document.getElementById("new_poster").value;
            if(new_audi==="Add an auditorium") new_audi=document.getElementById("add_audi").value;
            addMovie(new_movie,new_audi,new_poster);
            ReactDOM.render(<RenderAdminForm/>,document.getElementById("main"));
        };
        return(
            <div id="Admin_Form">
                <h2>Add a Movie/Auditorium</h2>
                <form id="add_movie">
                    <select id="new_audi" onChange={(e)=>{if(e.target.value==="Add an auditorium") document.getElementById("add_audi").style.display="block";}}>
                        <option>Auditorium A</option>
                        <option>Auditorium B</option>
                        <option>Auditorium C</option>
                        <option>Add an auditorium</option>
                    </select>
                    <div id="add_movie_fields">
                    <input type="text" style={{display:"none"}} placeholder="Enter auditorium name" id="add_audi"></input>
                    <input type="text" id ="new_movie" placeholder="Enter movie name"></input>
                    <input type="text" id="new_poster" placeholder="Enter poster source url"></input>
                    </div>
                </form>
                <button onClick={adder}>Submit</button>
                <h2>Remove a Movie/Auditorium</h2>
                <select id="remove_movie">
                    {removal}
                </select>
                <button onClick={()=>{deleteMovie(document.getElementById("remove_movie").value.split(',')[0],document.getElementById("remove_movie").value.split(',')[1]);ReactDOM.render(<RenderAdminForm/>,document.getElementById("main"));}}>Submit</button>
                <h2>Currently ongoing movies at the auditoriums:</h2>
                <table>
                    <thead>
                        <tr>
                            <td>Movie</td>
                            <td>Auditorium</td>
                            <td>Poster_src</td>
                        </tr>
                    </thead>
                    {shows}
                </table>
            </div>
        )
    }
}


const getBookingHistory=function(){
    retreiveBookingHistory();//user history set in session storage in this function.
    let hist=JSON.parse(sessionStorage.getItem("user_history"));
    ReactDOM.render(<RenderUserHistory data={hist}/>,document.getElementById("main"));  
}

const call_auth_user=function(event){
    event.preventDefault();
    sessionStorage.setItem("Admin-Login","false");
    authenticateUser();
    if(sessionStorage.getItem("Admin-Login")==="true"){
        document.getElementById("top-bar").removeChild(document.getElementById("authentication-fields"));
        ReactDOM.render(<RenderAdminForm/>,document.getElementById("main"));
    }
    else{
        if(sessionStorage.getItem('authenticated')==="true"){
            ReactDOM.render(<RenderForwardButtons/>,document.getElementById('authentication-fields'));
        }
    }
}

const call_create_user=function(event){
    event.preventDefault();
    createUser();
    if(sessionStorage.getItem('authenticated')==="true"){
        ReactDOM.render(<RenderForwardButtons/>,document.getElementById('authentication-fields'));
    }
}

const loginEvent=function(event) {
    event.preventDefault();
    ReactDOM.render(<RenderLoginFields/>,document.getElementById('authentication-fields'));
    const login_submit=document.getElementById('submit');
    sessionStorage.setItem("authenticated","false");
    login_submit.addEventListener('click',call_auth_user);
}

const registerEvent=function(event){
    event.preventDefault();
    ReactDOM.render(<RenderRegisterFields/>,document.getElementById('authentication-fields'));
    const register_submit=document.getElementById('submit');
    sessionStorage.setItem('authenticated',"false");
    register_submit.addEventListener('click',call_create_user);
}

//main

if(sessionStorage.getItem("authenticated")==="true"){
    ReactDOM.render(<RenderForwardButtons/>,document.getElementById('authentication-fields'));
}

else{
    ReactDOM.render(<RenderLRButtons/>,document.getElementById('authentication-fields'));
    const login=document.getElementById("login-button");
    const register=document.getElementById("register-button");

    login.addEventListener('click',loginEvent);
    register.addEventListener('click',registerEvent);
}

//slideshow

let pic_index=0;
setInterval(()=>{
    pic_index=(pic_index+1)%3;
    for(let i=0;i<3;i++){
        if(i===pic_index)
        continue;
        else
        document.getElementById(`mySlides_fade ${i+1}`).style.display="none";
    }
    document.getElementById(`mySlides_fade ${pic_index+1}`).style.display="block";
},2000);