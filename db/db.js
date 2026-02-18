// db.js
require('dotenv').config()
const mongoose = require('mongoose');
const Mongo_URI=process.env.Mongo_URI

const connectDB = async () => {
  try {
    console.log('Connecting to:', Mongo_URI); // Debug
    await mongoose.connect(Mongo_URI); // No options needed
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
