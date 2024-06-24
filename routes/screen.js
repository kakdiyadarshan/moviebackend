var express = require("express");
var router = express.Router();
var screen = require("../controller/screen");
var auth = require("../middleware/auth");

/* GET users listing. */
router.post("/add",auth.auth_check, screen.addscreen);
router.put("/update/:id",auth.auth_check, screen.updatescreen);
router.delete("/delete/:id",auth.auth_check, screen.deletescreen);
router.get("/screens",auth.auth_check, screen.getallscreen);
router.get("/screen/:id",auth.auth_check, screen.getonescreen);


module.exports = router;
