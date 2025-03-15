const express = require('express')
const { createNotes, notesRouteCheck, getNotes, updateNOtes, deleteNotes } = require('../controller/notes.controller')
const Router = express.Router()




Router.get('/',notesRouteCheck)
Router.post('/create-notes',createNotes)
Router.get('/get-notes',getNotes)
Router.put('/update-notes/:id',updateNOtes)
Router.delete('/delete-notes/:id',deleteNotes)



module.exports=Router;