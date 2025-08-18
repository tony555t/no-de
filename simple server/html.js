const { write } = require("fs");
const http = require("http");
// const { request } = require("https");
const HOSTNAME ="localhost"
const PORT = 3000

function requestHandler(req,res){
    console.log(req)

    res.statusHeader(200,{'Content-Type':'text/plain',
                          'Acces-content-Allow-Origin':"*"

    })
    res.write( "this was made from the scrtch\n");
    res.write ("sending greetings\n");
    res.end("hello from the server\n")
}
const server = http.createServer(requestHandler)
server.listen(PORT, HOSTNAME, () => {
    console.log(`server started succefully at http://${HOSTNAME}:${PORT}`)
})
    'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*'
    });
