const router = require('express').Router()
const {authorProfileGetController} = require('../controllers/authorController');

router.get('/:userId', authorProfileGetController);

module.exports = router

// 22.14 author page template -- author page er controller er route handle kora hoyeche routes --> ekahne.
// 22.15 Author Controller -- etar kaj kora hoyeche controller --> authorController.js e.