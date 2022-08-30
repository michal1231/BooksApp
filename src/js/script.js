'use strict';

const bookDisplay = Handlebars.compile(document.querySelector('#template-book').innerHTML);
const bookListWrapper = document.querySelector('.books-list');

function renderBooks() {

  console.log(bookListWrapper);
  for (let book of dataSource.books) {
    const generatedHTML = bookDisplay(book);
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);
    bookListWrapper.appendChild(generatedDOM);
  }
}

renderBooks();