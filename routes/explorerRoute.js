const router = require('express').Router();

const { explorerGetController } = require('../controllers/explorerController');

router.get('/', explorerGetController);

module.exports = router;

// 22.1 Setup explorer files -- explorerGetController  er route handle kora hoyeche & main route a require kora hoyeche.