
//main

const url="http://746f065a174a.ngrok.io";//backend server address , currently using variable ngrok server address
sessionStorage.setItem("url",url);

if(sessionStorage.getItem("authenticated")==="true"){
    ReactDOM.render(<RenderForwardButtons/>,document.getElementById('authentication-fields'));
}

else{
    ReactDOM.render(<RenderLRButtons/>,document.getElementById('authentication-fields'));
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