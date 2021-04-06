import './bootstrap/dist/css/bootstrap.min.css'



const todoListStorage = []
const tabContainer = document.querySelector('ul')
const contentContainer = document.querySelector('#content-container')


const addToMyTab = (name) => {
    const li = document.createElement('li')
    
    const anchor = document.createElement('a')
    anchor.dataToggle = 'tab'
    anchor.href = name
    anchor.textContent = name
    
    li.appendChild(anchor)
    tabContainer.appendChild(li)


}

addToMyTab("new")
