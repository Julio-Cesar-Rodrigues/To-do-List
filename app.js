const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

function addTodo(event) {

    event.preventDefault();
    
    //cria uma div
    const todoDiv = document.createElement("div"); 
    todoDiv.classList.add("todo"); 

    //cria uma li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    saveLocalTodos(todoInput.value);
    //botao completo
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("completed-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button"); //cria o botao
    trashButton.innerHTML = '<i class="fas fa-times"></i>'; //aqui ele cria um HTML para adicionar a tag <i> para conseguir puxar o icone do botao
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);

    todoInput.value='';
}

function deleteCheck (e){
    const item = e.target;
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        todo.classList.add('fall'); //funcao fall para a animacao do css
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){ //adiciona a animacao antes de deletar o item da lista
            todo.remove();
        })
    }

    if (item.classList[0] === "completed-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

//essa funcao faz com que o filtro cheque o valor de <option>

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch (e.target.value) {
//caso for "all", ele mostra todos os itens
            case "all":
                todo.style.display = "flex";
                break;
//caso fo "completed" ele mostra os valores dos completos
            case "completed":
                if (todo.classList.contains("completed")){
                    todo.style.display = "flex";
//caso nao for "completed" ele descarta e nao mostra
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
//aqui ele verifica se o valor é diferente "(!)" de completed, caso for diferente ele os mostra
                if (!todo.classList.contains("completed")){
                    todo.style.display = "flex";
//caso for igual a completed ele os descarta e nao mostra
                } else {
                    todo.style.display = "none";
                }
                break; 
        }
    });
}

//aqui ele cria e armazena as informaçoes to todo no localhost
function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  }



function getTodos(){
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo){
        //cria uma div
        const todoDiv = document.createElement("div"); 
        todoDiv.classList.add("todo"); 
    
        //cria uma li
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
         //botao completo
        const completedButton = document.createElement("button");
        completedButton.innerHTML = `<i class="fas fa-check"></i>`;
        completedButton.classList.add("completed-btn");
        todoDiv.appendChild(completedButton);
    
        const trashButton = document.createElement("button"); //cria o botao
        trashButton.innerHTML = '<i class="fas fa-times"></i>'; //aqui ele cria um HTML para adicionar a tag <i> para conseguir puxar o icone do botao
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
    
        todoList.appendChild(todoDiv);
    });
  }

//remove itens do localhost
  function removeLocalTodos(todo){
    let todos;
    //aqui ele faz checa o array se ele contem alguma informacao
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText; //aqui ele procura o numero da informacao dentro do array
    todos.splice(todos.indexOf(todoIndex), 1);    //o metodo splice faz com que toda a numeracao dos arrays drope em uma posicao
    localStorage.setItem("todos", JSON.stringify(todos));
  }