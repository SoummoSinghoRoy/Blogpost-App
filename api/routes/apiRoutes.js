const router = require('express').Router();

router.post('/comments/:postId', (req, res, next) => {

});
router.post('/comments/replies/:commentId', (req, res, next) => {

});

module.exports = router;

// 21.1 Intro(rest api) -- api'r route er kaj kora hobe ekhane & controller folder e service onujayi file hobe. ei route ke amra project er je general route ache sekhane require kore define korbo er phole api'r testing ta hoye jabe.
//21.2 Create Comment API -- ekahne comment api'r controller route niye kaj kora hoyeche.