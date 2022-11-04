const router = require('express').Router()
const { searchResultGetController } = require('../controllers/searchController');

router.get('/', searchResultGetController);

module.exports = router

// 22.11 Create Search Backend -- router er controller er kaj kora hoyeche controllers --> searchController.js e.
// 22.12 Create Search Result Page -- etar kaj kora hoyeche views --> partials --> navigation.ejs, pages --> explorer --> search.ejs e.
// 22.13 Debugg And Conclusion -- ei lecture e muloto singlePostPage.ejs e je script gulo ache sekhane modify kora hoyeche, karon sekhane multiple script add kora hoyeche ja invalid. kintu script sob ek jaigai rakhar por o problem ache.