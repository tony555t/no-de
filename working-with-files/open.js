const fs = require('fs')
const path = require('path')

const poemFilePath = path.join(__dirname,'file')

fs.open(poemFilePath,'r',(err,fd)=>{
    if(err){
        console.log(err)
        return
    }
    console.log('file opened sucessfully')

    fs.readFile(fd, 'utf-8',(err,data)=>{
        if(err){
            console.log(err)
            return
        }
        console.log(data)
        console.log('file read succeessfully')
    })
})
//opening the file synchronously
const poemFd = fs.openSync(poemFilePath,'r')

//readfilesync is a blocing operation so it will wait until
const poemData = fs.readFileSync(poemFd , 'utf8')
console.log('file descriptor',poemData)