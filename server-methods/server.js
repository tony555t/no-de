const http = require('http');
const fs = require('fs');
const path = require ('path');

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


