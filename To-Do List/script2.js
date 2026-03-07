const addBtn = document.getElementById("add-btn");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-ul");
const taskForm = document.getElementById("task-form");
const taskArr = [];

class TaskHandler {
  constructor() {
    this.tasks = taskArr;
    this.text = taskInput.value.trim();
  }

  loadSavedTasks(){
    const tasks = JSON.parse(localStorage.getItem("tasks")) || []
    tasks.forEach(this.createLiElement);
  }

  toggleTaskCompletion(taskDiv) {
    taskDiv.classList.toggle("task-completed");
  }

  createLiElement() {
    const newTask = document.createElement("li");

    const taskDiv = document.createElement("div");
    taskDiv.textContent = this.text;

    taskDiv.addEventListener("click", () => {
      const task = new TaskHandler();
      task.toggleTaskCompletion(taskDiv);
    });

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";

    removeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const task = new TaskHandler();
      task.removeTask(newTask);
      console.log(task.tasks);
    });

    newTask.appendChild(taskDiv);
    newTask.appendChild(removeBtn);
    taskList.appendChild(newTask);

    this.tasks.push(taskDiv.textContent);
  }

  addTask() {
    if (this.text === "") {
      alert("Please enter a task");
      return;
    }

    this.createLiElement()

    this.saveToLocalStorage()

    taskInput.value = "";
    taskInput.focus();

    const emptyState = document.querySelector(".empty-state");
    if (emptyState) {
      emptyState.remove();
    }
  }

  removeTask(taskElement) {
    taskElement.remove();

    const taskText = taskElement.querySelector("div").textContent;
    const index = this.tasks.indexOf(taskText);
    if (index > -1) {
      this.tasks.splice(index, 1);
    }
  }

  saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(this.tasks));
}
}

addBtn.addEventListener("click", () => {
  const task = new TaskHandler();
  task.addTask();
  console.log(task.tasks);
});

document.addEventListener("DOMContentLoaded", () => {
  const task = new TaskHandler();
  task.loadSavedTasks()
})