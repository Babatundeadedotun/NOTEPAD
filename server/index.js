const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const router = require("./Routes/user.route")
const messageRouter = require("./Routes/message.route")
dotenv.config()
const PORT = process.env.PORT
const URL = process.env.URI
const path = require("path")


app.use(cors({ 
    origin: "https://notepad-six-ebon.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true }))
app.use(express.json({ limit: '9000mb' }))
app.use(express.urlencoded({ limit: '9000mb', extended: true }))
// app.use(express.static('public'))
app.use(express.static(path.join(__dirname, '../client/dist')))




            mongoose.connect(URL)
            .then(() => {
                console.log('Connected to Database')
            })
            .catch((err) => {
                console.log(err)
            })


    app.use("/api/users", router)

    app.use("/api/messages", messageRouter)

    // app.get("/", (req, res) => {
    //     res.send("Hello World");
    // })

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"))
    })


// app.listen(PORT,() => {
//     console.log(`Server is running on ${PORT}`)
// })


module.exports = app