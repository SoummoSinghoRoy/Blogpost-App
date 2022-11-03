const router = require('express').Router()
const { searchResultGetController } = require('../controllers/searchController');

router.get('/', searchResultGetController);

module.exports = router

// 22.11 Create Search Backend -- router er controller er kaj kora hoyeche controllers --> searchController.js e.