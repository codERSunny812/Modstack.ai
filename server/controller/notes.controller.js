const notesModel = require("../model/notes.model");

const notesRouteCheck = (req, res) => {
    try {
        return res.status(200).json({
            message: "the notes route is running",
        });
    } catch (error) {
        return res.status(404).json({
            message: "the notes route is not running",
            errorMessage: error,
        });
    }
};


// to create a notes
const createNotes = async (req, res) => {
    const { notes,completed } = req.body;

    console.log(req.body)
    try {
        if (!notes) {
            return res.status(406).json({
                message: "type something then add!!",
            });
        }

        // Check if the note already exists in the database
        const notesCheck = await notesModel.findOne({ notes });
        if (notesCheck) {
            return res.status(208).json({
                message: "note is already added",
            });
        }

        // Save the new note
        const addNotes = new notesModel({ notes,completed });
        await addNotes.save();
        

        return res.status(200).json({
            message: "note is added successfully",
            data: addNotes,
        });
    } catch (error) {
        return res.status(500).json({
            message: "error in adding the note",
            errorMessage: error.message,
        });
    }
};

// to get all the notes 
const getNotes = async (req,res)=>{
    try {
        const data = await notesModel.find();

        return res.status(200).json({
            message:"the data is successfully fetched",
            data:data
        })
    } catch (error) {
        return res.status(400).json({
            message:"unable to fetch the data",
            error:error
        })
    }
}

//to update a notes 
const updateNOtes = async(req,res)=>{
    try {
        const { id } = req.params;
        const { notes, completed } = req.body;
        const updatedNote = await notesModel.findByIdAndUpdate(
            id,
            { notes, completed },
            { new: true }
        );
        res.status(200).json({ message: "Note updated successfully", data: updatedNote });
    } catch (error) {
        res.status(500).json({ message: "Error updating note", error: error.message });
    }
}


//to delete a notes
const deleteNotes = async(req,res)=>{
    try {
        const { id } = req.params;
        await notesModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting note", error: error.message });
    }
}

// Export the functions properly
module.exports = { notesRouteCheck, createNotes,getNotes, updateNOtes, deleteNotes };
