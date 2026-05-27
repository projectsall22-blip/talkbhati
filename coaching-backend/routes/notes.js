const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { protect, adminOnly } = require('../middleware/auth');
const { uploadDoc } = require('../config/cloudinary');

// GET all notes (public)
router.get('/', async (req, res) => {
  try {
    const { subject, className, search } = req.query;
    const filter = {};
    if (subject) filter.subject = subject;
    if (className) filter.className = className;
    if (search) filter.title = { $regex: search, $options: 'i' };
    const notes = await Note.find(filter).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST upload note (admin)
router.post('/', protect, adminOnly, uploadDoc.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'File required' });
    const note = await Note.create({
      ...req.body,
      fileUrl: req.file.path,
      uploadedBy: req.user._id,
    });
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH increment downloads
router.patch('/:id/download', async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { $inc: { downloads: 1 } },
      { new: true }
    );
    res.json({ fileUrl: note.fileUrl });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE note (admin)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
