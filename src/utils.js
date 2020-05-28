
const checkIfSeatsAvailable=function(arr,seats){
    for(let i=0;i<seats.length;i++){
        if(arr.indexOf(seats[i])===-1)
        return false;
    }
    return true;
};

module.exports=checkIfSeatsAvailable;
/*
const fs = require('fs');
const request = require('request');

const download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

download('https://unravelmalta.com/wp-content/uploads/2020/01/movies-2.jpg', 'google.png', 
    function(){console.log('done');
});

var webp=require('webp-converter');
webp.cwebp("input.jpg","output.webp","-q 80",function(status,error)
  {
  	 //if conversion successful status will be '100'
  	//if conversion fails status will be '101'
  	console.log(status,error);	
  });

const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name:'dd6t4mafh',
    api_key:'246876465761746',
    api_secret:'8sNtg50GX-6bAQuI0LFlr-Wns8o'});

cloudinary.v2.uploader.upload("output.webp",(error,result)=>{console.log(result.url)});
*/