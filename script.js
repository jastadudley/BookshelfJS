//============================================================================================================================
// The Shelf - Book Recommendation Engine
// Author: Jasta Dudley
// Discriptio: A browser-based book recommendation interface that uses ES6 array Methods, recursion, and Lodash to filter and 
// display nooks by genre.
//============================================================================================================================

//--------------------------------------------------------BOOK DATASET--------------------------------------------------------
const books = [
    {title: "The Shining", author: "Stephen King", genre: "Horror", rating: 4.2},
    {title: "It", author: "Stephen King", genre: "Horror", rating: 4.4},
    {title: "Beloved", author: "Toni Morrison", genre: "Literary Fiction", rating: 4.1},
    {title: "Dune", author: "Frank Herbert", genre: "Science Fiction", rating: 4.5},
    {title: "The House of the Scorpion", author: "Nancy Farmer", genre: "Scince Fiction", rating: 4.0},
    {title: "Pride and Prejudice", author: "Jane Austen", genre: "Classic", rating: 4.3},
    {title: "Jane Eyre", author: "Charlotte Bronte", genre: "Classic", rating: 4.2},
    {title: "The Untethered Soul", author: "Michael Singer", genre: "Spirituality", rating: 4.3},
    {title: "The Courage to Be Disliked", author: "Ichiro Kishimi", genre: "Spirituality", rating: 4.3},
    {title: "Crime and Punishment", author: "Fyodor Dostoevsky", genre: "Classic", rating: 4.4},
    {title: "One Hundred Years of Solitude", author: "Gabriel Garcia Marquez", genre: "Literary Fiction", rating: 4.5},
    {title: "The Road", author: "Cormac McCarthy", genre: "Literary Fiction", rating: 4.0},
];

//--------------------------------------------------------SEARCH FUNCTION-----------------------------------------------------
// This uses the ES6 .filter() to find books matching the genre
function searchByGenre(genre) {
    return books.filter(book =>
        book.genre.toLowerCase().includes(genre.toLowerCase())
    );
}

//--------------------------------------------------------RECURSIVE FUNCTION---------------------------------------------------
// Recursively builds a star rating string
function buildStars(rating, maxStars = 5, current = 0) {
    if (current >= maxStars) return'';
    const star = current < Math.floor(rating) ? '★':'☆';
    return star + buildStars(rating, maxStars, current + 1);
}

//--------------------------------------------------------DISPLAY FUNCTION-----------------------------------------------------
// Uses .map() to create HTML cards for each book
function displayBooks(results) {
    const bookList = document.getElementById('book-list');
    const resultsTitle = document.getElementById('results-title');

    if (results.length === 0) {
        resultsTitle.textContent = 'No books found for that genre. ';
        bookList.innerHTML = '';
        return;
    }

    resultsTitle.textContent = `Found ${results.length} book(s):`;

    const cards = results.map(book => `
        <div class="book-card">
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Genre:</strong> ${book.genre}</p>
            <p><strong>Rating:</strong> ${buildStars(book.rating)} (${book.rating})</p>
        </div>
    `);
    bookList.innerHTML = cards.join(' ');
}

//----------------------------------------------------------EVENT LISTENER-----------------------------------------------------
// Using lodash _.debounce we will prevent the search from firing too fast
const handleSearch = _.debounce(function() {
    const genre = document.getElementById('genre-input').value;
    const results = searchByGenre(genre);
    displayBooks(results);
}, 300);

document.getElementById('search-btn').addEventListener('click', handleSearch);