function createUser (){
    const username=document.getElementById("user").value;
    const password=document.getElementById("pass").value;
    const email=document.getElementById("email").value;
    const phone=document.getElementById("phone").value;

    if(!username||!password||!email||!phone){
        alert("Please fill all the fields");
        return ;
    }

    if(!(/^(?=.*[a-z])(?=.*[A-Z]).{8,12}$/.test(password))){
        alert("Password does not meet the rule requirements.Please try again.");
        return;
    }

    if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
        alert("Please enter a valid email address.");
        return;
    }

    if(!(/^\d{10}$/.test(phone))){
        alert("Please enter a valid 10 digit phone number.");
        return;
    }

    const server=sessionStorage.getItem("url");//server-url
    const endpoint=server+`/user/register/?username=${username}&password=${password}&email=${email}&phone=${phone}`;
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
    xhr.open('POST',endpoint,false);
    xhr.send();
}