import item from './component.js'
import './style.css'
import {createForm, editItemForm} from './form.js'
import {minorSave} from './save'

const addContentCreateButton = (name, list) => {
    const add = document.createElement('button');
    add.classList.add('btn', 'btn-primary', 'btn-placement');
    add.textContent = "Add Item";
    add.addEventListener('click', ()=>{
        createForm(name, list);
    });
    return add;
}

const itemContainer = (title, description, dueDate, arr) => {
    const div = document.createElement('div');
    div.id = title;
    div.classList.add('card', 'item-container');
    const containerTitle = document.createElement('h3');
    containerTitle.textContent = title;
    containerTitle.classList.add('card-title', 'align');
    const containerDueDate = document.createElement('div');
    containerDueDate.textContent = dueDate;
    containerDueDate.classList.add('align');
    containerDueDate.style.marginBottom = "20px";

    div.appendChild(containerTitle);
    div.appendChild(containerDueDate);

    const secondDiv = document.createElement('div');
    secondDiv.id = "btn-container";
    secondDiv.appendChild(viewContentButton(title, description, dueDate))
    secondDiv.appendChild(editTab(title, arr))
    secondDiv.appendChild(contentDeleteButton(title, arr))
    div.appendChild(secondDiv)

    return div;
}

const editTab = (title, arr) => {
    const button = document.createElement('button')
    button.classList.add('btn', 'btn-primary', 'btn-placement-item')
    button.textContent = "Edit"
    button.addEventListener('click', () => {
        editItemForm(title, arr);
    })
    return button;
}

const viewContentButton = (title, description, dueDate) => {
    const button = document.createElement('button');
    button.textContent = "View"
    button.classList.add('btn', 'btn-primary', 'btn-placement-item')
    button.addEventListener('click', () => {

        const div = document.createElement('div');
        div.classList.add('blank')
        div.id = "blank"
        const elementContainer = document.createElement('div');
        elementContainer.classList.add('blank-container');


        const containerTitle = document.createElement('h3');
        containerTitle.textContent = title;
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


        elementContainer.appendChild(containerTitle);
        elementContainer.appendChild(containerDescription);
        elementContainer.appendChild(containerDueDate);
        elementContainer.appendChild(backButton);
        div.appendChild(elementContainer)
        document.querySelector('body').appendChild(div);
        
    });
    return button;
}

const contentDeleteButton = (title, arr) => {
    const button = document.createElement('button')
    button.textContent = "Finished"
    button.classList.add('btn', 'btn-primary', 'btn-placement-item')
    button.addEventListener('click', () => {
        document.getElementById(title).remove();
        deleteItem(title, arr);
        minorSave(arr)
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
export {
    addContentCreateButton,
    itemContainer
}