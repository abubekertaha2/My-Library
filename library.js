const myLibrary = [];
function Book(title, author, pages, price, isread) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.price = price;
    this.isRead = isread;
}

Book.prototype.toggleReadStatus = function() {
    this.isRead = !this.isRead;
};

function addBookToLibrary(title, author, pages, price, isread) {
    const newBook = new Book(title, author, pages, price, isread);
    myLibrary.push(newBook);
}

function displayBooks() {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';
    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.setAttribute('data-index', index);
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Price: ${book.price}</p>
            <p>Status: ${book.isRead ? "Read" : "Not Read"}</p>
            <button class="toggle-read">Toggle Read Status</button>
            <button class="remove-book">Remove Book</button>
        `;
        bookList.appendChild(bookCard);
    });
    document.querySelectorAll('.toggle-read').forEach(button => {
        button.addEventListener('click', toggleRead);
    });
    document.querySelectorAll('.remove-book').forEach(button => {
        button.addEventListener('click', removeBook);
    });
}

function toggleRead(event) {
    const bookCard = event.target.parentElement;
    const index = bookCard.getAttribute('data-index');
    myLibrary[index].toggleReadStatus(); 
    displayBooks();
}

function removeBook(event) {
    const bookCard = event.target.parentElement;
    const index = bookCard.getAttribute('data-index');
    myLibrary.splice(index, 1); 
    displayBooks(); 
}

document.getElementById('newBookButton').addEventListener('click', function() {
    document.getElementById('bookDialog').showModal(); 
});

document.getElementById('bookForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const price = document.getElementById('price').value;
    const isRead = document.getElementById('is-read').checked;

    addBookToLibrary(title, author, pages, price, isRead); 
    displayBooks(); 
    document.getElementById('bookForm').reset();
    document.getElementById('bookDialog').close();
});

document.getElementById('closeDialog').addEventListener('click', function() {
    document.getElementById('bookDialog').close();
});

addBookToLibrary("The Oromayi", "Ali", 243, 564, true);
addBookToLibrary("The African Continent", "Akuko Kufa", 189, 465, false);
displayBooks();