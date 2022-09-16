const router = require('express').Router();
const { isAuthenticated } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const uploadProfilePicController = require('../controllers/uploadController');

router.post( '/profilePics', 
            isAuthenticated, 
            upload.single('profilePics'), 
            uploadProfilePicController 
          )

module.exports = router;

// 19.3 Upload Controller and Routes -- etar route handle korechi & routes.js export kore require korechi.