/*
# Created with GrishteSync
# https://suryasticsai.github.io/GrishteSync
# Suryasticsai | suryasticsai@gmail.com
*/
// @ts-check
const toDoCards = document.getElementById('to-do-cards');
const inProgressCards = document.getElementById('in-progress-cards');
const doneCards = document.getElementById('done-cards');
const addToDo = document.getElementById('add-to-do');
const addInProgress = document.getElementById('add-in-progress');
const addDone = document.getElementById('add-done');
let cards = [];
let currentCard = null;
document.addEventListener('DOMContentLoaded', () => {
  // Load existing cards
  const storedCards = localStorage.getItem('cards');
  if (storedCards) {
    cards = JSON.parse(storedCards);
    renderCards();
  }
  // Add event listeners
  addToDo.addEventListener('click', addCard);
  addInProgress.addEventListener('click', addCard);
  addDone.addEventListener('click', addCard);
  toDoCards.addEventListener('dragover', allowDrop);
  inProgressCards.addEventListener('dragover', allowDrop);
  doneCards.addEventListener('dragover', allowDrop);
  toDoCards.addEventListener('drop', dropCard);
  inProgressCards.addEventListener('drop', dropCard);
  doneCards.addEventListener('drop', dropCard);
});
function addCard(event) {
  const column = event.target.parentNode.id;
  const card = {
    id: Date.now(),
    text: '',
    column: column
  };
  cards.push(card);
  renderCards();
  saveCards();
}
function renderCards() {
  toDoCards.innerHTML = '';
  inProgressCards.innerHTML = '';
  doneCards.innerHTML = '';
  cards.forEach((card) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.setAttribute('draggable', 'true');
    cardElement.setAttribute('id', card.id);
    cardElement.innerHTML = `<p>${card.text}</p><button class="edit-card">Edit</button><button class="delete-card">Delete</button>`;
    if (card.column === 'to-do') {
      toDoCards.appendChild(cardElement);
    } else if (card.column === 'in-progress') {
      inProgressCards.appendChild(cardElement);
    } else if (card.column === 'done') {
      doneCards.appendChild(cardElement);
    }
    // Add event listeners
    cardElement.addEventListener('dragstart', dragCard);
    cardElement.querySelector('.edit-card').addEventListener('click', editCard);
    cardElement.querySelector('.delete-card').addEventListener('click', deleteCard);
  });
}
function saveCards() {
  localStorage.setItem('cards', JSON.stringify(cards));
}
function allowDrop(event) {
  event.preventDefault();
}
function dropCard(event) {
  event.preventDefault();
  const cardId = event.dataTransfer.getData('cardId');
  const card = cards.find((card) => card.id === parseInt(cardId));
  if (card) {
    card.column = event.target.parentNode.id;
    saveCards();
    renderCards();
  }
}
function dragCard(event) {
  event.dataTransfer.setData('cardId', event.target.id);
}
function editCard(event) {
  const cardId = event.target.parentNode.id;
  const card = cards.find((card) => card.id === parseInt(cardId));
  if (card) {
    const newText = prompt('Enter new text:', card.text);
    if (newText) {
      card.text = newText;
      saveCards();
      renderCards();
    }
  }
}
function deleteCard(event) {
  const cardId = event.target.parentNode.id;
  const cardIndex = cards.findIndex((card) => card.id === parseInt(cardId));
  if (cardIndex !== -1) {
    cards.splice(cardIndex, 1);
    saveCards();
    renderCards();
  }
}