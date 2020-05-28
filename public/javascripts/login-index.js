
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
                    {/*<label for="user">Enter Username:</label>*/}
                    <input type="text" placeholder="Username" id="user"></input>
                    {/*<label for="pass">Enter Password:</label>*/}
                    <input type="password" placeholder="Password" id="pass"></input>
                    <br></br>
                    <input type="submit" placeholder="Submit" id="submit"></input>
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
                    {/*<label for="user">Enter Username:</label>*/}
                    <input type="text" placeholder="Username" id="user"></input>
                    {/*<label for="pass">Enter Password:</label>*/}
                    <input type="password" placeholder="Password" id="pass"></input>
                    <br></br>
                    {/*<label for="email">Enter Email:</label>*/}
                    <input type="text" placeholder="Email" id="email"></input>
                    {/*<label for="phone">Enter Phone No.:</label>*/}
                    <input type="text" placeholder="Phone no." id="phone"></input>
                    <br></br>
                    <input type="submit" placeholder="Submit" id="submit"></input>
                </form>
            </div>
        );
    }
};

class RenderForwardButtons extends React.Component{
    render(){
        return (
            <div id="forward-buttons">
                <span>Hey {sessionStorage.getItem('Username')}</span>
                <br></br>
                <button id="book-history" onClick={getBookingHistory}>Booking History >></button>
                <button id="book-your-movie" onClick={()=>{window.location.href="./movies.htm"}}>Book Your Show >></button>
            </div>
        );
    }
};

class RenderUserHistory extends React.Component{
    render(){
        let user_history=this.props.data.map((val)=>{
            return (
                <tr>
                    <td>{val.Date}</td>
                    <td>{val.MOVIE}</td>
                    <td>{val.Audi}</td>
                    <td>{val.Time_Slot}</td>
                </tr>
            )
        });
        return(
            <table>
                <thead>
                <tr>
                    <td>Date</td>
                    <td>Movie</td>
                    <td>Auditorium</td>
                    <td>Time Slot</td>
                </tr>
                </thead>
                {user_history}                
            </table>
        )
    }
};


const getBookingHistory=function(){
    retreiveBookingHistory();//user history set in session storage in this function.
    let hist=JSON.parse(sessionStorage.getItem("user_history"));
    ReactDOM.render(<RenderUserHistory data={hist}/>,document.getElementById("main"));
}

const call_auth_user=function(event){
    event.preventDefault();
    const username=document.getElementById("user").value;
    const password=document.getElementById("pass").value;
    if(username==="admin@amazon"&&password==="admin@123"){
        document.getElementById("top-bar").removeChild(document.getElementById("authentication-fields"));
        sessionStorage("Admin-Login","true");
        //ReactDOM.render(</>,document.getElementById("main"));
        //add event listeners here
    }
    else{
        authenticateUser();
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


