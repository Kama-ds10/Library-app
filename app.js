let library = [];


// Book Constructor
function Book(title, author, pages, status) {
    this.id = crypto.randomUUID();  // unique ID
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

// Function to Create and Add Books to the Array
function createBook(title, author, pages, status = "Available") {
    const newBook = new Book(title, author, pages, status);
    library.push(newBook);
    return newBook;
}

createBook("Atomic Habits", "James Clear", 250, "Available");
createBook("Rich Dad Poor Dad", "Robert Kiyosaki", 220);
createBook("The Alchemist", "Paulo Coelho", 180, "Borrowed");

console.log(library);

