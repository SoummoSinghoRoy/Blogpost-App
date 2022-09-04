// 15.11 Create Dashboard Page -- route er controller er kaj korechi dashboardController.js e ar page/template er kaj korechi dashboard.ejs e.

const router = require('express').Router()
const  {dashboardGetController}  = require('../controllers/dashboardController');
const { isAuthenticated } = require('../middleware/authMiddleware');

router.get('/', isAuthenticated, dashboardGetController);

module.exports = router;