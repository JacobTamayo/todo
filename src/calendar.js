import {createBackground, backButton, formContainer} from './form'
import {format, getMonth, getDay, getDaysInMonth, startOfMonth, compareAsc, parseISO, setDate, isAfter, differenceInCalendarDays} from 'date-fns'
import {itemContainer} from './items'


const viewCalendar = (todoList) =>{
    let date = new Date();
    const background = createBackground();
    const calendarContainer = document.createElement('div');
    calendarContainer.id = 'calendar-container';
    
    const month = document.createElement('div');
    month.textContent = findMonth(getMonth(date));
    month.style.textAlign = "center";

    const calendar = document.createElement('div');
    calendar.classList.add('grid');

    calendarSetup(calendar, getDay(startOfMonth(date)));
    // console.log("hello")
    for(let i=1; i <= getDaysInMonth(date); i++){
        date = setDate(date, i);
        let dueDates = getDayDueDates(date, todoList);

        const div = document.createElement('div');
        div.classList.add('day');
        div.textContent = i

        if(dueDates.length != 0){
            const due = document.createElement('button');
            due.textContent = "Due"
            due.classList.add('due', 'btn', 'btn-primary');
            due.addEventListener('click', () => {
                const background = document.createElement('div');
                background.classList.add('calendar-background')
                const back = backButton();
                back.style.display =  "block";
                const container = formContainer(format(dueDates[0].dueDate, 'MMM dd, yyyy'));
                container.classList.add('display-calendar-days')
                container.classList.remove('blank-container')
                for(let i=0; i<dueDates.length; i++){
                    let element = dueDates[i];
                    container.appendChild(itemContainer(element.title, element.description, element.displayDueDate(), todoList.get(element.key)))
                }
                container.appendChild(back);
                background.appendChild(container);
                calendarContainer.appendChild(background);
            });
            div.appendChild(due)
        }
        
        calendar.appendChild(div);
    }
    calendarContainer.appendChild(month);
    calendarContainer.appendChild(calendar);
    background.appendChild(calendarContainer);
    calendarContainer.appendChild(backButton());
    document.body.appendChild(background)
}

const findMonth = (month) => {
    switch(month){
        case 0:
            return "January";
        case 1:
            return "February";
        case 2:
            return "March"
        case 3:
            return "April";
        case 4:
            return "May";
        case 5:
            return "June";
        case 6:
            return "July";
        case 7:
            return "August";
        case 8:
            return "September";
        case 9:
            return "October";
        case 10:
            return "November";
        case 11:
            return "December";
    }
}
const calendarSetup = (calendar, dayOfWeek) => {
    
    for(let i=1; i< 8; i++){
        const div = document.createElement('div');
        div.classList.add('day');
        switch(i){
            case 1:
                div.textContent="SU";
                break;
            case 2:
                div.textContent="MO";
                break;
            case 3:
                div.textContent="TU";
                break;
            case 4:
                div.textContent="WE";
                break;
            case 5:
                div.textContent="TH";
                break;
            case 6:
                div.textContent="FR";
                break;
            case 7:
                div.textContent="SA";
                break;
        }
        div.style.textAlign = "center";
        calendar.appendChild(div)
    }
    for(let i=0; i < dayOfWeek; i++){
        const div = document.createElement('div');
        div.classList.add('day');
        calendar.appendChild(div);
    }
}
//Should return an array of all the items that are due in a given day
//It should check the first elements in each array from the map
//Then it should check if the element is in the past of the current day
//then it should keep on iterating over the array, if it is the same day then
//it should return that value, and if it is in the future then it should break
//the loop and go to the next array and do the same thing
const getDayDueDates = (day, todoList) => {
    let dueDates = [];
    for(let [key, value] of todoList){
        for(let i=0; i< value.length; i++){
            if(differenceInCalendarDays(day, value[i].dueDate) == 0){
                value[i].key = key
                dueDates.push(value[i]);
            }
            if(isAfter(value[i].dueDate, day)){
                break;
            }
        }
    }
    return dueDates;
}

const convertDate = (date) => {
    let dateArr;
    if(date.indexOf('-')!= -1){
        dateArr = date.split('-');
    }else{
        dateArr = date.split('/');
    }
    dateArr[2] = yearCheck(dateArr[2]);
    dateArr[1] = dayMonthCheck(dateArr[1])
    dateArr[0] = dayMonthCheck(dateArr[0])
    return parseISO(dateArr[2].concat("-", dateArr[0],"-", dateArr[1]))
}
const yearCheck = (year) => {
    return (year.length == 2) ? "20" + year : year;
}
const dayMonthCheck = (element) => {
    return (element.length == 1) ? "0"+element : element; 
}

//Finally works
const order = (item, list) => {
    //covers when the array is empty
    if(list.length == 0){
        console.log('start')
        list.push(item);
        return;
    }else{
        for(let i=0; i< list.length; i++){
            //First, has to cover if the element is the 'No Due Date' value and input the date value there
            if(list[i].dueDate.length == 11){
                list.splice(i, 0, item);
                console.log("this");
                return;
            //If the dates are the same it checks if the next date is the same and if not then it puts the item right after the current one
            }else if(compareAsc(list[i].dueDate, item.dueDate) == 0 && (list[i+1] == undefined || compareAsc(list[i+1].dueDate, item.dueDate) == 0)){
                list.splice(i+1, 0, item);
                console.log("shit")
                return;
            //Next, we have to assume that now that there are multiple elements in the array
            //And that at least one of those elements has a date that isn't the same
            //if the array element is higher than the input element than it will return a 1
            }else if(compareAsc(list[i].dueDate, item.dueDate) == 1){
                list.splice(i, 0, item);
                console.log("sucks")
                return;
            }
        }
    }
    list.push(item);
}


export {viewCalendar, convertDate, order}