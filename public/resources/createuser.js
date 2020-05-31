function createUser (){
    const username=document.getElementById("user").value;
    const password=document.getElementById("pass").value;
    const email=document.getElementById("email").value;
    const phone=document.getElementById("phone").value;

    if(!username||!password||!email||!phone){
        alert("Please fill all the fields");
        return ;
    }

    const server=sessionStorage.getItem("url");//server-url
    const endpoint=server+`/register/?username=${username}&password=${password}&email=${email}&phone=${phone}`;
    const xhr=new XMLHttpRequest();
    //xhr.responseType='json';
    xhr.onreadystatechange=()=>{
        if(xhr.readyState===XMLHttpRequest.DONE){
            const res=xhr.response;
            console.log(res);
            if(res!="OK"){
                console.log(res);
                alert(res);
            }
            else {
                sessionStorage.setItem('authenticated',"true");

                sessionStorage.setItem('Username',username);
                sessionStorage.setItem('Password',password);
                sessionStorage.setItem('Email',email);
                sessionStorage.setItem('Phone_no',phone);
            }
        }
    }
    xhr.open('GET',endpoint,false);
    xhr.send();
}