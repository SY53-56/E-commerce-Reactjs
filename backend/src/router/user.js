const express = require("express")
const { userAuthentication } = require("../middleware/userMiddleware")
const { userRegister, userLogin } = require("../controller/user")
const router = express.Router()


router.post("/register" , userRegister)
router.post("/login",userLogin)
 
module.exports = router