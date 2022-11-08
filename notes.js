const { default: chalk } = require('chalk')

const fs = require('fs')
const { title, listenerCount } = require('process')

const addNote = (title, body)=>{
    const notes = loadNotes()
    notes.push({
        title: title,
        body: body
    })
    saveNotes(notes)
}
const removeNotes = (heading) =>{
    const notes = loadNotes()
    console.log(chalk.red(`Removing the '${heading}'`))
    deleteNotes(heading,notes)
}
const deleteNotes = function(heading,notes){
//    for(let[i,user] of notes.entries()){
//     if(notes.title === heading){
//         notes.splice(i,1)
//     }
//    }
    const NotetoKeep = notes.filter((note)=> note.title!==heading)
    if(NotetoKeep.length == notes.length){
        console.log(chalk.blue('NO NOTE FOUND WITH THIS'))
    }
    else{
        console.log(chalk.red('Note Removed...'))
    }
   saveNotes(NotetoKeep)
}

const ListNotes = () =>{
    const AllNotes = loadNotes()
    console.log(chalk.yellow('Your Notes'))
    AllNotes.forEach((note) => {
        console.log(note.title)
    })

}

const ReadNotes = (Heading)=>{
    const AllNotes = loadNotes()
    const note = AllNotes.find((note) => note.title == Heading)
    
    if(note){
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    }
    else{
        console.log(chalk.red('Note Not Found'))
    }
}
const saveNotes = (notes) =>{
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () =>{
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch(e){
        return []
    }
}
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNotes:removeNotes,
    ListNotes:ListNotes,
    ReadNotes:ReadNotes
}