const express = require('express');
const router = express.Router();
const path = require('path');

let mainController = require ('../controllers/mainController');

router.get('/', mainController.index);


module.exports = router;