// db.js
const mongoose = require('mongoose');
const MongoURI=process.env.MongoURI
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/mydb');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
