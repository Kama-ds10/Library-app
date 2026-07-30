// ==========================================================================
// APPLICATION STATE
// ==========================================================================
const myLibrary = [];

class Book {
    constructor(title, author, pages, status) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = parseInt(pages, 10) || 0;
        this.status = status === "Read" ? "Read" : "Not Read";
    }

    toggleStatus() {
        this.status = this.status === "Read" ? "Not Read" : "Read";
    }
}

// ==========================================================================
// CORE DOM ELEMENTS
// ==========================================================================
const container = document.getElementById("book-container");
const bookDialog = document.getElementById("book-dialog");
const bookForm = document.getElementById("book-form");
const newBookBtn = document.getElementById("new-book-btn");
const closeDialog = document.getElementById("close-dialog");

// Stats Elements
const statTotal = document.getElementById("stat-total");
const statRead = document.getElementById("stat-read");
const statUnread = document.getElementById("stat-unread");

// Form Inputs
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const statusInput = document.getElementById("status");

// ==========================================================================
// MUTATIONS & STATE MANAGEMENT
// ==========================================================================
function addBookToLibrary(title, author, pages, status) {
    const newBook = new Book(title, author, pages, status);
    myLibrary.push(newBook);
    updateUI();
}

function removeBook(id) {
    const index = myLibrary.findIndex(book => book.id === id);
    if (index !== -1) {
        myLibrary.splice(index, 1);
        updateUI();
    }
}

// ==========================================================================
// RENDER & UI UPDATES
// ==========================================================================
function updateUI() {
    renderBooks();
    renderStats();
}

function renderStats() {
    const total = myLibrary.length;
    const readCount = myLibrary.filter(b => b.status === "Read").length;
    const unreadCount = total - readCount;

    statTotal.textContent = total;
    statRead.textContent = readCount;
    statUnread.textContent = unreadCount;
}

function renderBooks() {
    container.innerHTML = "";

    if (myLibrary.length === 0) {
        container.classList.add("empty-library");
        return;
    }
    container.classList.remove("empty-library");

    myLibrary.forEach((book) => {
        const card = document.createElement("article");
        card.classList.add("book-card");
        card.dataset.id = book.id;

        const isRead = book.status === "Read";

        card.innerHTML = `
            <div class="card-meta">
                <span class="status-badge ${isRead ? 'read' : 'not-read'}">
                    ${isRead ? 'Completed' : 'Plan to Read'}
                </span>
                <span class="page-count">${book.pages} pages</span>
            </div>
            <h3>${book.title}</h3>
            <p class="book-author">by ${book.author}</p>
            <div class="card-actions">
                <button class="btn btn-secondary toggle-btn">Status</button>
                <button class="btn btn-danger-text remove-btn">Remove</button>
            </div>
        `;

        // Attach Contextual Listeners
        card.querySelector(".toggle-btn").addEventListener("click", () => {
            book.toggleStatus();
            updateUI();
        });

        card.querySelector(".remove-btn").addEventListener("click", () => {
            removeBook(book.id);
        });

        container.appendChild(card);
    });
}

// ==========================================================================
// VALIDATION LOGIC
// ==========================================================================
function validateInput(inputElement, errorMessage) {
    if (inputElement.value.trim() === "") {
        inputElement.setCustomValidity(errorMessage);
    } else if (inputElement.type === "number" && Number(inputElement.value) <= 0) {
        inputElement.setCustomValidity("Page count must be greater than zero.");
    } else {
        inputElement.setCustomValidity("");
    }
}

function runFormValidation() {
    validateInput(titleInput, "Please present a book title.");
    validateInput(authorInput, "Please specify an author.");
    validateInput(pagesInput, "Please input a page count.");
}

// Live Validation Feedback Loops
[titleInput, authorInput, pagesInput].forEach(input => {
    input.addEventListener("input", () => {
        input.setCustomValidity("");
        input.removeAttribute("data-touched");
    });
    
    // Flag elements visually once the user moves past them blank
    input.addEventListener("blur", () => {
        input.setAttribute("data-touched", "true");
    });
});

// ==========================================================================
// DIALOG CONTROLS & LIFECYCLE
// ==========================================================================
newBookBtn.addEventListener("click", () => {
    bookDialog.showModal();
});

function closeAndResetDialog() {
    bookForm.reset();
    [titleInput, authorInput, pagesInput].forEach(input => {
        input.setCustomValidity("");
        input.removeAttribute("data-touched");
    });
    bookDialog.close();
}

closeDialog.addEventListener("click", closeAndResetDialog);

// Form Submission handling
bookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    runFormValidation();

    if (!bookForm.checkValidity()) {
        // Mark fields touched to trigger modern custom visual red borders
        [titleInput, authorInput, pagesInput].forEach(i => i.setAttribute("data-touched", "true"));
        bookForm.reportValidity();
        return;
    }

    addBookToLibrary(
        titleInput.value.trim(),
        authorInput.value.trim(),
        pagesInput.value,
        statusInput.value
    );

    closeAndResetDialog();
});

// Initial load build
updateUI();