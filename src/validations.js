import {isValid, isFuture} from 'date-fns'

//Main check for the title form
const presenceCheck = (words) => {
    if(words.length > 0){
        return true;
    }
    return false;
}



//First has to be split by the seperators '/' or '-'
//Then needs to be put into the new Date() to check if its valid
//Should be much simplier
const date = (date) =>{
    if(date.indexOf('-') != -1 && date.lastIndexOf('-') != date.indexOf('-')){
        return dateCheck2(date, '-')
    }
    if(date.indexOf('/') != -1 && date.lastIndexOf('/') != date.indexOf('/')){
        return dateCheck2(date, '/')
    }
    return false;
}
const dateCheck2 = (date, seperator) => {
    let dateArr = date.split(seperator);
    if(dateArr[2].length == 2){
        dateArr[2] = "20" + dateArr[2];
    }
    if(isValid(new Date(dateArr[2], dateArr[0], dateArr[1])) && isFuture(new Date(dateArr[2], dateArr[0], dateArr[1]))){
        return true;
    }
    return false;
}


export {
    presenceCheck,
    date
}