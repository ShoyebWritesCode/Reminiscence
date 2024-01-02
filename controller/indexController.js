// controllers/diaryController.js
const Diary = require('../models/Diary');

module.exports = {
  getLoginPage: (req, res) => {
    res.render('login');
  },

  getDashboard: async (req, res) => {
    try {
      const diaries = await Diary.find({ user: req.user.id }).lean();
      res.render('dashboard', { user: req.user, diaries });
    } catch (err) {
      console.error(err);
      res.render('error');
    }
  },
};
