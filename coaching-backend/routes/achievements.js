const express = require('express');
const router = express.Router();
const Achievement = require('../models/Achievement');
const { protect, adminOnly } = require('../middleware/auth');
const { uploadImage } = require('../config/cloudinary');

// GET all achievements (public)
router.get('/', async (req, res) => {
  try {
    const { category, year, featured } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (year) filter.year = year;
    if (featured) filter.featured = featured === 'true';
    const achievements = await Achievement.find(filter).sort({ createdAt: -1 });
    res.json(achievements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create achievement (admin)
router.post('/', protect, adminOnly, uploadImage.single('photo'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.photo = req.file.path;
    const achievement = await Achievement.create(data);
    res.status(201).json(achievement);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update achievement (admin)
router.put('/:id', protect, adminOnly, uploadImage.single('photo'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.photo = req.file.path;
    const achievement = await Achievement.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!achievement) return res.status(404).json({ message: 'Not found' });
    res.json(achievement);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE achievement (admin)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await Achievement.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
