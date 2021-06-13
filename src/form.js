import {presenceCheck, date} from './validations.js'
import {itemContainer} from './items.js'
import createItem from './component.js'
import {convertDate, order} from './calendar.js'
import {addToMyTab} from './tab'
import {save, editItemSave} from './save'
import './style.css'


const createForm = (name, list) => {
    const div = createBackground();
    const container = formContainer("Create Item");
    const form = formElement("title", "description", "due Date")

    form.addEventListener('submit', (e) => {
      let title = form.elements[0].value
      let description = form.elements[1].value
      let dueDate = form.elements[2].value
        if(presenceCheck(title)){
            e.preventDefault();
            if(!presenceCheck(dueDate)){
                //save
                dueDate = "No Due Date"
                list.get(name).push(createItem(title, description, dueDate));
                document.getElementById(name).appendChild(itemContainer(title, description, dueDate, list.get(name)));
                save(list);
                document.getElementById('blank').remove()
            }else if(date(dueDate) != false){
                //save

                dueDate = convertDate(dueDate)
                let element = createItem(title, description, dueDate)
                order(element, list.get(name));
                save(list);
                document.getElementById(name).appendChild(itemContainer(element.title, element.description, element.displayDueDate(dueDate), list.get(name)));
                document.getElementById('blank').remove()

            }else{
                //error

                alert('error');
            }
            console.log(list)
        }else{
            //error
            alert('error')
        }
    });

    container.appendChild(form)
    container.appendChild(backButton());
    div.appendChild(container)
    document.body.appendChild(div);
}
const editItemForm = (oldTitle, arr) => {
    const div = createBackground();
    const container = formContainer("Create Item");
    const form = formElement("title", "description", "due Date")
    let index = arr.findIndex((element) => element.title == oldTitle)
    form.addEventListener('submit', (e) => {
        let title = form.elements[0].value
        let description = form.elements[1].value
        let dueDate = form.elements[2].value
        if(presenceCheck(title)){
            e.preventDefault();
            if(!presenceCheck(dueDate)){
                //save
                dueDate = "No Due Date";
                arr[index] = item(title, description, dueDate);
                let newItem = itemContainer(title, description, dueDate, arr);
                let parent = document.getElementById(oldTitle).parentNode;
                parent.replaceChild(newItem, document.getElementById(oldTitle))
                editItemSave(arr);
                document.getElementById('blank').remove()
            }else if(date(dueDate)){
                //save
                
                arr[index] = createItem(title, description, convertDate(dueDate))
                let newItem = itemContainer(title, description, arr[index].displayDueDate(dueDate), arr)
                let parent = document.getElementById(oldTitle).parentNode
                parent.replaceChild(newItem, document.getElementById(oldTitle))
                editItemSave(arr);
                document.getElementById('blank').remove()
            }else{
                //error

                alert('error');
            }
        }else{
            //error
            alert('error')
        }
    });
    container.appendChild(form)
    container.appendChild(backButton());
    div.appendChild(container)
    document.body.appendChild(div);
}
const createTabTitle = (todoListStorage) => {
    const div = createBackground();
    const container = formContainer("Tab Name");
    const form = formElement("title");
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if(form.elements[0].value.length > 0){
            document.getElementById('blank').remove();
            addToMyTab(form.elements[0].value, todoListStorage, document.querySelector('ul'), document.querySelector('#content-container'));
        }
    });
    container.appendChild(form)
    container.appendChild(backButton());
    div.appendChild(container)
    document.body.appendChild(div);
}

const formElement = (...args) => {
    const form = document.createElement('form');
    form.classList.add('form');
    for(let i=0; i<args.length; i++){
        const element = document.createElement('input');
        element.type = "text";
        element.classList.add('form-control')
        element.name = args[i];
        element.placeholder = capitalizeFirstLetter(args[i]);
        form.appendChild(element);
    }
    const submit = document.createElement('input');
    submit.type="submit";
    submit.value="submit";
    submit.classList.add('btn', 'btn-primary')
    form.appendChild(submit);
    return form;
}
const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const createBackground = () => {
    const div = document.createElement('div');
    div.classList.add('blank');
    div.id = "blank";
    return div;
}

const formContainer = (titleText) => {

    const container = document.createElement('div');
    container.classList.add('blank-container');
    const h3 = document.createElement('h3');
    h3.textContent = titleText;
    container.appendChild(h3);
    return container;
}

const backButton = () => {
    const backButton = document.createElement('button');
    backButton.classList.add('btn', 'btn-primary');
    backButton.textContent = "Back";
    backButton.addEventListener('click', () => {
      document.getElementById('blank').remove();
    });
    return backButton;
}



export {createForm,
    editItemForm,
    createBackground,
    backButton,
    createTabTitle,
    formContainer
};