const router = require('express').Router();

const {isAuthenticated} = require('../../middleware/authMiddleware');
const {
  createCommentPostController,
  replyCommentPostController
} = require('../controllers/commentController');

router.post('/comments/:postId', isAuthenticated, createCommentPostController);
router.post('/comments/replies/:commentId', isAuthenticated, replyCommentPostController);

module.exports = router;

// 21.1 Intro(rest api) -- api'r route er kaj kora hobe ekhane & controller folder e service onujayi file hobe. ei route ke amra project er je general route ache sekhane require kore define korbo er phole api'r testing ta hoye jabe.
//21.2 Create Comment API -- ekahne comment api'r controller route niye kaj kora hoyeche.
// 21.3 Create Reply Controller API -- replyCommentPostController er route er kaj kora hoyeche apiRoutes.js e.