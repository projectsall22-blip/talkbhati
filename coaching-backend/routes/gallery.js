const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');
const { protect, adminOnly } = require('../middleware/auth');
const { uploadImage } = require('../config/cloudinary');

router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const items = await Gallery.find(filter).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', protect, adminOnly, uploadImage.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Image required' });
    const item = await Gallery.create({ ...req.body, imageUrl: req.file.path });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
