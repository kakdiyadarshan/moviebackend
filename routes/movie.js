var express = require('express');
var router = express.Router();
var movie = require('../controller/movie');
const auth = require('../middleware/auth')
const multer = require('multer');

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'Public/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  var upload = multer({ storage: storage })

/* GET home page. */
// router.post('/addmovie',auth.auth_check, upload.single('image'),movie.addmovie);
router.post('/addmovie',auth.auth_check,movie.addmovie);
router.put('/updatemovie/:id',auth.auth_check,movie.updatemovie);
router.delete('/deletemovie/:id',auth.auth_check,movie.deletemovie);
router.get('/movies',movie.getallmovie);
router.get('/movie/:id',movie.getonemovie);

module.exports = router;
