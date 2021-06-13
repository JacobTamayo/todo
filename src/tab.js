import { Button } from 'bootstrap' //Not sure why but this line is essential for the page to work
import 'jquery'
import {addContentCreateButton} from './items.js'
import {presenceCheck} from './validations.js'
import {save} from './save.js'

//Creates the tab and adds functionality to it
const addToMyTab = (name, list, tabContainer, contentContainer) => {
  const li = document.createElement('li');
  li.id = "#" +name
  li.style.margin = "0px 5px";

  

  const anchor = document.createElement('a');
  if(!isNaN(name)){
    anchor.href = "#i" + name;
  }else{
    anchor.href = "#" + name;
  }
  anchor.textContent = name;
  createContentContainer(name, list, contentContainer);

  li.appendChild(anchor);
  if(!list.has(name)){
    list.set(name, []);
    save(list);
  }
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
  destroy.classList.add("btn", "btn-primary", "btn-placement");
  destroy.textContent = "Destroy Project"
  destroy.addEventListener('click', () => {
    list.delete(name);
    save(list);
    document.getElementById("#"+ name).remove()
    document.getElementById(name).remove();
  });
  return destroy;
}
const addTabRenameButton = (name, list) => {
  const rename = document.createElement('button');
  rename.textContent = "Rename Project"
  rename.classList.add("btn", 'btn-primary', 'btn-placement');
  rename.addEventListener('click', () => {
    const div = document.createElement('div');
    div.classList.add('blank')
    div.id = "blank"
    const elementContainer = document.createElement('div');
    elementContainer.classList.add('blank-container');
    const form = document.createElement('form');
    form.classList.add('form');
    const h3 = document.createElement('h3');
    h3.textContent = "Rename Project";
    elementContainer.appendChild(h3);

    const element = document.createElement('input');
    element.type = "text";
    element.classList.add('form-control')
    element.name = "title";
    element.placeholder = "Title";
    form.appendChild(element);

    const submit = document.createElement('input');
    submit.type="submit";
    submit.value="submit";
    submit.classList.add('btn', 'btn-primary')
    form.appendChild(submit);

    form.addEventListener('submit', (e) =>{
      e.preventDefault();
      let newName = form.elements[0].value
      if(presenceCheck(newName)){
        list.set(newName, list.get(name));
        list.delete(name);
        save(list);
        document.getElementById("#" + name).children[0].textContent = newName;
        document.getElementById('blank').remove();
      }
    });

    const backButton = document.createElement('button')
    backButton.classList.add('btn', 'btn-primary')
    backButton.textContent = "Back"
    backButton.addEventListener('click', () => {
        document.getElementById('blank').remove()
    })
    elementContainer.appendChild(form)
    elementContainer.appendChild(backButton);
    div.appendChild(elementContainer);
    document.body.appendChild(div);
  });
  return rename;
}


//Creates the container to put the todo list items
const createContentContainer = (name, list, contentContainer) => {
  const div = document.createElement('div');
  const innerdiv = document.createElement('div');
  if(!isNaN(name)){
    div.id = "i" + name;
  }else{
    div.id = name;
  }
  div.classList.add("tab-pane", "fade");
  innerdiv.classList.add('inner-div');
  innerdiv.appendChild(addContentCreateButton(name, list));
  innerdiv.appendChild(addTabRenameButton(name, list));
  innerdiv.appendChild(addtabDestroyButton(name, list));
  div.appendChild(innerdiv)
  contentContainer.appendChild(div);
}




export {addToMyTab}