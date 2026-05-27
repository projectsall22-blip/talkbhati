const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');
const { protect, adminOnly } = require('../middleware/auth');
const { uploadImage } = require('../config/cloudinary');

router.get('/', async (req, res) => {
  try {
    const settings = await Settings.findOne();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/', protect, adminOnly, uploadImage.fields([
  { name: 'founderPhoto', maxCount: 1 },
  { name: 'heroImage', maxCount: 1 },
]), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.files?.founderPhoto) data.founderPhoto = req.files.founderPhoto[0].path;
    if (req.files?.heroImage) data.heroImage = req.files.heroImage[0].path;
    const settings = await Settings.findOneAndUpdate({}, data, { new: true, upsert: true });
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
