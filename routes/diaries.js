const express = require('express');
const path = require('path');
const router = express.Router();
const Diary = require('../models/Diary');

router.get('/add', (req, res) => {
  res.render('diaries/add');
});

router.post('/', async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Diary.create(req.body);
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
