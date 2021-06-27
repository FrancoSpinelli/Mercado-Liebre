const express = require('express');
const router = express.Router();

const filePorductUpload = require ('../middlewares/multerProductMiddleware');
let productController = require ('../controllers/productController');



router.get('/', productController.list);

router.get('/create', productController.create);
router.post('/create', filePorductUpload.single('imagenProducto'), productController.storage);

router.get('/detail/:id', productController.detail);
router.delete('/detail/:id', productController.delete);

router.get('/edit/:id', productController.edit);
router.put('/edit/:id', productController.update);

module.exports = router;