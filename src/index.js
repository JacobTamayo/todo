import './bootstrap/dist/css/bootstrap.min.css';
import './bootstrap/dist/js/bootstrap.js';
import 'jquery';
import {addToMyTab} from './tab.js'


const todoListStorage = new Map();

const tabContainer = document.querySelector('ul');
const contentContainer = document.querySelector('#content-container');

const createListButton = document.querySelector('#create');


createListButton.addEventListener('click', () => {
  addToMyTab(prompt("Name of the todo list"), todoListStorage, tabContainer, contentContainer);
});
addToMyTab("default", todoListStorage, tabContainer, contentContainer)


const addToContent = (name) => {
  const div = document.createElement('div');
  div.id = name;
  div.classList.add("tab-pane", "fade");
  const h3 = document.createElement('h3');
  h3.textContet = "It works!";
  div.appendChild(addtabDestroyButton(name));
  div.appendChild(h3);
  contentContainer.appendChild(div);
}
