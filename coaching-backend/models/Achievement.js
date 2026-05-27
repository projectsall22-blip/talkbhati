const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  photo: { type: String, default: '' },
  marks: { type: String, required: true },
  percentage: { type: String },
  rank: { type: String },
  exam: { type: String, required: true },
  college: { type: String },
  year: { type: String, required: true },
  category: {
    type: String,
    enum: ['D.Pharma', 'B.Pharma', 'M.Pharma', 'Pharm.D', 'Other'],
    default: 'B.Pharma'
  },
  featured: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Achievement', achievementSchema);
