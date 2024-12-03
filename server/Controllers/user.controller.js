const userModel = require("../Model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();



const registerUser = async (req, res) => {
    console.log(req.body)
    console.time("Save user")
    const form = new userModel(req.body)
    await form.save()
    .then((result) => {
        if(result){
            res.send({ message: "Sign up successful", status: true });
            console.timeEnd("Save user")
        } else {
            res.send("Data not saved")
        }
    })
    
    .catch((err) => {
        console.log(err)
        res.send("Data not saved")
    })
}


const loginUser = async (req, res) => {
    const secret = process.env.SECRET
    const { email, password } = req.body

        console.time("Login request");

        userModel.findOne({ email })
        .then((result) =>{
            console.timeEnd("Login request")
            console.time("Password comparison")
            
            if(!result){
              console.log("Invalid Login Credentials");
              return res.status(404).json({ message: "Invalid Login Credentials" });
            }

            bcrypt.compare(password, result.password)
            .then((match)=>{
                console.timeEnd("Password comparison")

                if(!match){
                    console.log("Incorrect password");
                    return res.status(401).json({ message: "Incorrect Password" });
                } 

                const token = jwt.sign({ email }, secret, { expiresIn: "1h" });

                res.send({ message: "Sign in successful", status: true, user: result, token: token });
                console.log("Login successful");
            })
            .catch((err) => {
                console.log("Error during password comparison:", err);
                res.status(500).json({ message: "Internal server error" });
            })
        })
        .catch((err) =>{
            console.log("Error during database query:",err);
            res.status(500).json({ message: "Internal server error" });
        })
}





module.exports = { registerUser, loginUser }