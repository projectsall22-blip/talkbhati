const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  fileUrl: { type: String, required: true },
  fileType: { type: String, default: 'pdf' },
  subject: { type: String, required: true },
  className: { type: String, required: true },
  tags: [String],
  downloads: { type: Number, default: 0 },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);
