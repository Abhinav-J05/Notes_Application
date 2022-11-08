// const hello = require('fs')

// hello.appendFileSync('note.txt', 'My name is Abhinav')
const validator = require('validator')
const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')
const { string, demand, demandOption, argv } = require('yargs')


yargs.command({
    command: 'Add',
    describe: 'This is to Add a note here...',
    builder:{
        title:{
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body:{
            describe: 'What do you want to add',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        console.log('Adding'),
        notes.addNote(argv.title, argv.body)
    }
})

yargs.command({
    command: 'Remove',
    describe: 'this is to remove a note from here...',
    builder:{
        title:{
            describe:'Note Title',
            demandOption: true,
            type:'string'
        }
    },
    handler(argv) {
        console.log(chalk.red('Process Started...'))
        notes.removeNotes(argv.title)
    }
})

yargs.command({
    command: 'List',
    describe: 'List all the available Notes...',
    handler() {
        console.log(chalk.blue('Getting all the Notes...'))
        notes.ListNotes()
    }
})

yargs.command({
    command: 'Read',
    describe: 'Read a Note...',
    builder:{
        title:{
            describe:'Note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        console.log(chalk.yellow('Bringing...'))
        notes.ReadNotes(argv.title)
    }
})
yargs.parse()