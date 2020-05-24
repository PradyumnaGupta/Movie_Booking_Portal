
const checkIfSeatsAvailable=function(arr,seats){    
    for(let i=0;i<seats.length();i++){
        if(arr.find(seats[i])==-1)
        return false;
    }
    return true;
}

module.exports=checkIfSeatsAvailable;