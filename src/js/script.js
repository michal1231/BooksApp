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
  const booksWrapper = document.querySelector('.books-list');
  booksWrapper.addEventListener('dblclick', function (event) {
    event.preventDefault();
    favoriteBooks.push(event.target.offsetParent.getAttribute('data-id'));
    event.target.offsetParent.classList.toggle('favorite');
  });
}

renderBooks();
initActions();