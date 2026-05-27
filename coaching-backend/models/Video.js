const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  youtubeUrl: { type: String, required: true },
  youtubeId: { type: String, required: true },
  subject: { type: String, required: true },
  className: { type: String },
  isLive: { type: Boolean, default: false },
  thumbnail: { type: String },
  views: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Video', videoSchema);
