const http = require('http');
const fs = require('fs');
const path = require('path');
const { buffer } = require('stream/consumers');

const booksDbPath = path.join(__dirname, 'db', 'books.json');

const PORT = 4000;
const HOST_NAME = 'localhost';

function requestHandler(req, res) {
    if (req.url === '/books' && req.method === "GET") {
        getAllBooks(req, res);
    } else if (req.url === '/books' && req.method === "POST") {
        addBook(req, res);
    } else if (req.url === '/books' && req.method === "PUT") {
        updateBook(req, res);
    } else if (req.url === '/books' && req.method === "DELETE") {
        deleteBook(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
}

function getAllBooks(req, res) {
    fs.readFile(booksDbPath, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            res.writeHead(500);
            res.end("An error occurred");
            return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
    });
}

function addBook(req, res) {
    const body = [];
    req.on("data", (chunk) => {
        body.push(chunk);
    });

    req.on("end", () => {
        const parsedBody = Buffer.concat(body).toString();
        const newBook = JSON.parse(parsedBody);

        fs.readFile(booksDbPath, "utf8", (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end("Error reading database");
                return;
            }

            const books = JSON.parse(data);
            books.push(newBook);

            fs.writeFile(booksDbPath, JSON.stringify(books, null, 2), (err) => {
                if (err) {
                    res.writeHead(500);
                    res.end("Error saving book");
                    return;
                }

                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(newBook));
            });
        });
    });
}
// updating books

function updateBook(req, res) {
    const body = [];
    req.on("data", (chunk) => {
        body.push(chunk);
    });

    req.on("end", () => {
        try {
            const parsedBody = Buffer.concat(body).toString();
            const updatedBook = JSON.parse(parsedBody);

            fs.readFile(booksDbPath, "utf8", (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end("Error reading database");
                    return;
                }

                const books = JSON.parse(data);
                const bookIndex = books.findIndex(book => book.id === updatedBook.id);

                if (bookIndex === -1) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: "Book not found" }));
                    return;
                }

                // Update the book
                books[bookIndex] = updatedBook;

                fs.writeFile(booksDbPath, JSON.stringify(books, null, 2), (err) => {
                    if (err) {
                        res.writeHead(500);
                        res.end("Error saving updated book");
                        return;
                    }

                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(updatedBook));
                });
            });
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "Invalid JSON" }));
        }
    });
}

// delete books
function deleteBook(req, res) {
    const body = [];
    req.on("data", (chunk) => body.push(chunk));

    req.on("end", () => {
        const parsedBody = Buffer.concat(body).toString();
        const { id } = JSON.parse(parsedBody);

        fs.readFile(booksDbPath, "utf8", (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end("Error reading database");
                return;
            }

            let books = JSON.parse(data);
            const filteredBooks = books.filter(book => book.id !== id);

            if (books.length === filteredBooks.length) {
                res.writeHead(404);
                res.end("Book not found");
                return;
            }

            fs.writeFile(booksDbPath, JSON.stringify(filteredBooks, null, 2), (err) => {
                if (err) {
                    res.writeHead(500);
                    res.end("Error deleting book");
                    return;
                }

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Book deleted' }));
            });
        });
    });
}

const server = http.createServer(requestHandler);

server.listen(PORT, HOST_NAME, () => {
    console.log(`Server running at http://${HOST_NAME}:${PORT}`);
});
