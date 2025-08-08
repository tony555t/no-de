const fs = require('fs')
const { stat } = require('fs/promises')
const path = require('path')

const poemFilePath = path.join(__dirname,'files')

fs.stat (poemFilePath,(err,stats)=>{
    if(err){
        console.log(err)
    }else{
        console.log(stats.isFile())
        console.log(stats.isDirectory())
        console.log(stats.size)

    }
})

// let get the file syncronously
const stats = fs.statSync(poemFilePath)

console.log(stats)
console.log(stats.isFile())
console.log(stats.isDirectory())
console.log(stats.size)

