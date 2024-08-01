const multer = require('multer');
const path = require('path');


const storageConfiguration = multer.diskStorage({
    destination: (req, file, next) => {
        next(null, 'uploads/');
    },
    filename: (req, file, next) => {
        // next(null, Date.now() + file.originalname);
        const extension = path.extname(file.originalname); // Get the file extension
        const baseName = path.basename(file.originalname, extension); // Get the base name without extension
        next(null, `${Date.now()}(${baseName})${extension}`); 
        console.log(file)
        // console.log(file.originalname)
    }

});

const uploader = multer({
    storage: storageConfiguration
});


module.exports = uploader;