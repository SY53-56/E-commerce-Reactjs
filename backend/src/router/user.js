const express = require("express")
const { userRegister, userLogin, userLogout, usersData } = require("../controller/user")

const router = express.Router()


router.post("/register" , userRegister)
router.post("/login",userLogin)
 router.post("/logout",userLogout)
router.get("/data",usersData)
module.exports = router