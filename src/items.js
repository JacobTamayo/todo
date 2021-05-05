import item from './component.js'
import './style.css'

const addContentCreateButton = (name, list) => {
    const add = document.createElement('button');
    add.classList.add('btn', 'btn-primary');
    add.textContent = "add";
    add.addEventListener('click', ()=>{
      let title = prompt("Title");
      let description = prompt("descritption");
      let dueDate = prompt("Due Date?");
      list.get(name).push(item(title, description, dueDate));
      document.getElementById(name).appendChild(itemContainer(title, description, dueDate, list.get(name)));
    });
    return add;
}

const itemContainer = (title, description, dueDate, arr) => {
    const div = document.createElement('div');
    div.id = title;
    div.classList.add('card', 'item-container');
    const containerTitle = document.createElement('h3');
    containerTitle.textContent = title;
    containerTitle.classList.add('card-title')
    const containerDueDate = document.createElement('div');
    containerDueDate.textContent = dueDate;


    div.appendChild(containerTitle);
    div.appendChild(containerDueDate);
    div.appendChild(contentDeleteButton(title, arr))
    div.appendChild(viewContentButton(title, description, dueDate))
    return div;
}

const viewContentButton = (title, description, dueDate) => {
    const button = document.createElement('button');
    button.textContent = "View"
    button.addEventListener('click', () => {

        const div = document.createElement('div');
        div.classList.add('blank')
        div.id = "blank"

        const containerTitle = document.createElement('h3');
        containerTitle.textContent = "Word";
        const containerDescription = document.createElement('p')
        containerDescription.textContent = description
        const containerDueDate = document.createElement('div');
        containerDueDate.textContent = dueDate;
        
        const backButton = document.createElement('button')
        backButton.classList.add('btn', 'btn-primary')
        backButton.textContent = "Back"
        backButton.addEventListener('click', () => {
            document.getElementById('blank').remove()
        })

        div.appendChild(containerTitle);
        div.appendChild(containerDueDate);
        div.appendChild(containerDueDate);
        div.appendChild(backButton)
        document.querySelector('body').appendChild(div);
        
    });
    return button;
}

const contentDeleteButton = (title, arr) => {
    const button = document.createElement('button')
    button.textContent = "delete item"
    button.classList.add('btn', 'btn-primary')
    button.addEventListener('click', () => {
        document.getElementById(title).remove();
        deleteItem(title, arr);
        console.log(arr)
    });
    return button;
}
const deleteItem = (title, arr) =>{
    for(let i=0; i<arr.length; i++){
        if(arr[i].title == title){
            arr.splice(i, 1)
        }
    }
}
export {addContentCreateButton}