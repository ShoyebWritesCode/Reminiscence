// routes/index.js
const express = require('express');
const router = express.Router();
const diaryController = require('../controller/indexController');
const { ensureAuth, ensureGuest } = require('../middleware/auth.middleware');

router.get('/', ensureGuest, diaryController.getLoginPage);

router.get('/dashboard', ensureAuth, diaryController.getDashboard);

module.exports = router;
