const express = require("express")
const { userRegister, userLogin, userLogout, usersData, saveItems } = require("../controller/user")
const userMiddleware = require("../middleware/userMiddleware")

const router = express.Router()


router.post("/register" , userRegister)
router.post("/login",userLogin)
 router.post("/logout",userLogout)
router.get("/data",usersData)
router.put("/saveProduct/:id",userMiddleware, saveItems)
module.exports = router