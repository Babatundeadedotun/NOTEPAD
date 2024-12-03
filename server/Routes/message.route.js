const express = require("express");
const messageRouter = express.Router();
const { createMessage, getMessage, uploadImage, deleteMessage, updateMessage } = require("../Controllers/message.controller");



messageRouter.post('/save', createMessage);

messageRouter.get("/save/:email", getMessage)

messageRouter.post("/save/upload", uploadImage);

messageRouter.delete("/save/:id", deleteMessage);

messageRouter.put("/save/:id", updateMessage);

module.exports = messageRouter;