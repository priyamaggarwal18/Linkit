const express = require('express');
const authenticateToken = require('../middlewares/authMiddleware');
const User = require('../models/User');
const Links = require('../models/Links');

const router = express.Router();

// ** Routes **

// 1. Save Profile Image Link
router.post('/profile-image', authenticateToken, async (req, res) => {
  try {
    const { profileImage } = req.body;

    if (!profileImage) {
      return res.status(400).json({ error: 'Profile image link is required' });
    }

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { profileImage },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      message: 'Profile image link saved successfully',
      profileImage: user.profileImage,
    });
  } catch (err) {
    console.error('Error saving profile image link:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 2. Get User Details for Dashboard
router.get('/user', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({
      username: user.username,
      email: user.email,
      profileImage: user.profileImage,
      profileClicks: user.profileClicks,
    });
  } catch (err) {
    console.error('Error fetching user data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 3. Get Public Profile by Username
router.get('/profile/:username', async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { username: req.params.username },
      { $inc: { profileClicks: 1 } },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });

    const links = await Links.find({ userId: user._id });

    res.status(200).json({
      username: user.username,
      profileImage: user.profileImage,
      profileClicks: user.profileClicks,
      links,
    });
  } catch (err) {
    console.error('Error fetching public profile:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
