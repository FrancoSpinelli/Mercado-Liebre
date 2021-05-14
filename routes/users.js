const express = require('express');
const router = express.Router();
const path = require ('path');

let usersController = require ('../controllers/usersController');

router.get ('/list', usersController.list);
router.get ('/detail/:userName', usersController.detail)
router.put ('/edit/:userName', usersController.edit)
// router.get ('/search', usersController.search);
router.get ('/login', usersController.login);
router.get ('/register', usersController.register);
router.post ('/register', usersController.create);
// router.get ('/edit/:userName', usersController.edit);

module.exports = router;