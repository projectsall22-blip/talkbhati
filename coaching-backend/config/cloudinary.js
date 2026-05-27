const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Image storage
const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'coaching/images',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1200, crop: 'limit' }],
  },
});

// PDF/Document storage
const docStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'coaching/documents',
    allowed_formats: ['pdf', 'doc', 'docx', 'ppt', 'pptx'],
    resource_type: 'raw',
  },
});

const uploadImage = multer({ storage: imageStorage });
const uploadDoc = multer({ storage: docStorage });

module.exports = { cloudinary, uploadImage, uploadDoc };
