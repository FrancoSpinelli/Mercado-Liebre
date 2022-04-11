const express = require('express');
const router = express.Router();


const fileUpload = require ('../middlewares/multerMiddlewares');
const validateRegister = require ('../middlewares/validationsMiddlewares');
const guestMiddleware = require ('../middlewares/guestMiddleware');
const authMiddleware = require ('../middlewares/authMiddleware');
let usersController = require ('../controllers/usersController');




router.get ('/list', usersController.list);

router.get ('/register', guestMiddleware, usersController.register);
router.post ('/register', fileUpload.single('image'), validateRegister, usersController.processRegister);

router.get ('/detail/:userName', usersController.detail);
router.get ('/edit/:userName', usersController.edit);
router.put ('/edit/:userName', fileUpload.single('image'), usersController.processEdit);
router.get ('/login',guestMiddleware, usersController.login);
router.post ('/login', usersController.processLogin);
router.delete('/delete/:userName', usersController.delete);
router.get('/logout', usersController.logout);



module.exports = router;



