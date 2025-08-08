const fs = require('fs')
const path = require('path')
const { text } = require('stream/consumers')

const textFilePath = path.join(__dirname, 'files','new.txt')
const content = "this is a new file "
 fs.writeFile(textFilePath, content, (err)=>{
    if (err){
        console.log(err)
    }
console.log('file written succesfully')
 })
 

//  append to afile 
 fs.appendFile(textFilePath,'|n this is a thid line ',(err)=>{
    if(err){
        console.log(err)
        return
    }
    console.log('adddition to the file ')
 })