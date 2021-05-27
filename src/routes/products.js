const express = require('express');
const router = express.Router();
const path = require ('path');
const multer = require ('multer');


// Configuración de Multer
let storage = multer.diskStorage({
    destination: (req,file,callback) =>{
        let folder = path.join (__dirname, '../../public/img/imgArticulos');
        callback (null, folder);
    },
    filename: (req,file,callback) =>{
        let imageName = 'art' + Date.now() + path.extname(file.originalname);
        callback(null, imageName);
    }
});

let fileUpload = multer({storage});



let productController = require ('../controllers/productController');

router.get('/', productController.list);
router.get('/create', productController.create);
router.post('/create', fileUpload.single('imagenProducto'), productController.storage);
router.get('/detail/:id', productController.detail);
router.delete('/detail/:id', productController.delete);
router.get('/edit/:id', productController.edit);
router.put('/edit/:id', productController.update);




module.exports = router;