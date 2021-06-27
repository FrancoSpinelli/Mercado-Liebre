const path = require ('path');
const multer = require('multer');

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

let filePorductUpload = multer({storage});

module.exports = filePorductUpload;