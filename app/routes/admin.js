const { Router } = require('express');
const controller = require('../controllers/admin_controller');
const router = Router();

router.get('/dashboard', controller.dashboard);
router.get('/manage-blogs', controller.manage_blogs);
router.get('/manage-blogs/show-blogs', controller.manage_blogs);
router.get('/manage-blogs/add-blog', controller.add_blog);
// router.get('/blogs/:slug?', controller.blogs);
// router.get('/contact', controller.contact);
// router.get('/feedback', controller.feedback);

module.exports = router;