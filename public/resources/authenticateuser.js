function authenticateUser (){
    const username=document.getElementById("user").value;
    const password=document.getElementById("pass").value;

    if(!username||!password){
        alert("Please provide both username and password");
        return ;
    }

    const server=sessionStorage.getItem("url");//server-url
    const endpoint=server+`/login/?username=${username}&password=${password}`;
    const xhr=new XMLHttpRequest();
    //xhr.responseType='json';
    xhr.onreadystatechange=()=>{
        if(xhr.readyState===XMLHttpRequest.DONE){
            let res=xhr.response;
            if(!res){
                alert("There is no account linked to that username and password");
                return ;
            }
            else if(res==="Admin"){
                sessionStorage.setItem("Admin-Login","true");
                return;
            }
            else res=JSON.parse(res);

            if((res.Username===username) && (res.Password===password)){
                sessionStorage.setItem('authenticated',"true");
            
                sessionStorage.setItem('Username',res.Username);
                sessionStorage.setItem('Password',res.Password);
                sessionStorage.setItem('Email',res.Email);
                sessionStorage.setItem('Phone_no',res.Phone_no);
            }
            return ;
        }
    }
    xhr.open('GET',endpoint,false);
    xhr.send();
}