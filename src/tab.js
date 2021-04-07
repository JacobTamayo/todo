import 'jquery'

const addToMyTab = (name, list, tabContainer, contentContainer) => {
    const li = document.createElement('li');
    li.id = "#" +name

    const anchor = document.createElement('a');
    anchor.href = "#" + name;
    anchor.textContent = name;
    console.log(name)
    createContentContainer(name, list, contentContainer);
  
    li.appendChild(anchor);
    list.set(li, []);
  
    tabContainer.appendChild(li);
    $(document).ready(function(){
      $(".nav-tabs a").click(function(){
        $(this).tab('show');
      });
    });
}
  
const addtabDestroyButton = (name, list) =>{
    const destroy = document.createElement('button');
    destroy.classList.add("btn", "btn-primary");
    destroy.textContent = "Destroy"
    console.log(name)
    destroy.addEventListener('click', () => {
        list.delete(name);
        document.getElementById("#"+ name).remove()
        document.getElementById(name).remove();
    });
    return destroy;
}

const createContentContainer = (name, list, contentContainer) => {
    const div = document.createElement('div');
    div.id = name;
    div.classList.add("tab-pane", "fade");
    const h3 = document.createElement('h3');
    h3.textContet = "It works!";
    console.log(name)
    div.appendChild(addtabDestroyButton(name, list));
    div.appendChild(h3);
    contentContainer.appendChild(div);
}

export {addToMyTab}