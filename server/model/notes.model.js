const mongoose = require('mongoose');

const notesSchema = mongoose.Schema({
    notes:{
        type:String,
        required:true,
    },
    completed:{
     type:Boolean,
     required:true
    },
    createdAt:{
        type:String,
        default:Date.now
    }
})


const notesModel = mongoose.model("notesModel",notesSchema);


module.exports=notesModel