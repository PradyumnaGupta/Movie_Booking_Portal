function authenticateUser (){
    const username=DOMPurify.sanitize(document.getElementById("user").value, {SAFE_FOR_TEMPLATES: true});
    const password=DOMPurify.sanitize(document.getElementById("pass").value, {SAFE_FOR_TEMPLATES: true});

    if(!username||!password){
        alert("Please provide both username and password");
        return ;
    }
    
    if(!(/^[A-Za-z@]+$/.test(username))){
        alert("Username can't contain special characters.")
        return;
    }

    const server=sessionStorage.getItem("url");//server-url
    const endpoint=server+`/user/?username=${username}&password=${password}`;
    const xhr=new XMLHttpRequest();
    //xhr.responseType='json';
    xhr.onreadystatechange=()=>{
        if(xhr.readyState===XMLHttpRequest.DONE){
            let res=xhr.response;
            console.log(res);
            if(!res){
                alert("There is no account linked to that username and password");
                return ;
            }
            else if(res==="Admin"){
                sessionStorage.setItem("Admin-Login","true");
                return;
            }
            else if (res==="Authentication Successful"){
                sessionStorage.setItem('authenticated',"true");
            
                sessionStorage.setItem('Username',username);
            }
            return ;
        }
    }
    xhr.open('GET',endpoint,false);
    xhr.send();
}