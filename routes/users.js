var express = require("express");
var router = express.Router();
var user = require("../controller/user");
var auth = require("../middleware/auth");

/* GET users listing. */
router.post("/add", user.adduser);
router.post("/confirmseat",auth.auth_check,user.confirmseat);
router.post("/", user.userlogin);
router.get("/logout", user.userlogout);
router.get("/get/:id", auth.user_check, user.get);

module.exports = router;
