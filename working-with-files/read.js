const fs = require('fs')
const path = require('path')

const poemFilePath = path.join(__dirname, 'files','poem.txt')
const countriesFilePath = path.join(__dirname,'files','countries.json')

fs.readFile(poemFilePath,'utf8',(err,data)=>{
    if(err){
        console.log(err)
        return
    }
    console.log("file raad successfully")
    console.log(data)
})
//  read a file synchronously
const poemData = fs.readFileSync(countriesFilePath,'utf8')
// console.log(poemData)