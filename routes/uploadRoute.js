const router = require('express').Router();

const upload = require('../middleware/uploadMiddleware');
const { 
  uploadProfilePicGetController, 
  uploadProfilePicPostController 
} = require('../controllers/uploadController');

router.get('/profile-pics', uploadProfilePicGetController)
router.post( '/profile-pics', 
            upload.single('profilePicsFile'), 
            uploadProfilePicPostController 
          )

module.exports = router;

// 19.3 Upload Controller and Routes -- etar route handle korechi & routes.js export kore require korechi.
// 19.4 Setup Croppie JS -- etar kaj korechi create-profile.ejs & public -> script -> profilePicsUpload.js file e.