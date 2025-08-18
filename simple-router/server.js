const http = require('http');
   const { authors,book}= require('./fixtures');
const { books } = require('./fixture');
   const PORT = 4000
   const HOST_NAME="localhost";

   const requestHandler (req,res){
    res.setHeader("Content-Type", "application/json");
    console.log(req.url)
    console.log(req.method)
    
    switch(req.url){
        case '/books':
             res.end(json.stringify(books));
             break;
        case'/authour':
            res.end(json.stringify(authors));
            break;
            default:
                res.writeHead(404);
                res.end(json.stringify({
                    message:'not found'
                }))
    }

   }

   const server = http.createServer(requestHandler)
    server.listen(PORT,HOST_NAME,()=>{
        console.log(`server is listening on ${HOST_NAME}:${PORT}`)
    })
   