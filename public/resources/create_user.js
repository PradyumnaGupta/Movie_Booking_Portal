function createUser (){
    const username=DOMPurify.sanitize(document.getElementById("user").value, {SAFE_FOR_TEMPLATES: true});
    const password=DOMPurify.sanitize(document.getElementById("pass").value, {SAFE_FOR_TEMPLATES: true});
    const email=DOMPurify.sanitize(document.getElementById("email").value, {SAFE_FOR_TEMPLATES: true});
    const phone=DOMPurify.sanitize(document.getElementById("phone").value, {SAFE_FOR_TEMPLATES: true});

    if(!username||!password||!email||!phone){
        alert("Please fill all the fields");
        return ;
    }

    if(!(/^[A-Za-z]+$/.test(username))){
        alert("Username can't contain special characters.")
        return;
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
    const endpoint=server+`/user/?username=${username}&password=${password}&email=${email}&phone=${phone}`;
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