const router = require('express').Router();

const {
  createBlogPost_GetController,
  createBlogPost_PostController
} = require('../controllers/postController');

router.get('/create', createBlogPost_GetController);
router.post('/create', createBlogPost_PostController);

module.exports = router;


// 20.2 Create Post Template -- handle all routes for post feature in here & work for route controller from controllers --> postController.js.