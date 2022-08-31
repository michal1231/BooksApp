'use strict';

const bookDisplay = Handlebars.compile(document.querySelector('#template-book').innerHTML);
const bookListWrapper = document.querySelector('.books-list');

const favoriteBooks = [];

const filters = [];
const filterDOM = document.querySelector('.filters');


function renderBooks() {
  for (let book of dataSource.books) {
    const generatedHTML = bookDisplay(book);
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);
    const ratingDOM = generatedDOM.querySelector('.book__rating__fill');
    if (book.rating < 6) {
      ratingDOM.style = `background: linear-gradient(to right, #fefcea ${book.rating * 10}%,transparent ${100 - book.rating * 10}%)`;
    } else if (book.rating > 6 && book.rating <= 8) {
      ratingDOM.style = `background: linear-gradient(to right, #b4df5b ${book.rating * 10}%,transparent ${100 - book.rating * 10}%)`;
    } else if (book.rating > 8 && book.rating <= 9) {
      ratingDOM.style = `background: linear-gradient(to right, #299a0b ${book.rating * 10}%,transparent ${100 - book.rating * 10}%)`;
    } else {
      ratingDOM.style = `background: linear-gradient(to right, #ff0084 ${book.rating * 10}%,transparent ${100 - book.rating * 10}%)`;
    }
    bookListWrapper.appendChild(generatedDOM);
  }
}


function initActions() {
  const booksWrapper = document.querySelector('.books-list');

  booksWrapper.addEventListener('click', function (event) {
    event.preventDefault();
  });

  booksWrapper.addEventListener('dblclick', function (event) {
    event.preventDefault();
    favoriteBooks.push(event.target.offsetParent.getAttribute('data-id'));
    event.target.offsetParent.classList.toggle('favorite');
  });

  filterDOM.addEventListener('click', function (event) {
    if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox' && event.target.name === 'filter') {
      if (event.target.checked === true && filters.indexOf(event.target.value) === -1) {
        filters.push(event.target.value);
      } else if (event.target.checked === false && filters.indexOf(event.target.value) !== -1) {
        filters.splice(filters.indexOf(event.target.value), 1);
      }
    }
    renderFiltered();
  });
}

function renderFiltered() {
  for (let book of dataSource.books) {
    const bookDOM = bookListWrapper.querySelector('[data-id="' + book.id + '"');
    let shouldBeHidden = 0;
    for (let detail in book.details) {
      if (book.details[detail] === false && filters.indexOf(detail) !== -1) {
        shouldBeHidden = 1;
      }
    }
    if (shouldBeHidden === 1 && bookDOM.classList.contains('hidden') === false) {
      bookDOM.classList.add('hidden');
    } else if (shouldBeHidden === 0 && bookDOM.classList.contains('hidden') === true) {
      bookDOM.classList.remove('hidden');
    }
  }
}

renderBooks();
initActions();