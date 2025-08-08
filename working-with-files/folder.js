const fs = require('fs')
const path = require('path')

// Read the 'files' directory that exists in your project
const folderPath = path.join(__dirname,'files')
// to read directory
fs.readdir(folderPath,(err,files)=>{
    if(err){
        console.log(err)
        return
    }
    console.log(files)
    console.log('folder opened successfully')
})

//create a folder
const newFolderPath = path.join(__dirname,'files','new_folder')
fs.mkdir(newFolderPath,{recursive:true },(err)=>{
    if(err){
        console.log(err)
        return
    }
    console.log('folder crested successfully')
})
//
const newFolder = path.join(__dirname,'files','new_folder_renamed')
fs.rename(newFolderPath,newFolder,(err)=>{
    if(err){
        console(err)
        return
    }
    console.log('folder renamed succesfully')
})

/// delete folderr
fs.rmdir(newFolder,(err)=>{
    if(err){
        console.log(err)
        return
    }
    console.log('folder delete succesfully')
})
 