class RenderLRButtons extends React.Component{
    render(){
        return (
            <div id="buttons">
            <button id="login-button">Login</button>
            
            <button id="register-button">Register</button>
            </div>
        );
    }
};

class RenderLoginFields extends React.Component{
    render(){
        return (
            <div id="login-input">
                <form>
                    <label for="user">Enter Username:</label>
                    <input type="text" placeholder="Username" id="user"></input>
                    <label for="pass">Enter Password:</label>
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
                    <label for="user">Enter Username:</label>
                    <input type="text" placeholder="Username" id="user"></input>
                    <label for="pass">Enter Password:</label>
                    <input type="password" placeholder="Password" id="pass"></input>
                    <br></br>
                    <label for="email">Enter Email:</label>
                    <input type="text" placeholder="Email" id="email"></input>
                    <label for="phone">Enter Phone No.:</label>
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
                <br></br>
                <button id="book-your-movie"><a href="movies.htm">Book Your Show >></a></button>
                <button id="book-history">Booking History >></button>
            </div>
        );
    }
};

const call_auth_user=async function(event){
    event.preventDefault();
    authenticateUser();
    if(sessionStorage.getItem('authenticated')==="true"){
        ReactDOM.render(<RenderForwardButtons/>,document.getElementById('authentication-fields'));
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

ReactDOM.render(<RenderLRButtons/>,document.getElementById('authentication-fields'));

const login=document.getElementById("login-button");
const register=document.getElementById("register-button");

login.addEventListener('click',loginEvent);
register.addEventListener('click',registerEvent);

