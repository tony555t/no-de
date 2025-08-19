const http = require('http');
const fs = require('fs');
const path = require ('path');
const { json } = require('stream/consumers');

const booksDbpath = path.join(__dirname, "db",'books.json');
    let booksDB = [];

const PORT = 4000
const HOST_NAME =  'localhost';


const requestHandler = function(req,res){
    res. setHeader("content-Type","application/json");
     
    if (req.url ==='./books'&& req.method === 'GET'){
        getAllBooks(req, res);
    }
    else if( req.url ==='/books' && req.method === 'POST'){
        addBook(req, res);

    }else if( req.url.startsWith('/books') && req.method === 'DELETE'){
        deleteBook(req,res);

    }else{
        res.writeHeader(404);
        res.end(json.stringify({
            message:'message not supported'
        }))
    }
}

// retreiving all books
const getAllBooks = function(req, res){
    fs.readFile(booksDbpath,"utf8",(err,books)=>{
        if(err){
            console.log(err)
            res.writeHeader(400)
            res.end("an error occured")
        }
    })
}

// create  a book 
const addBook=function(req, res){
    const body = [];
    req.on ('data',(chunk)=>{
        body.push(chunk);
    }
        
    );
    req.on('end',()=>{
        const parsedBody = Buffer.concat(body).toString();
        const newBook = JSON.parse(parseBody);

        //get id of the last book
        const lastBook = booksDB[booksDB.length -1];
        const  lastBookId = lastBook.id;
        newBook.id = lastBookId +1;

        // save to the db

        booksDB.push(newBook);
        fs.writeFile(booksDbpath, JSON.stringify(booksDB),(err)=>{
            if(err){
                console.log(err);
                res.writeHeader(500);
                res.end(JSON.stringify({
                    message:'internal server error'
                }));
            }

            res.end(JSON.stringify(newBook));
        })
    })
}

const updateBook = function(req ,res){
    const body =[];
    req.on('data',(chunk)=>{
        body.push(chunk);
    });
    req.on('end',()=>{
        const parseBody = buffer.concat(body).toString();
        const bookToUpdate = JSON.parse(parsedBody);

        const bookIndex = booksDB.findIndex((book)=>{
            return book.id === bookToUpdate.id;
        })
        if (bookIndex === -1){
            res.writeHead(404);
            res.end(JSON.stringify({
                message:'book not found'
            }));
            return
        }
        //updating the book in the database
        booksDB[bookIndex] = {...booksDB[bookIndex],...bookToUpdate}

        // save to db
       fs.writeFile(booksDbpath, JSON.stringify(booksDB),(err)=>{
        if(err){
            console.log(err);
            res.writeHead(500);
            res.end(JSON.stringify({
            message:'internal server error. could not update book in data'
            }))
        }
        res.end (JSON.stringify(bookToUpdate))
       })
    })
}

// delete a book
const deleteBook = function (req,res){
    const bookId = req.url.split('/')[2];

    //remove book from database
    const bookIndex = booksDB.findIndex((book)=>{
        return book.id === path.parseInt(bookId);
    })
    if (bookIndex === -1){
        res.writeHead(404);
        res.end(JSON.stringify({
            message: 'book not found'
        }))
        return;
    }
    booksDB.splice(bookIndex,1)//remove the book from the database using the index

    if(err){
        console.log(err);
        res.writeHead(500);
        res.end(JSON.stringify({
            message:'internal server error.could not delete book from database'
        }));
    }
    res.end(JSON.stringify({
        message:'book deleted'
    }))
}
//create a server 
const server = http.createServer(requestHandler)

server.listen(PORT, HOST_NAME,()=>{
    booksDB = JSON.parse(fs.readFileSync(booksDbpath,'utf8'));
    console.log (`server is listening on ${HOST_NAME}:${PORT}`)
})