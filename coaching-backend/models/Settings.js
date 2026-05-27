const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  instituteName: { type: String, default: 'TalksBhati Pharmacy' },
  tagline: { type: String, default: 'Your Pharmacy Study Notes Organized Yearly and Semester-wise' },
  phone: { type: String, default: '+91 98765 43210' },
  email: { type: String, default: 'info@talksbhatipharmacy.in' },
  address: { type: String, default: 'India (Online Platform)' },
  whatsapp: { type: String, default: '+919876543210' },
  facebook: { type: String, default: '' },
  instagram: { type: String, default: '' },
  youtube: { type: String, default: '' },
  twitter: { type: String, default: '' },
  founderName: { type: String, default: 'Mr. Bhati' },
  founderPhoto: { type: String, default: '' },
  founderBio: { type: String, default: 'Mr. Bhati is a passionate pharmacy educator and the founder of TalksBhati Pharmacy — India\'s trusted online platform for pharmacy study notes.' },
  founderExperience: { type: String, default: '10+ Years' },
  founderVision: { type: String, default: 'To make quality pharmacy education accessible to every student in India, regardless of their background or financial status.' },
  founderMission: { type: String, default: 'Providing structured, easy-to-access pharmacy study notes organized by semester and subject for students across India.' },
  founderMessage: { type: String, default: 'Every pharmacy student deserves access to quality study materials. This platform is my contribution to your success. Study hard, serve society, and make pharmacy proud.' },
  heroImage: { type: String, default: '' },
  totalStudents: { type: Number, default: 10000 },
  totalNotes: { type: Number, default: 500 },
  totalDownloads: { type: Number, default: 50000 },
  programsCovered: { type: Number, default: 4 },
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
