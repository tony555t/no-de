const fs = require('fs')
const path =require('path')
  
//delete afile 
const filePath = path.join(__dirname,'files','file_to_delete.txt')
 fs.rm(filePath,(err)=>{
    if(err){
        console.log(err)
        return
    }
    console.log('file deleted succesfully')
 })