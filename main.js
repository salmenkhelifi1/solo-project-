
function each(array, func) {
  for (var i = 0; i < array.length; i++) {
    func(array[i], i);
  }
}
//Function to generate unique IDs
function generateID() {
  var count = 0;
  return function () {
    return count++;
  };
}
var id = generateID();
//Creates a new object with the given string and a unique id.
function make(string) {
  return {
    string: string,
    id: id(),
  };
}
function MakeToDoList() {
  return {
    list: [],
    adding: adding,
  };
}
var adding = function (name) {
  this.list.push(name);
};
var a = MakeToDoList();
var todo1 = make("Do some research");
var todo2 = make("Reading lecture");
var todo3 = make("Do wormap");
a.adding(todo1);
a.adding(todo2);
a.adding(todo3);
//Append a task to the task list
function display(item) {
  var checkboxId = `task-checkbox-${item.string}`;
  $(".task-box").append(`
    <li class="task" data-checkbox-id="${checkboxId}">
      <input type="checkbox" id="${checkboxId}" class="task-checkbox">
      <span class="task-name">${item.string}</span>
      <button class="edit-task-button"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg></button>
      <button class="remove-task-button"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg></button>
    </li>
  `);
}
each(a.list, function (e, i) {
  display(e);
});
// Function to edit task
function editTask(taskItem) {
  var taskName = taskItem.find(".task-name");
  var newName = prompt("Edit task:", taskName.text());
  if (newName !== null) {
    taskName.text(newName);
  }
}
// function to get the value of an input element
function getValue(inputElement) {
  return inputElement.value;
}
//  function to removes whitespace and other predefined characters from both sides of a string
function customTrim(str) {
  return str.replace(/^\s+|\s+$/g, ''); 
}
// Add the new todo item to the list
$(".add-task").on("click", function () {
  var taskInput = $(".task-input input")[0]; // Access the input element
  var taskName = customTrim(getValue(taskInput)); // Get the value and trim it using custom functions

  if (taskName !== "") {
    var newTodo = make(taskName);
    a.adding(newTodo);
    display(newTodo);
    taskInput.value = ""; 
  }
});
// Function to handle task edit
$(".task-box").on("click", ".edit-task-button", function () {
  var taskItem = $(this).closest("li");
  editTask(taskItem);
});
// Function to handle task removal
$(".task-box").on("click", ".remove-task-button", function () {
  var taskItem = $(this).closest("li");
  removeTask(taskItem);
});
// Function to remove task item
function removeTask(taskItem) {
  taskItem.remove();
}
// Empty task box
$(".clear-btn").on("click", function () {
  $(".task-box").empty();
});
