const router = require('express').Router();

const {isAuthenticated} = require('../../middleware/authMiddleware');
const {
  createCommentPostController,
  replyCommentPostController
} = require('../controllers/commentController');

const {
  blogPostLikesGetController,
  blogPostDisLikesGetController
} = require('../controllers/likeDislikeController');

router.post('/comments/:postId', isAuthenticated, createCommentPostController);
router.post('/comments/replies/:commentId', isAuthenticated, replyCommentPostController);

router.get('likes/:postId', isAuthenticated, blogPostLikesGetController);
router.get('dislikes/:postId', isAuthenticated, blogPostDisLikesGetController);

module.exports = router;

// 21.1 Intro(rest api) -- api'r route er kaj kora hobe ekhane & controller folder e service onujayi file hobe. ei route ke amra project er je general route ache sekhane require kore define korbo er phole api'r testing ta hoye jabe.
//21.2 Create Comment API -- ekahne comment api'r controller route niye kaj kora hoyeche.
// 21.3 Create Reply Controller API -- replyCommentPostController er route er kaj kora hoyeche apiRoutes.js e.
// 21.4 Create Like API -- ekhane blogPostLikesGetController route handle kora hoyeche.
// 21.5 Create Dislike Controller API -- ekhane blogPostDisLikesGetController route handle kora hoyeche.