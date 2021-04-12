import { Button } from 'bootstrap';
import 'jquery'
import {item} from './component.js'
import {addContentCreateButton} from './items.js'

//Creates the tab and adds functionality to it
const addToMyTab = (name, list, tabContainer, contentContainer) => {
    const li = document.createElement('li');
    li.id = "#" +name

    const anchor = document.createElement('a');
    anchor.href = "#" + name;
    anchor.textContent = name;
    createContentContainer(name, list, contentContainer);
  
    li.appendChild(anchor);
    list.set(name, []);
  
    tabContainer.appendChild(li);
    $(document).ready(function(){
      $(".nav-tabs a").click(function(){
        $(this).tab('show');
      });
    });
}

//button that destroys the entire list and its contents from the page
const addtabDestroyButton = (name, list) =>{
    const destroy = document.createElement('button');
    destroy.classList.add("btn", "btn-primary");
    destroy.textContent = "Destroy"
    destroy.addEventListener('click', () => {
        list.delete(name);
        document.getElementById("#"+ name).remove()
        document.getElementById(name).remove();
    });
    return destroy;
}


//Creates the container to put the todo list items
const createContentContainer = (name, list, contentContainer) => {
    const div = document.createElement('div');
    div.id = name;
    div.classList.add("tab-pane", "fade");
    const h3 = document.createElement('h3');
    h3.textContet = "It works!";
    div.appendChild(addtabDestroyButton(name, list));
    div.appendChild(addContentCreateButton(name, list));
    div.appendChild(h3);
    contentContainer.appendChild(div);
}





export {addToMyTab}