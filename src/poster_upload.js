
const posterUpload=function(url){
    const fs = require('fs');
    const request = require('request');
    const cloudinary = require('cloudinary');
    const webp=require('webp-converter');

    const download = function(url, filename, callback){
        request.head(url, function(err, res, body){
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(url).pipe(fs.createWriteStream(filename)).on('close', callback);
        });
    };

    let input_name=`new-${new Date().getTime()}.png`;
    let output_name=`output-${new Date().getTime()}.webp`;
    let final_url;
    download(url, input_name, function(){
        webp.cwebp(input_name,output_name,"-q 80",function(status,error)
        {
        console.log(status);	
        console.log(error);

        cloudinary.config({
            cloud_name:'*****',
            api_key:'*******',
            api_secret:'********'});

        cloudinary.v2.uploader.upload(output_name,(error,result)=>{final_url=result.url});
            
        });
        console.log('done');
    });

    console.log(final_url);    
    return final_url;
}

module.exports=posterUpload;