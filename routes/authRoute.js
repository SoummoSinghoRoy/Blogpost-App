const router = require('express').Router();
const signupValidator = require('../validator/auth/signupValidator');
const loginValidator = require('../validator/auth/loginValidator');

const {
  signupGetController,
  signupPostController,
  loginGetController,
  loginPostController,
  logoutController
} = require('../controllers/authController');

const { isUnAuthenticated } = require('../middleware/authMiddleware');

router.get('/signup', isUnAuthenticated, signupGetController);
router.post('/signup', isUnAuthenticated, signupValidator, signupPostController);

router.get('/login', isUnAuthenticated, loginGetController);
router.post('/login', isUnAuthenticated, loginValidator, loginPostController);

router.get('/logout', logoutController);

module.exports = router;

// router er controller ache authController e.

// 14.10 Get Error Message From Signup Form -- etar kaj kora hoyeche authController.js e.