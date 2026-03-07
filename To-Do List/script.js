const addBtn = document.getElementById("add-btn");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-ul");
const clearAllBtn = document.getElementById("clear-all-btn");

const loadTasksFromStorage = () => {
  const tasksJSON = localStorage.getItem("tasks");
  return tasksJSON ? JSON.parse(tasksJSON) : [];
};

const saveTasksToStorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const getTasksFromDOM = () => {
  const taskItems = taskList.querySelectorAll("li");
  const tasks = [];

  taskItems.forEach((item) => {
    if (!item.classList.contains("empty-message")) {
      const taskText = item.querySelector("div").textContent;
      tasks.push(taskText);
    }
  });

  return tasks;
};

const updateStorage = () => {
  const tasks = getTasksFromDOM();
  saveTasksToStorage(tasks);
};

const checkEmptyList = () => {
  const existingMsg = taskList.querySelector(".empty-message");
  if (existingMsg) {
    existingMsg.remove();
  }

  if (
    taskList.children.length === 0 ||
    (taskList.children.length === 1 && taskList.querySelector(".empty-message"))
  ) {
    const emptyMsg = document.createElement("p");
    emptyMsg.textContent = "No tasks yet. Add one above!";
    emptyMsg.className = "empty-message";
    taskList.appendChild(emptyMsg);
  }
};

const createTaskElement = (taskText) => {
  const taskItem = document.createElement("li");

  const taskDiv = document.createElement("div");
  taskDiv.textContent = taskText;
  taskDiv.addEventListener("click", () => {
    taskDiv.classList.toggle("task-completed")
  })

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.className = "remove-btn";
  removeBtn.addEventListener("click", () => {
    taskItem.remove();
    updateStorage();
    checkEmptyList();
  });

  taskItem.appendChild(taskDiv);
  taskItem.appendChild(removeBtn);

  return taskItem;
};

const addTask = () => {
  const taskText = taskInput.value.trim();

  if (!taskText) {
    alert("Please enter a task");
    taskInput.focus();
    return;
  }

  const emptyMsg = taskList.querySelector(".empty-message");
  if (emptyMsg) {
    emptyMsg.remove();
  }

  const newTask = createTaskElement(taskText);
  taskList.appendChild(newTask);

  updateStorage();

  taskInput.value = "";
  taskInput.focus();
};

const loadSavedTasks = () => {
  const savedTasks = loadTasksFromStorage();

  if (savedTasks.length === 0) {
    checkEmptyList();
    return;
  }

  savedTasks.forEach((taskText) => {
    const taskElement = createTaskElement(taskText);
    taskList.appendChild(taskElement);
  });
};

const clearAllTasks = () => {
  if (
    taskList.children.length === 0 ||
    (taskList.children.length === 1 && taskList.querySelector(".empty-message"))
  ) {
    return;
  }

  if (confirm("Are you sure you want to clear all tasks?")) {
    const taskItems = taskList.querySelectorAll("li:not(.empty-message)");
    taskItems.forEach((item) => item.remove());

    localStorage.removeItem("tasks");

    checkEmptyList();
  }
};

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

clearAllBtn.addEventListener("click", clearAllTasks);

document.addEventListener("DOMContentLoaded", () => {
  loadSavedTasks();

  taskInput.focus();
});
