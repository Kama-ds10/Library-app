// LIBRARY ARRAY
const myLibrary = [];

// BOOK CONSTRUCTOR
function Book(title, author, pages, status) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

// PROTOTYPE METHOD – Toggle read status
Book.prototype.toggleStatus = function () {
    this.status = this.status === "Read" ? "Not Read" : "Read";
};

// ADD BOOK TO LIBRARY
function addBookToLibrary(title, author, pages, status) {
    const newBook = new Book(title, author, pages, status);
    myLibrary.push(newBook);
    displayBooks();
}

// DISPLAY BOOKS ON PAGE
function displayBooks() {
    const container = document.getElementById("book-container");
    container.innerHTML = "";

    myLibrary.forEach(book => {
        const card = document.createElement("div");
        card.classList.add("book-card");
        card.dataset.id = book.id;

        card.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <p><strong>Status:</strong> ${book.status}</p>
        `;

        // Toggle read button
        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = "Toggle Status";
        toggleBtn.classList.add("btn");
        toggleBtn.addEventListener("click", () => {
            book.toggleStatus();
            displayBooks();
        });

        // Remove book button
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("btn");
        removeBtn.addEventListener("click", () => {
            removeBook(book.id);
        });

        card.appendChild(toggleBtn);
        card.appendChild(removeBtn);
        container.appendChild(card);
    });
}

// REMOVE BOOK
function removeBook(id) {
    const index = myLibrary.findIndex(book => book.id === id);
    myLibrary.splice(index, 1);
    displayBooks();
}

// ========== DIALOG FORM HANDLING ==========
const newBookBtn = document.getElementById("new-book-btn");
const bookDialog = document.getElementById("book-dialog");
const bookForm = document.getElementById("book-form");
const closeDialog = document.getElementById("close-dialog");

newBookBtn.addEventListener("click", () => bookDialog.showModal());

closeDialog.addEventListener("click", () => bookDialog.close());

bookForm.addEventListener("submit", (e) => {
    e.preventDefault();   // 🚨 Prevent page reload

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const status = document.getElementById("status").value;

    addBookToLibrary(title, author, pages, status);

    bookForm.reset();
    bookDialog.close();
});
