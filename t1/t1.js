'use strict';

// array for todo list// Array for todo list
const todoList = [
  { id: 1, task: 'Learn HTML', completed: true },
  { id: 2, task: 'Learn CSS', completed: true },
  { id: 3, task: 'Learn JS', completed: false },
  { id: 4, task: 'Learn TypeScript', completed: false },
  { id: 5, task: 'Learn React', completed: false },
];

// Function to render the todo list items
function renderTodoList() {
  const ulElement = document.querySelector('ul');
  ulElement.innerHTML = ''; // Clear existing list

  todoList.forEach((item) => {
    const liElement = document.createElement('li');

    // Create checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = item.completed;
    checkbox.addEventListener('change', () => toggleCompletion(item.id));

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTodoItem(item.id, liElement));

    liElement.appendChild(checkbox);
    liElement.appendChild(document.createTextNode(item.task));
    liElement.appendChild(deleteButton);
    ulElement.appendChild(liElement);
  });
}

// Function to toggle the completion status of a todo item
function toggleCompletion(id) {
  const item = todoList.find((task) => task.id === id);
  if (item) {
    item.completed = !item.completed;
    console.log(todoList); // Log the updated todoList array
  }
}

// Function to delete a todo item
function deleteTodoItem(id, listItem) {
  const index = todoList.findIndex((task) => task.id === id);
  if (index !== -1) {
    todoList.splice(index, 1);
    console.log(todoList); // Log the updated todoList array

    // Remove the list item from the DOM
    listItem.parentNode.removeChild(listItem);
  }
}

// Function to add a new todo item
function addTodoItem(task) {
  const newItem = {
    id: todoList.length + 1,
    task: task,
    completed: false,
  };
  todoList.push(newItem);
  console.log(todoList); // Log the updated todoList array

  renderTodoList();
}

// Modal-related code
const dialog = document.getElementById('todo-dialog');
const addButton = document.querySelector('.add-btn');
const closeButton = document.getElementById('close-dialog');
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');

// Open the modal when "Add Todo Item" button is clicked
addButton.addEventListener('click', () => {
  dialog.showModal();
});

// Close the modal when "Cancel" button is clicked
closeButton.addEventListener('click', () => {
  dialog.close();
});

// Handle form submission to add a new todo item
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent form from submitting traditionally
  const task = input.value.trim();

  if (task !== '') {
    addTodoItem(task);
    input.value = ''; // Clear the input field
    dialog.close(); // Close the modal after saving
  }
});

// Initial rendering of the todo list
renderTodoList();
