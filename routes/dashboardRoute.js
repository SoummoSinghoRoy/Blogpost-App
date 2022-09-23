// 15.11 Create Dashboard Page -- route er controller er kaj korechi dashboardController.js e ar page/template er kaj korechi dashboard.ejs e.

const router = require('express').Router()
const  { 
  dashboardGetController,
  createProfileGetController,
  createProfilePostController,
  editProfileGetController,
  editProfilePostController
 }  = require('../controllers/dashboardController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const profileValidator = require('../validator/dashboard/profileValidator');
const upload = require('../middleware/uploadMiddleware');

router.get('/', isAuthenticated, dashboardGetController);

router.get('/create-profile', isAuthenticated, createProfileGetController);
router.post('/create-profile', 
            isAuthenticated,
            profileValidator,
            upload.single('profilePicsFile'),  
            createProfilePostController);

router.get('/edit-profile', isAuthenticated, editProfileGetController);
router.post('/edit-profile', isAuthenticated, editProfilePostController);

module.exports = router;