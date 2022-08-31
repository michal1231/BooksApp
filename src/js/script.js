'use strict';

class BookList {
  constructor() {
    const thisBookList = this;

    thisBookList.bookDisplay = Handlebars.compile(document.querySelector('#template-book').innerHTML);
    thisBookList.favoriteBooks = [];
    thisBookList.filters = [];

    thisBookList.getElements();
    thisBookList.renderBooks();
    thisBookList.initActions();
  }

  getElements() {
    const thisBookList = this;

    thisBookList.dom = {};
    thisBookList.dom.bookListWrapper = document.querySelector('.books-list');
    thisBookList.dom.filterDOM = document.querySelector('.filters');
  }

  renderBooks() {
    const thisBookList = this;

    for (let book of dataSource.books) {
      const generatedHTML = thisBookList.bookDisplay(book);
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
      thisBookList.dom.bookListWrapper.appendChild(generatedDOM);
    }
  }


  initActions() {
    const thisBookList = this;

    const booksWrapper = document.querySelector('.books-list');

    booksWrapper.addEventListener('click', function (event) {
      event.preventDefault();
    });

    booksWrapper.addEventListener('dblclick', function (event) {
      event.preventDefault();
      thisBookList.favoriteBooks.push(event.target.offsetParent.getAttribute('data-id'));
      event.target.offsetParent.classList.toggle('favorite');
    });

    thisBookList.dom.filterDOM.addEventListener('click', function (event) {
      if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox' && event.target.name === 'filter') {
        if (event.target.checked === true && thisBookList.filters.indexOf(event.target.value) === -1) {
          thisBookList.filters.push(event.target.value);
        } else if (event.target.checked === false && thisBookList.filters.indexOf(event.target.value) !== -1) {
          thisBookList.filters.splice(thisBookList.filters.indexOf(event.target.value), 1);
        }
      }
      thisBookList.renderFiltered();
    });
  }

  renderFiltered() {
    const thisBookList = this;

    for (let book of dataSource.books) {
      const bookDOM = thisBookList.dom.bookListWrapper.querySelector('[data-id="' + book.id + '"');
      let shouldBeHidden = 0;
      for (let detail in book.details) {
        if (book.details[detail] === false && thisBookList.filters.indexOf(detail) !== -1) {
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
}

const app = new BookList();