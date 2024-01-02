const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');

// Login Page
router.get('/login', (req, res) => res.render('login'));

// Register Page
router.get('/register', (req, res) => res.render('register'));

// Register
router.post('/register', (req, res) => {
  const { firstName, email, password, password2 } = req.body;

  User.findOne({ email: email }).then((user) => {
    if (user) {
      console.log('User already exists');
    } else {
      const newUser = new User({
        firstName,
        email,
        password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              res.redirect('/users/login');
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/users/login');
});

//for files
const {
  uploadProfileImage,
  uploadAudioFile,
} = require('../middleware/image.middleware');
const {
  postProfileImage,
  postAudioFile,
} = require('../controller/auth.controllers');

// router.get('/media-pages', getMediaPage)
router.post(
  '/upload/single_image',
  uploadProfileImage.single('image'),
  postProfileImage
);

router.delete('/delete/single_image', async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (user && user.profile_image) {
      // Delete the image file (you might need to adjust the path)
      const imagePath = './uploads/' + user.profile_image;
      // Add your logic to delete the file using fs.unlinkSync or any other method

      // Clear the profile_image field in the user document
      user.profile_image = null;
      await user.save();

      res.json({ message: 'Profile image deleted successfully' });
    } else {
      res.status(400).json({ message: 'No profile image to delete' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

router.post('/upload/audio', uploadAudioFile.single('audio'), postAudioFile);

module.exports = router;
