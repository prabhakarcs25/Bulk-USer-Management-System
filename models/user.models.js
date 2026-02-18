// Import Mongoose
const mongoose = require('mongoose');

// Define the schema
const identitySchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    minlength: [3, 'Full name must be at least 3 characters long'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    unique: true,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: true,
  },
}, {
  timestamps: true, // optional: adds createdAt and updatedAt fields
});

// Create model
const Identity = mongoose.model('Identity', identitySchema);

module.exports = Identity;
