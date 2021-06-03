const express = require('express');
const router = express.Router();


const fileUpload = require ('../middlewares/multerMiddlewares');
const validations = require ('../middlewares/validationsMiddlewares');


let usersController = require ('../controllers/usersController');




router.get ('/list', usersController.list);
router.get ('/detail/:userName', usersController.detail);
router.get ('/edit/:userName', usersController.edit);
router.put ('/edit/:userName', usersController.processEdit);
router.get ('/register', usersController.register);
router.post ('/register', fileUpload.single('fotoPerfil'), usersController.processRegister);
router.get ('/login', usersController.login);
router.post ('/login', usersController.processLogin);
router.delete('/delete/:userName', usersController.delete);



module.exports = router;



