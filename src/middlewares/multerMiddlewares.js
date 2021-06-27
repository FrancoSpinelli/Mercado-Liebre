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


module.exports = fileUpload;