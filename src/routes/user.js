const userController = require('../controllers/userController');
const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        // console.log(file);
        callback(null, './src/uploads/file');
    },
    filename: function(req, file, callback) {
        // console.log(file);
        var fileUniqueName = Date.now();
        callback(null,  fileUniqueName + path.extname(file.originalname));
    }
});

var upload = multer({ storage: storage });

exports.getRouter = (app) => {

    // Routes for uploading file
    app.route('/user/uploadFile').post(upload.any(), userController.uploadFile);
    
    return app;
}
