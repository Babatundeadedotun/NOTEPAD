const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../Controllers/user.controller')
const { createMessage } = require("../Controllers/message.controller")


router.post('/register', registerUser);

router.post('/login', loginUser);


module.exports = router;