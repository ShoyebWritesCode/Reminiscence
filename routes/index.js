const express = require('express');
const path = require('path');
const router = express.Router();
const Diary = require('../models/Diary');
const { ensureAuth, ensureGuest } = require('../middleware/auth.middleware');

router.get('/', ensureGuest, (req, res) => {
  res.render('login');
});

router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    const diaries = await Diary.find({ user: req.user.id }).lean();
    res.render('dashboard', { user: req.user, diaries });
  } catch (err) {
    console.error(err);
    res.render('error');
  }
});
module.exports = router;
