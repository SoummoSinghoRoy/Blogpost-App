// 15.11 Create Dashboard Page -- route er controller er kaj korechi dashboardController.js e ar page/template er kaj korechi dashboard.ejs e.

const router = require('express').Router()
const  { 
  
  dashboardGetController,
  createProfileGetController,
  createProfilePostController,
  editProfileGetController,
  editProfilePostController,
  bookmarksPostGetController
 }  = require('../controllers/dashboardController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const profileValidator = require('../validator/dashboard/profileValidator');

router.get('/bookmarks', isAuthenticated, bookmarksPostGetController)

router.get('/create-profile', isAuthenticated, createProfileGetController);
router.post('/create-profile', 
            isAuthenticated,
            profileValidator,
            createProfilePostController);

router.get('/edit-profile', isAuthenticated, editProfileGetController);
router.post('/edit-profile', isAuthenticated, profileValidator, editProfilePostController);

router.get('/', isAuthenticated, dashboardGetController);

module.exports = router;


// 23.2 Bookmarks Dashboard Page -- etar route er kaj kora hoyeche ekhane r controller er kaj kora hoyeche dashBoardController e. 