const router = require('express').Router();
const postValidator = require('../validator/dashboard/post/postValidator');
const { isAuthenticated } = require('../middleware/authMiddleware');
const {
  createBlogPost_GetController,
  createBlogPost_PostController
} = require('../controllers/postController');
const upload = require('../middleware/uploadMiddleware');

router.get('/create', isAuthenticated, createBlogPost_GetController);
router.post('/create', isAuthenticated, upload.single('post-thumbnail'), postValidator, createBlogPost_PostController);

module.exports = router;


// 20.2 Create Post Template -- handle all routes for post feature in here & work for route controller from controllers --> postController.js.
// 20.5 Post Validation -- ekhane postValidator rakha hoyeche & error handle kora hoyeche postController theke.