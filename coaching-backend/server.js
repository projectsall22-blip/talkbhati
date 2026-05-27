const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/achievements', require('./routes/achievements'));
app.use('/api/notes', require('./routes/notes'));
app.use('/api/videos', require('./routes/videos'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/settings', require('./routes/settings'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'OK', message: 'Server running' }));

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected');
    // Seed admin user
    await require('./utils/seedAdmin')();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
