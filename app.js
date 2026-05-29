
const myLibrary = [];

class Book {
    constructor(title, author, pages, status) {

        // Unique ID for each book
        this.id = crypto.randomUUID();

        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }

    // Toggle read status
    toggleStatus() {
        this.status =
            this.status === "Read"
                ? "Not Read"
                : "Read";
    }
}


// ======================================
// ADD BOOK TO LIBRARY
// ======================================

function addBookToLibrary(title, author, pages, status) {

    const newBook = new Book(
        title,
        author,
        pages,
        status
    );

    myLibrary.push(newBook);

    displayBooks();
}


// ======================================
// DISPLAY BOOKS
// ======================================

function displayBooks() {

    const container =
        document.getElementById("book-container");

    // Clear container before re-rendering
    container.innerHTML = "";

    myLibrary.forEach((book) => {

        // Create card
        const card = document.createElement("div");

        card.classList.add("book-card");

        // Store ID in dataset
        card.dataset.id = book.id;

        // Card content
        card.innerHTML = `
            <h3>${book.title}</h3>

            <p>
                <strong>Author:</strong>
                ${book.author}
            </p>

            <p>
                <strong>Pages:</strong>
                ${book.pages}
            </p>

            <p>
                <strong>Status:</strong>
                ${book.status}
            </p>
        `;

        // ==========================
        // TOGGLE BUTTON
        // ==========================

        const toggleBtn =
            document.createElement("button");

        toggleBtn.textContent =
            "Toggle Status";

        toggleBtn.classList.add("btn");

        toggleBtn.addEventListener("click", () => {

            book.toggleStatus();

            displayBooks();
        });

        // ==========================
        // REMOVE BUTTON
        // ==========================

        const removeBtn =
            document.createElement("button");

        removeBtn.textContent = "Remove";

        removeBtn.classList.add("btn");

        removeBtn.addEventListener("click", () => {

            removeBook(book.id);
        });

        // Add buttons to card
        card.appendChild(toggleBtn);
        card.appendChild(removeBtn);

        // Add card to container
        container.appendChild(card);
    });
}


// ======================================
// REMOVE BOOK
// ======================================

function removeBook(id) {

    const index = myLibrary.findIndex(
        (book) => book.id === id
    );

    myLibrary.splice(index, 1);

    displayBooks();
}


// ======================================
// DIALOG + FORM
// ======================================

const newBookBtn =
    document.getElementById("new-book-btn");

const bookDialog =
    document.getElementById("book-dialog");

const bookForm =
    document.getElementById("book-form");

const closeDialog =
    document.getElementById("close-dialog");


// ======================================
// FORM INPUTS
// ======================================

const titleInput =
    document.getElementById("title");

const authorInput =
    document.getElementById("author");

const pagesInput =
    document.getElementById("pages");

const statusInput =
    document.getElementById("status");


// ======================================
// OPEN DIALOG
// ======================================

newBookBtn.addEventListener("click", () => {

    bookDialog.showModal();
});


// ======================================
// CLOSE DIALOG
// ======================================

closeDialog.addEventListener("click", () => {

    bookForm.reset();

    clearValidationMessages();

    bookDialog.close();
});


// ======================================
// VALIDATION FUNCTIONS
// ======================================

function validateTitle() {

    if (titleInput.value.trim() === "") {

        titleInput.setCustomValidity(
            "The book title must be filled!"
        );

    } else {

        titleInput.setCustomValidity("");
    }
}


function validateAuthor() {

    if (authorInput.value.trim() === "") {

        authorInput.setCustomValidity(
            "The author name must be filled!"
        );

    } else {

        authorInput.setCustomValidity("");
    }
}


function validatePages() {

    if (pagesInput.value.trim() === "") {

        pagesInput.setCustomValidity(
            "Pages field cannot be empty!"
        );

    } else if (pagesInput.value <= 0) {

        pagesInput.setCustomValidity(
            "Pages must be greater than 0!"
        );

    } else {

        pagesInput.setCustomValidity("");
    }
}


// ======================================
// CLEAR VALIDATION
// ======================================

function clearValidationMessages() {

    titleInput.setCustomValidity("");

    authorInput.setCustomValidity("");

    pagesInput.setCustomValidity("");
}


// ======================================
// LIVE VALIDATION
// ======================================

titleInput.addEventListener(
    "input",
    validateTitle
);

authorInput.addEventListener(
    "input",
    validateAuthor
);

pagesInput.addEventListener(
    "input",
    validatePages
);


// ======================================
// FORM SUBMIT
// ======================================

bookForm.addEventListener("submit", (e) => {

    e.preventDefault();

    // Run validations
    validateTitle();
    validateAuthor();
    validatePages();

    // Stop if invalid
    if (!bookForm.checkValidity()) {

        bookForm.reportValidity();

        return;
    }

    // Get values
    const title = titleInput.value;

    const author = authorInput.value;

    const pages = pagesInput.value;

    const status = statusInput.value;

    // Add book
    addBookToLibrary(
        title,
        author,
        pages,
        status
    );

    // Reset form
    bookForm.reset();

    clearValidationMessages();

    // Close modal
    bookDialog.close();
});
