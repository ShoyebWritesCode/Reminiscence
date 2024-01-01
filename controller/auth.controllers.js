const User = require('../models/User');

const postProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file provided' });
    }
    const photo = req.file.filename;

    const userId = req.user.id;
    const user = await User.findById(userId);
    console.log(user);

    if (photo) {
      user.profile_image = photo;
    }
    await user.save();

    res.json({ message: 'Profile image updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const postAudioFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file provided' });
    }
    const audio = req.file.filename;

    const userId = req.user.id;
    const user = await User.findById(userId);
    console.log(user);

    if (audio) {
      user.audio = audio;
    }
    await user.save();

    res.json({ message: 'Audio updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  postProfileImage,
  postAudioFile,
};
