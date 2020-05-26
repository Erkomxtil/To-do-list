let log = console.log
/* Selecteurs d'éléments sur la page */
const todoInput = document.querySelector(".todoInput")
const todoButton = document.querySelector(".todoButton")
const todoList = document.querySelector(".todoList")
const filterOption = document.querySelector(".filterTodo")

/* Ecouteurs */
document.addEventListener('DOMContentLoaded', getTodos) 
todoButton.addEventListener("click", addtodo)
todoList.addEventListener("click", deleteCheck)
filterOption.addEventListener("click", filterTodo)


/* fonctions */ 
function addtodo (e) {
  e.preventDefault()

  /* La div */
  const todoDiv = document.createElement("div")
  todoDiv.classList.add("todo")

  /* Le li */
  const newTodo = document.createElement("li")
  newTodo.classList.add("todoItem")
  newTodo.innerText =  todoInput.value
  todoDiv.appendChild(newTodo)

  /* Ajouter les todo au localstorage */
  saveLocalTodos(todoInput.value)

  /* Bouton vérifié */
  const completedButton = document.createElement("button")
  completedButton.classList.add("completedBtn")
  completedButton.innerHTML = '<i class="fas fa-check"></i>'
  todoDiv.appendChild(completedButton)

  /* Bouton poubelle */
  const trashButton = document.createElement("button")
  trashButton.classList.add("trashBtn")
  trashButton.innerHTML = '<i class="fas fa-trash"></i>'
  todoDiv.appendChild(trashButton)

  /* ajouter à la liste */
  todoList.appendChild(todoDiv)
  
  /* Effacer la valeur de l'input */
  todoInput.value = ""
}

function deleteCheck (e) {
  const item = e.target

  /* Effacer le to do */
  if (item.classList[0] === 'trashBtn') {
    const todo = item.parentElement
    todo.classList.add('fall')
    removeLocalTodos(todo)
    todo.addEventListener('transitionend', () => {
      todo.remove()
    })

  }
  /* Vérifier */ 
  if (item.classList[0] === 'completedBtn') {
    const todo = item.parentElement
    todo.classList.toggle('completed')
  }
}

function filterTodo (e) {
  const todos = todoList.childNodes
  for (let todo of todos) {
    log(e.target.value)
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex"
      break
      case "completed":
        if (todo.classList.contains('completed')) {
          todo.style.display = "flex"
        } else {
          todo.style.display = "none"
        }
      break
      case "uncompleted":
        if (!todo.classList.contains('completed')) {
          todo.style.display = "flex"
        } else {
          todo.style.display = "none"
        }
      break
      default:
    }
  }
}

function checkTodos () {
  /* Vérifier si on a déjà quelque chose dans le local */
  let todos
  if (localStorage.getItem('todos') === null) {
    return todos = []
  } else {
    return todos =  JSON.parse(localStorage.getItem('todos'))
  }
}

function saveLocalTodos (todo) {
  let todos = checkTodos()
  todos.push(todo)
  localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos () {
  let todos = checkTodos()
  for (let todo of todos) {
    /* La div */
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")

    /* Le li */
    const newTodo = document.createElement("li")
    newTodo.classList.add("todoItem")
    newTodo.innerText =  todo
    todoDiv.appendChild(newTodo)

    /* Bouton vérifié */
    const completedButton = document.createElement("button")
    completedButton.classList.add("completedBtn")
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    todoDiv.appendChild(completedButton)

    /* Bouton poubelle */
    const trashButton = document.createElement("button")
    trashButton.classList.add("trashBtn")
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    todoDiv.appendChild(trashButton)

    /* ajouter à la liste */
    todoList.appendChild(todoDiv)
    
  }
}

function removeLocalTodos(todo) {
  let todos = checkTodos()
  
  const todoIndex = todo.children[0].innerText
  todos.splice(todos.indexOf(todoIndex), 1)
  localStorage.setItem('todos', JSON.stringify(todos))
}
