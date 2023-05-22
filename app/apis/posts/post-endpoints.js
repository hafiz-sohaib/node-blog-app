const { Router } = require('express');
const multer = require('multer');
const controller = require('./post-controller');
const router = Router();
// const { isAuth, isAdmin } = require('../../middlewares/auth-middleware');

const storage = multer.diskStorage({
    destination: "storage/posts/",
    filename: (request, file, callback) => callback(null, file.originalname)
});

const upload = multer({ storage }).fields([
    { name: "file" }
]);


router.post('/posts', upload, controller.addPost);
router.get('/posts', controller.getPosts);
router.delete('/posts', controller.deletePost);

module.exports = router;