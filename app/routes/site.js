const { Router } = require('express');
const controller = require('../controllers/site_controller');
const router = Router();

router.get('/', controller.home);
router.get('/about', controller.about);
router.get('/blogs/:slug?', controller.blogs);
router.get('/contact', controller.contact);
router.get('/feedback', controller.feedback);

module.exports = router;