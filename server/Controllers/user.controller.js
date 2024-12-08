const userModel = require("../Model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const path = require("path");
const { log } = require("console");
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
                console.log('comparing passwords');
                
                console.log('stored password hash:', result.password);
                console.log('password to compare:', password);



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


const forgetPassword = async (req, res) => {
    console.log(req.body);

    const { email } = req.body;

    try {

    
     const user = await userModel.findOne({ email })
    
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        } 

        const resetToken = crypto.randomBytes(20).toString("hex");
        const tokenExpiry = Date.now() + 3600000; // 1 hour from now

        user.resetToken = resetToken;
        user.resetTokenExpiry = tokenExpiry;
        await user.save()


        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            }
        })

        const resetLink = `http://localhost:5173/reset-password/${resetToken}`;
         transporter.sendMail({
            to: email,
            subject: "Password Reset Request",
            html: `<p>You requested a password reset. Click the link to reset your password: </p>
            <a href="${resetLink}">Reset Password</a>
            <p>This link will expire in 1 hour</p>`,
         });
        return res.status(200).json({ message: "Password Reset link sent to your email." });
    }
    catch(error) {
        console.error("Error processing request:", error);
        return res.status(500).send({ message: "Internal server error" });
    }
    

}


const resetPassword = async (req, res) => {
    const { token } = req.params
    const { password } = req.body

    try {
        const user = await userModel.findOne({resetToken: token, resetTokenExpiry: { $gt: Date.now() }})

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired password reset token" })
        }
         const hashedPassword = await bcrypt.hash(password, 12)
        
        //  console.log('Plain password (during reset):', password);
         
        //  console.log('Generated hash (during reset):',hashedPassword);
         

         user.password = hashedPassword;
         user.resetToken = undefined;
         user.resetTokenExpiry = undefined;
        // console.log('user before saving:', user);
        
         await user.save();

        //  console.log('user after saving:', user);
         

         res.status(200).json({ message: "Password reset successful" })
    } catch (error) {
        console.error("Error in reset password:", error);
        res.status(500).json({ message: "An error occurred while resetting the password" });
    }
}


// 


module.exports = { registerUser, loginUser, forgetPassword, resetPassword }