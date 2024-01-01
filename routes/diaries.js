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

router.get('/', async (req, res) => {
  try {
    const diaries = await Diary.find({ status: 'public' })
      .populate('user')
      .sort({ createdAt: -1 })
      .lean();
    res.render('diaries/index', { diaries });
  } catch (err) {
    console.error(err);
  }
});

router.get('/edit/:id', async (req, res) => {
  try {
    const diary = await Diary.findOne({
      _id: req.params.id,
    }).lean();

    if (!diary) {
      console.log('Diary not found');
    }

    if (diary.user != req.user.id) {
      res.redirect('/diaries');
    } else {
      res.render('diaries/edit', {
        diary,
      });
    }
  } catch (err) {
    console.error(err);
  }
});

router.post('/edit/:id', async (req, res) => {
  const { title, status, body } = req.body;

  try {
    const diary = await Diary.findOne({ _id: req.params.id });
    console.log(diary._id);
    if (!diary) {
      return res.status(404).json({ message: 'Diary not found' });
    }

    if (diary.user != req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Update diary entry
    diary.title = title;
    diary.status = status;
    diary.body = body;

    // Save the updated diary entry
    await diary.save();

    return res
      .status(200)
      .json({ message: 'Diary entry updated successfully', diary });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    let diary = await Diary.findById(req.params.id).populate('user').lean();

    if (!diary) {
      console.log('Story not found');
    }

    if (diary.user._id != req.user.id && diary.status == 'private') {
      console.log('Unauthorized');
    } else {
      res.render('diaries/show', {
        diary,
      });
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
