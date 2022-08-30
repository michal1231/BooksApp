'use strict';

const bookDisplay = Handlebars.compile(document.querySelector('#template-book').innerHTML);
const bookListWrapper = document.querySelector('.books-list');

const favoriteBooks = [];


function renderBooks() {
  for (let book of dataSource.books) {
    const generatedHTML = bookDisplay(book);
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);
    bookListWrapper.appendChild(generatedDOM);
  }
}


function initActions() {
  const booksDOMs = document.querySelectorAll('.book__image');
  for (let book of booksDOMs) {
    book.addEventListener('dblclick', function (event) {
      event.preventDefault();
      favoriteBooks.push(book.getAttribute('data-id'));
      book.classList.toggle('favorite');
    });
  }
}

renderBooks();
initActions();