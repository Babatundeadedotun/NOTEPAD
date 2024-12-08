const cloudinary = require("cloudinary").v2;
const Content = require("../Model/message.model")
const jwt = require("jsonwebtoken");
require("dotenv").config();



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


    const uploadImage =  async (req, res) => {

        try {
        // console.log(req.body);
        let image = req.body.file;

        if(!image){
            return res.send({ message: "No Image Provided", status:false, stored: null })
        }
        
        const result = await cloudinary.uploader.upload(image, { width: 500, height: 500, crop: "limit" })
            // console.log(result.url);
            res.send({ message: "Image Uploaded Successfully", status:true, stored: result.url })
        } catch (error) {
            console.log("Error during image upload", error);
            res.status(500).json({ message: "Upload failed", error })
        }
    }

const createMessage = async (req, res) => {
    console.log(req.body);
    // console.log(req.body.file);

    const { userEmail, title, content, date, fileReceived } = req.body;
    
    console.time("Save Content")
    const newContent = new Content({ userEmail, title, content, date, fileReceived: fileReceived || null });
    await newContent.save()
    .then((result) => {
        if(result) {
        res.send({ message: "Note Saved", status: true})
        console.timeEnd("Save Content")
    } else{
        res.send({ message: "Note not saved"})
    }
    })
    .catch((err) => {
        console.log(err);
        res.send({ message: "Note not saved"})
    })
}



const getMessage = async (req, res) => {
    console.log(req.params);
    try {

    const userEmail = req.params.email;
    console.log(`Fetching notes for user: ${ userEmail }`);
    const notes = await Content.find({ userEmail })

        if (notes.length > 0) {
            res.json({ message: "Notes retrieved successfully", notes })
        } else {
            res.json({ message: "No notes found for this user", notes: [] })
        }

    } catch (error) {
        console.log("Error retrieving notes:", error);
        res.status(500).json({ message: "Error retrieving notes", error })
    }

}

    const deleteMessage = async (req, res) => {
        const noteId = req.params.id;

        try {
            const deletedNote = await Content.findByIdAndDelete(noteId);

            if (!deletedNote) {
                return res.status(404).json({ message: "Note not found" })
            }

            res.status(200).json({ message: "Note deleted successfully", note: deletedNote })
        } catch (error) {
            console.error("Error deleting note:", error);
            res.status(500).json({ message: "Error deleting note" })
        }

    }

    const updateMessage = async (req, res) => {
        

        const noteId = req.params.id;

        const { title, content, date, fileReceived } = req.body;

        try {

            const updatedNote = await Content.findByIdAndUpdate(noteId, { title, content, date, fileReceived }, { new: true, runValidators: true });

            if (!updatedNote) {
                return res.status(404).json({ message: "Note not found" })
            }

            res.status(200).json({ message: "Note updated successfully", note: updatedNote })
        } catch (error) {
            console.error("Error updating note:", error);
            res.status(500).json({ message: "Error updating note", error })
        }
        
    }

 



module.exports = { createMessage, getMessage, uploadImage, deleteMessage, updateMessage }