const mongoose = require("mongoose")
const bcrypt = require("bcrypt")


let userSchema = mongoose.Schema({
    firstName: {type: String, required: [true, "First Name is required"]},
    lastName: {type: String, required: [true, "Last Name is required"]},
    email: {type: String, required: [true, "Email is required"], unique: true},
    password: {type: String, required: [true, "Password is required"]}
})

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})


const userModel = mongoose.model("users", userSchema);

module.exports = userModel;

