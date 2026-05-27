const express = require('express');
const router = express.Router();
const Video = require('../models/Video');
const { protect, adminOnly } = require('../middleware/auth');

const extractYoutubeId = (url) => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

// GET all videos (public)
router.get('/', async (req, res) => {
  try {
    const { subject, isLive, featured } = req.query;
    const filter = {};
    if (subject) filter.subject = subject;
    if (isLive !== undefined) filter.isLive = isLive === 'true';
    if (featured) filter.featured = featured === 'true';
    const videos = await Video.find(filter).sort({ createdAt: -1 });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST add video (admin)
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const { youtubeUrl } = req.body;
    const youtubeId = extractYoutubeId(youtubeUrl);
    if (!youtubeId) return res.status(400).json({ message: 'Invalid YouTube URL' });
    const thumbnail = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
    const video = await Video.create({ ...req.body, youtubeId, thumbnail });
    res.status(201).json(video);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update video (admin)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.youtubeUrl) {
      data.youtubeId = extractYoutubeId(data.youtubeUrl);
      data.thumbnail = `https://img.youtube.com/vi/${data.youtubeId}/hqdefault.jpg`;
    }
    const video = await Video.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(video);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE video (admin)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
