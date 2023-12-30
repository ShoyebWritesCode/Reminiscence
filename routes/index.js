const express = require('express');
const path = require('path');
const router = express.Router();
const Diary = require('../models/Diary');

router.get('/', (req, res) => {
  res.render('login');
});

router.get('/dashboard', async (req, res) => {
  try {
    const diaries = await Diary.find({ user: req.user.id }).lean();
    res.render('dashboard', { user: req.user, diaries });
  } catch (err) {
    console.error(err);
    res.render('error');
  }
});
module.exports = router;
