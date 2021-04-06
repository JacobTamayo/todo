import './bootstrap/dist/css/bootstrap.min.css'
import './bootstrap/dist/js/bootstrap.js'
import 'jquery'


const todoListStorage = []
const tabContainer = document.querySelector('ul')
const contentContainer = document.querySelector('#content-container')


const addToMyTab = (name) => {
    const li = document.createElement('li')

    const anchor = document.createElement('a')
    anchor.href = "#" + name
    anchor.textContent = name
    
    li.appendChild(anchor)
    tabContainer.appendChild(li)

    const div = document.createElement('div')
    div.id = name
    div.classList.add("tab-pane", "fade")
    const h3 = document.createElement('h3')
    h3.textContent = "It works"
    div.appendChild(h3)
    contentContainer.appendChild(div)
}

addToMyTab("new")
$(document).ready(function(){
    $(".nav-tabs a").click(function(){
      $(this).tab('show');
    });
  });