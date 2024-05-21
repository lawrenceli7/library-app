const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks() {
    const libraryDiv = document.getElementById('library');
    libraryDiv.innerHTML = '';
    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.setAttribute('data-index', index);

        bookCard.innerHTML = `
            <p><strong>Title:</strong> ${book.title}</p>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <p><strong>Read:</strong> ${book.read ? 'Yes' : 'No'}</p>
            <button class="remove-book">Remove</button>
            <button class="toggle-read">Toggle Read</button>
        `;

        libraryDiv.appendChild(bookCard);
    });

    document.querySelectorAll('.remove-book').forEach(button => {
        button.addEventListener('click', removeBook);
    });

    document.querySelectorAll('.toggle-read').forEach(button => {
        button.addEventListener('click', toggleReadStatus);
    });
}

document.getElementById('new-book-btn').addEventListener('click', () => {
    document.getElementById('new-book-dialog').showModal();
});

document.getElementById('close-dialog').addEventListener('click', () => {
    document.getElementById('new-book-dialog').close();
});

document.getElementById('new-book-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
    addBookToLibrary(title, author, pages, read);
    document.getElementById('new-book-form').reset();
    document.getElementById('new-book-dialog').close();
});

function removeBook(event) {
    const index = event.target.parentElement.getAttribute('data-index');
    myLibrary.splice(index, 1);
    displayBooks();
}

Book.prototype.toggleRead = function () {
    this.read = !this.read;
};

function toggleReadStatus(event) {
    const index = event.target.parentElement.getAttribute('data-index');
    myLibrary[index].toggleRead();
    displayBooks();
}



