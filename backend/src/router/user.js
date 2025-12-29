const express = require("express")
const { userRegister, userLogin, userLogout } = require("../controller/user")
const userMiddleware = require("../middleware/userMiddleware")
const router = express.Router()


router.post("/register" , userRegister)
router.post("/login",userLogin)
 router.post("/logout",userLogout)
 router.get("/me", userMiddleware, (req, res) => {
  res.json({ user: req.user });
});
module.exports = router