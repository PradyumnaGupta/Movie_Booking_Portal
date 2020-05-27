
const checkIfSeatsAvailable=function(arr,seats){    
    for(let i=0;i<seats.length;i++){
        if(arr.indexOf(seats[i])===-1)
        return false;
    }
    return true;
};

module.exports=checkIfSeatsAvailable;