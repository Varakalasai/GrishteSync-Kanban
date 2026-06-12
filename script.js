/*
# Created with GrishteSync
# https://suryasticsai.github.io/GrishteSync
# Suryasticsai | suryasticsai@gmail.com
*/
// @ts-check
'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const toDoList = document.getElementById('to-do-list');
  const inProgressList = document.getElementById('in-progress-list');
  const doneList = document.getElementById('done-list');
  const addTaskButton = document.getElementById('add-task');
  const taskModal = document.getElementById('task-modal');
  const addTaskModal = document.getElementById('add-task-modal');
  const taskTitleInput = document.getElementById('task-title');
  const taskDescriptionInput = document.getElementById('task-description');
  const editTaskButton = document.getElementById('edit-task');
  const deleteTaskButton = document.getElementById('delete-task');
  const saveTaskButton = document.getElementById('save-task');
  const taskNameInput = document.getElementById('task-name');
  const taskDescriptionTextArea = document.getElementById('task-description');
  let tasks = [];
  let currentTask = null;
  addTaskButton.addEventListener('click', () => {
    addTaskModal.style.display = 'block';
  });
  saveTaskButton.addEventListener('click', () => {
    const taskName = taskNameInput.value;
    const taskDescription = taskDescriptionTextArea.value;
    if (taskName && taskDescription) {
      const newTask = {
        id: Date.now(),
        name: taskName,
        description: taskDescription,
        status: 'to-do'
      };
      tasks.push(newTask);
      renderTasks();
      addTaskModal.style.display = 'none';
      taskNameInput.value = '';
      taskDescriptionTextArea.value = '';
    }
  });
  editTaskButton.addEventListener('click', () => {
    const taskName = taskTitleInput.textContent;
    const taskDescription = taskDescriptionInput.textContent;
    if (taskName && taskDescription) {
      const updatedTask = tasks.find((task) => task.id === currentTask.id);
      updatedTask.name = taskName;
      updatedTask.description = taskDescription;
      renderTasks();
      taskModal.style.display = 'none';
    }
  });
  deleteTaskButton.addEventListener('click', () => {
    const taskId = currentTask.id;
    tasks = tasks.filter((task) => task.id !== taskId);
    renderTasks();
    taskModal.style.display = 'none';
  });
  function renderTasks() {
    toDoList.innerHTML = '';
    inProgressList.innerHTML = '';
    doneList.innerHTML = '';
    tasks.forEach((task) => {
      const taskElement = document.createElement('li');
      taskElement.textContent = task.name;
      taskElement.addEventListener('click', () => {
        currentTask = task;
        taskTitleInput.textContent = task.name;
        taskDescriptionInput.textContent = task.description;
        taskModal.style.display = 'block';
      });
      if (task.status === 'to-do') {
        toDoList.appendChild(taskElement);
      } else if (task.status === 'in-progress') {
        inProgressList.appendChild(taskElement);
      } else if (task.status === 'done') {
        doneList.appendChild(taskElement);
      }
    });
  }
});
