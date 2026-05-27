const User = require('../models/User');
const Settings = require('../models/Settings');

const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      await User.create({
        name: 'Admin',
        email: process.env.ADMIN_EMAIL || 'admin@coaching.com',
        password: process.env.ADMIN_PASSWORD || 'Admin@123',
        role: 'admin',
      });
      console.log('Admin user created');
    }

    const settingsExist = await Settings.findOne();
    if (!settingsExist) {
      await Settings.create({});
      console.log('Default settings created');
    }
  } catch (err) {
    console.error('Seed error:', err.message);
  }
};

module.exports = seedAdmin;
