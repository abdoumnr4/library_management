const books = []; // Array to store book dictionaries
const bookTable = document.getElementById('bookTable').getElementsByTagName('tbody')[0];
const bookCountElement = document.getElementById('bookCount');

document.getElementById('bookForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Get form data
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;
    const editor = document.getElementById('editor').value;
    const genre = document.getElementById('genre').value;
    const pages = document.getElementById('pages').value;
    const language = document.getElementById('language').value;

    // Create dictionary (object) with form data
    const bookData = {
        title: title,
        author: author,
        year: year,
        editor: editor,
        genre: genre,
        pages: pages,
        language: language
    };

    // Add the book data to the books array
    books.push(bookData);

    // Add the book data to the table
    addBookToTable(bookData);

    // Update the book counter
    updateBookCount();

    // Clear the form fields
    document.getElementById('bookForm').reset();
});

function addBookToTable(book) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.year}</td>
        <td>${book.editor}</td>
        <td>${book.genre}</td>
        <td>${book.pages}</td>
        <td>${book.language}</td>
        <td><button onclick="deleteBook(${books.length - 1})">Delete</button></td>
    `;
    bookTable.appendChild(row);
}

function deleteBook(index) {
    books.splice(index, 1);
    renderBooks();
    updateBookCount(); // Update the book counter after deletion
}

function renderBooks() {
    bookTable.innerHTML = '';
    books.forEach((book, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.year}</td>
            <td>${book.editor}</td>
            <td>${book.genre}</td>
            <td>${book.pages}</td>
            <td>${book.language}</td>
            <td><button onclick="deleteBook(${index})">Delete</button></td>
        `;
        bookTable.appendChild(row);
    });
}

// Function to update the book counter
function updateBookCount() {
    bookCountElement.textContent = books.length;
}

// Function to search for books by title using linear search
function searchBookByTitle(title) {
    const results = [];
    for (let i = 0; i < books.length; i++) {
        if (books[i].title.toLowerCase().includes(title.toLowerCase())) {
            results.push(books[i]);
        }
    }
    return results;
}

// Handle search button click
document.getElementById('searchButton').addEventListener('click', function() {
    const searchTerm = document.getElementById('searchInput').value;
    const results = searchBookByTitle(searchTerm);
    bookTable.innerHTML = ''; // Clear the table
    results.forEach(book => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.year}</td>
            <td>${book.editor}</td>
            <td>${book.genre}</td>
            <td>${book.pages}</td>
            <td>${book.language}</td>
            <td><button onclick="deleteBook(${books.indexOf(book)})">Delete</button></td>
        `;
        bookTable.appendChild(row);
    });
});

// Function to sort books by title using selection sort
function selectionSortBooksByTitle() {
    for (let i = 0; i < books.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < books.length; j++) {
            if (books[j].title.toLowerCase() < books[minIndex].title.toLowerCase()) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [books[i], books[minIndex]] = [books[minIndex], books[i]]; // Swap the books
        }
    }
}

// Handle sort button click
document.getElementById('sortButton').addEventListener('click', function() {
    selectionSortBooksByTitle();
    renderBooks(); // Re-render the table with sorted books
});
