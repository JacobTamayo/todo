import './bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import {addToMyTab} from './tab.js'
import {loadSave } from './save';
import { viewCalendar} from './calendar'
import { createTabTitle } from './form'



let todoListStorage = new Map();


const createListButton = document.querySelector('#create');
const calendarButton = document.querySelector('#calendar-button')

createListButton.addEventListener('click', () => {
  createTabTitle(todoListStorage)
});



calendarButton.addEventListener('click', () => {
  viewCalendar(todoListStorage)
})
// window.localStorage.clear()
if(window.localStorage.getItem('save') == null){
  addToMyTab("Default", todoListStorage, document.querySelector('ul'), document.querySelector('#content-container'));
}
else{
  todoListStorage = new Map(JSON.parse(window.localStorage.getItem('save')));
  loadSave(todoListStorage);
}


//bootstrap 
//buttons, navs & tabs

//Things to Finish
// Major{
// }
// Minor{
//   Fix spacing for items
//   Ability to have colors for items
// }


//I'm going to leave this note here just as an introspection after I "finished" this project.
// I messed up making nearly every module and it could have been made much simplier
// and would have had to pass much fewer parameters. I'm not going to fix it but just 
// acknowledge it happend and let it be a reminder to put more thought into how I organize
// my js files in the future. Also, messed up creating the todoListStorage. I didn't have to make
// a map with arrays for each project but instead I could have create new instances of an array of each
// item. I'm not sure if this would have been simplier or even more effective for this overall project.
// but it should have been an idea to be considered. Also, should have used date-fns for the day validations.
//Something I will takeaway from this is how important code reusablitiy is and how useful it can be if done properly.
