const express = require('express');
const router = express.Router();
const path = require ('path');
const multer = require('multer');

let storage = multer.diskStorage({
    destination: (req, file, callback)=>{
        let folder = path.join(__dirname, '../../public/img/imgUsuarios');
        callback(null, folder);
    },
    filename: (req, file, callback) =>{
        let imageName = 'user' + Date.now() + path.extname(file.originalname);
        callback(null, imageName);
    }
});

let fileUpload = multer({storage});

let usersController = require ('../controllers/usersController');

router.get ('/list', usersController.list);
router.get ('/detail/:userName', usersController.detail);
router.get ('/edit/:userName', usersController.edit);
router.put ('/edit/:userName', usersController.save);
router.get ('/login', usersController.login);
router.get ('/register', usersController.register);
router.post ('/register', fileUpload.single('fotoPerfil'), usersController.create);


module.exports = router;