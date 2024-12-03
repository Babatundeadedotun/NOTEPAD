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


app.use(cors({ 
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true }))
app.use(express.json({ limit: '9000mb' }))
app.use(express.urlencoded({ limit: '9000mb', extended: true }))
app.use(express.static("public"))




            mongoose.connect(URL)
            .then(() => {
                console.log('Connected to Database')
            })
            .catch((err) => {
                console.log(err)
            })


    app.use("/", router)

    app.use("/", messageRouter)


app.listen(PORT,() => {
    console.log(`Server is running on ${PORT}`)
})