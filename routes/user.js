const express = require("express");
const { register, login, getMarkListData } = require("../controllers/user/user");
const { authUser } = require("../middlewares/userAuth");



const router = express.Router();

router.post("/register",register)
router.post("/login" ,login)
router.get("/getMarkListData",authUser,getMarkListData)

module.exports = router;