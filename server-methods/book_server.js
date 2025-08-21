const http = require ('http');
 const fs = require ('fs');
 const path = require('path');


 const booksDbpath = path.join(__dirname,"db",'books.json');

 const PORT =4000 ;
 const HOST_NAME = 'localhost';

 function requestHandler (req,res){
    if (req.url === '/books'&& req.method === "GET"){
        // READ THE LOAD AND RETURN BOOKS
        getAllBooks(req,res)

    }else if(req.url === '/books'&& req.method ==="post"){
        addBook(req,res)
    }else if (req.url === '/books'&& req.method === "PUT"){
        updateBook(req,res)
    }else if (req.url === '/books' && req.method === "DELETE"){
        deleteBook(req,res)
    }
 }
 function getAllBooks(req,res){
    fs.readFile(booksDbpath,"utf8",(err,data)=>{
        if (err){
            console.log(err)
            res.writeHead(400)
            res.end("an error occcured")
        }
        res.end(data)
    })
 }

 function addBook(req,res){
    const body =[]

    req.on("data",(chunk)=>{
        body.push(chunk)
    })
 }