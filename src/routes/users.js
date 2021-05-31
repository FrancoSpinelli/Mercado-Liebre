const express = require('express');
const router = express.Router();
const path = require ('path');
const multer = require('multer');
const {check} = require('express-validator');



let usersController = require ('../controllers/usersController');

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

let validateRegister = [
    check('name')
        .notEmpty().withMessage('Debes completar el nombre').bail()
        .isLength({min: 5}).withMessage('El nombre debe tener al menos 5 caracteres'),
    check('userName')
        .notEmpty().withMessage('Debes completar el nombre de usuario').bail()
        .isLength({min: 5, max: 12}).withMessage('El nombre debe tener entre 5 y 12 caracteres'),
    check('email')
        .notEmpty().withMessage('Debes completar el correo electrónico').bail()
        .isEmail().withMessage('Debes completar un email válido'),
    check('birtday')
        .notEmpty().withMessage('Debes ingresar una fecha válida'),
    check('pass')
        .notEmpty().withMessage('Debes completar los campos de contraseña').bail()
        .isLength({ min: 8 }).withMessage('La contraseña debe ser más larga'),
    check('fotoPerfil').custom((value, {req})=>{
        let file = req.file;
        if (!file) {
            throw new Error ('Debes seleccionar una imagen');
        }
        return true;
    })
];


router.get ('/list', usersController.list);
router.get ('/detail/:userName', usersController.detail);
router.get ('/edit/:userName', usersController.edit);
router.put ('/edit/:userName', usersController.save);
router.get ('/login', usersController.login);
router.get ('/register', usersController.register);
router.post ('/register', validateRegister, fileUpload.single('fotoPerfil'), usersController.create);


module.exports = router;



