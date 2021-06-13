import { itemContainer } from "./items";
import { addToMyTab } from "./tab";
import createItem from "./component"

const save = (todoListStorage) => {
    window.localStorage.setItem('save', JSON.stringify(Array.from(todoListStorage)));
}
const minorSave = (arr) =>  {
    let todoListStorage = new Map(JSON.parse(window.localStorage.getItem('save')));
    for(let [key,value] of todoListStorage){
        if(value.length-1 == arr.length){
            if(arr.length == 0){
                todoListStorage.set(key, arr);
                console.log("easy save")
                window.localStorage.setItem('save', JSON.stringify(Array.from(todoListStorage)));
                return;
            }
            for(let i=0; i<value.length; i++){
                if(value[i].title === arr[i].title || value[i+1].title === arr[i].title ){
                    todoListStorage.set(key, arr)
                    console.log("real save");
                    window.localStorage.setItem('save', JSON.stringify(Array.from(todoListStorage)));
                    return;
                }
            }
        }
    }
}

const editItemSave = (arr) => {
    let todoListStorage = new Map(JSON.parse(window.localStorage.getItem('save')));
    for(let [key,value] of todoListStorage){
        if(value.length == arr.length){
            for(let i=0; i<value.length; i++){
                if(value[i].title === arr[i].title){
                    todoListStorage.set(key, arr)
                    window.localStorage.setItem('save', JSON.stringify(Array.from(todoListStorage)));
                    return;
                }
            }
        }
    }
}

const loadSave =  (todoListStorage) => {
    for(let [key, value] of todoListStorage){
        addToMyTab(key, todoListStorage, document. querySelector('ul'), document.querySelector('#content-container'));
        for(let i=0; i< value.length; i++){
            value[i] = createItem(value[i].title, value[i].description, new Date(value[i].dueDate));
            document.getElementById(key).appendChild(itemContainer(value[i].title, value[i].description, value[i].displayDueDate(value[i].dueDate), value));
        }
    }
}

export {
    save,
    loadSave,
    minorSave,
    editItemSave
}