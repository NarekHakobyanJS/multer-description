var express = require('express');
var router = express.Router();
const UsersControllers = require('../controllers/User')
const multer = require('multer')
const path = require('path')
const controller = new UsersControllers()


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(file);
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

/* GET home page. */
router.get('/', controller.getUsers);
router.get('/:id', controller.getUser);
router.post('/users', upload.single('avatar'), controller.createUser);
router.delete('/users/:id', controller.removeUser);
router.patch('/users/change/:id', controller.changeUser);
module.exports = router;
