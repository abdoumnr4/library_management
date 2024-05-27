const books = [];
const borrowers = [];
const loans = [];

const bookTable = document.getElementById('bookTable').getElementsByTagName('tbody')[0];
const borrowerTable = document.getElementById('borrowerTable').getElementsByTagName('tbody')[0];
const loanTable = document.getElementById('loanTable').getElementsByTagName('tbody')[0];
const bookCountElement = document.getElementById('bookCount');
const borrowerCountElement = document.getElementById('borrowerCount');

// Add Book Event
document.getElementById('bookForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;
    const editor = document.getElementById('editor').value;
    const genre = document.getElementById('genre').value;
    const pages = document.getElementById('pages').value;
    const language = document.getElementById('language').value;

    const bookData = { title, author, year, editor, genre, pages, language };
    books.push(bookData);
    addBookToTable(bookData);
    updateBookCount();
    updateLoanBookOptions();
    document.getElementById('bookForm').reset();
});

// Add Borrower Event
document.getElementById('borrowerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const borrowerName = document.getElementById('borrowerName').value;
    const borrowerContact = document.getElementById('borrowerContact').value;

    const borrowerData = { name: borrowerName, contact: borrowerContact };
    borrowers.push(borrowerData);
    addBorrowerToTable(borrowerData);
    updateBorrowerCount();
    updateLoanBorrowerOptions();
    document.getElementById('borrowerForm').reset();
});

// Add Loan Event
document.getElementById('loanForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const borrowerName = document.getElementById('loanBorrower').value;
    const bookTitle = document.getElementById('loanBook').value;
    const loanDate = document.getElementById('loanDate').value;
    const returnDate = document.getElementById('returnDate').value;

    const loanData = { borrowerName, bookTitle, loanDate, returnDate };
    loans.push(loanData);
    addLoanToTable(loanData);
    document.getElementById('loanForm').reset();
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

function addBorrowerToTable(borrower) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${borrower.name}</td>
        <td>${borrower.contact}</td>
        <td><button onclick="deleteBorrower(${borrowers.length - 1})">Delete</button></td>
    `;
    borrowerTable.appendChild(row);
}

function addLoanToTable(loan) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${loan.borrowerName}</td>
        <td>${loan.bookTitle}</td>
        <td>${loan.loanDate}</td>
        <td>${loan.returnDate}</td>
        <td><button onclick="deleteLoan(${loans.length - 1})">Delete</button></td>
    `;
    loanTable.appendChild(row);
}

function deleteBook(index) {
    books.splice(index, 1);
    renderBooks();
    updateBookCount();
    updateLoanBookOptions();
}

function deleteBorrower(index) {
    borrowers.splice(index, 1);
    renderBorrowers();
    updateBorrowerCount();
    updateLoanBorrowerOptions();
}

function deleteLoan(index) {
    loans.splice(index, 1);
    renderLoans();
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

function renderBorrowers() {
    borrowerTable.innerHTML = '';
    borrowers.forEach((borrower, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${borrower.name}</td>
            <td>${borrower.contact}</td>
            <td><button onclick="deleteBorrower(${index})">Delete</button></td>
        `;
        borrowerTable.appendChild(row);
    });
}

function renderLoans() {
    loanTable.innerHTML = '';
    loans.forEach((loan, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${loan.borrowerName}</td>
            <td>${loan.bookTitle}</td>
            <td>${loan.loanDate}</td>
            <td>${loan.returnDate}</td>
            <td><button onclick="deleteLoan(${index})">Delete</button></td>
        `;
        loanTable.appendChild(row);
    });
}

function updateBookCount() {
    bookCountElement.textContent = books.length;
}

function updateBorrowerCount() {
    borrowerCountElement.textContent = borrowers.length;
}

function updateLoanBookOptions() {
    const loanBookSelect = document.getElementById('loanBook');
    loanBookSelect.innerHTML = '';
    books.forEach(book => {
        const option = document.createElement('option');
        option.value = book.title;
        option.textContent = book.title;
        loanBookSelect.appendChild(option);
    });
}

function updateLoanBorrowerOptions() {
    const loanBorrowerSelect = document.getElementById('loanBorrower');
    loanBorrowerSelect.innerHTML = '';
    borrowers.forEach(borrower => {
        const option = document.createElement('option');
        option.value = borrower.name;
        option.textContent = borrower.name;
        loanBorrowerSelect.appendChild(option);
    });
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
