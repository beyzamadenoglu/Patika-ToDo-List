const text = document.querySelector("#task");
const ul = document.querySelector("ul#list");

let mainList = new Array();

function printTask() {
    ul.innerHTML = "";
    mainList.forEach((task, key) => {
        let liDOM = document.createElement('li');
        liDOM.addEventListener("click", taskDone);
        liDOM.innerHTML = `${task}<span id="closeButton" class="deleteButton" onclick=deleteItem(${key})><i class="fas fa-trash"></i></span>`;
        ul.append(liDOM);
    });

}
if (localStorage.getItem('todolist') == null) {
    localStorage.setItem('todolist', JSON.stringify(mainList));
}
else {
    mainList = JSON.parse(localStorage.getItem('todolist'));
    printTask();
}

function taskDone() {
    this.classList.toggle("bg-success");
}

function newElement() {
    if (isInvalid(text.value)) {
        addToList(text.value);
    }
    else {
        $(document).ready(function () {
            $('#attentionToast').toast('show')
        });
        text.value = "";
    }
}
function addToList(taskName) {
    mainList.push(String(taskName));
    console.log(mainList);
    localStorage.setItem('todolist', JSON.stringify(mainList));
    printTask();
    $(document).ready(function () {
        $('#successToast').toast('show')
    });
    text.value = "";
}
function deleteItem(index) {
    mainList.splice(index, 1);
    localStorage.setItem('todolist', JSON.stringify(mainList));
    printTask();
    $(document).ready(function () {
        $('#deleteItemToast').toast('show')
    });
}

function isInvalid(task) {
    let bool; 
    if(task.trim())  {
        bool = true;
    }
    else   {
        bool = false; 
    }
    return bool; 
}
