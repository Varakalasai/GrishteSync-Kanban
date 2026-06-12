/*
# Created with GrishteSync
# https://suryasticsai.github.io/GrishteSync
# Suryasticsai | suryasticsai@gmail.com
*/
// @ts-check
'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const lists = document.querySelectorAll('.list');
  const tasks = document.querySelectorAll('.list li');
  const addTaskButtons = document.querySelectorAll('.add-task');

  tasks.forEach((task) => {
    task.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text', task.dataset.id);
    });
  });

  lists.forEach((list) => {
    list.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    list.addEventListener('drop', (e) => {
      e.preventDefault();
      const taskId = e.dataTransfer.getData('text');
      const task = document.querySelector(`.list li[data-id="${taskId}"]`);
      list.querySelector('ul').appendChild(task);
    });
  });

  addTaskButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const list = button.parentNode;
      const task = document.createElement('li');
      task.textContent = 'New Task';
      task.draggable = true;
      task.dataset.id = Math.random().toString(36).substr(2, 9);
      list.querySelector('ul').appendChild(task);
    });
  });
});