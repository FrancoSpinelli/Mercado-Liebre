const {body} = require('express-validator');

let validateRegister = [
    body('name')
        .notEmpty().withMessage('Debes completar el nombre').bail()
        .isLength({min: 5}).withMessage('El nombre debe tener al menos 5 caracteres'),
    body('userName')
        .notEmpty().withMessage('Debes completar el nombre de usuario').bail()
        .isLength({min: 5, max: 12}).withMessage('El nombre debe tener entre 5 y 12 caracteres'),
    body('email')
        .notEmpty().withMessage('Debes completar el correo electrónico').bail()
        .isEmail().withMessage('Debes completar un email válido'),
    body('pass')
        .notEmpty().withMessage('Debes completar los campos de contraseña').bail()
        .isLength({ min: 8 }).withMessage('La contraseña debe ser más larga'),
    // body('fotoPerfil').custom((value, {req})=>{
    //     let file = req.file;
    //     if (!file) {
    //         throw new Error ('Debes seleccionar una imagen');
    //     }
    //     return true;
    // })
];

module.exports = validateRegister;