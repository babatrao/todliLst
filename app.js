//SELECTEURS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//ECOUTEURS
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("input", filterTodo);

 
//FUNCTIONS
function addTodo(event) {
    event.preventDefault();

    //TODO DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Créer le Li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //Ajouter la todo au localstorage 
    savelocalTodos(todoInput.value);

    //Bouton Check
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //Bouton Supprimer
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //AJOUTER NOTRE TODO A TODO-LIST
    todoList.appendChild(todoDiv);
    todoInput.value = "";
    
}
function deleteCheck(e) {
    const item = e.target;
    //DELETE TODO
    if (item.classList[0] ==="trash-btn"){
        const todo = item.parentElement;
        todo.remove();
    }
    
    //CHECK MARK
    if (item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");

    }
}
function filterTodo(e) {
    const todo = todoList.childNodes;
    todo.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
             case "completed":
                    if (todo.classList.contains("completed")) {
                        todo.style.display = "flex";
                    }else{
                        todo.style.display = "none";
                    }
                    break;
                    case "uncompleted":

                    if (todoList.contains("completed")) {
                        todo.style.display = "flex";

                    }else{
                        todo.style.display = "none";
                    }
                    break;
        }
    });
}
function savelocalTodos(todo){
    //cheker si il y a des items existants
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo){
        //TODO DIV
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo")
        //Créer le li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //Bouton Check
    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);

    //Bouton Supprimer
    const trashButton = document.createElement("button");
    trashButton .innerHTML = '<i class="fas fa-trash"></i>';
    trashButton .classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //AJOUTER NOTRE TODO A TODO-LIST
    todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    console.log(todo.children[0].innerText);
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos",JSON.stringify(todos));
}