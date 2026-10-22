const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Methyl Orange API is running 🚀' });
});

// Connect to MongoDB & start server
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/methylorange';

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 3000 });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.warn('⚠️ MongoDB connection error:', err.message);
    console.warn('ℹ️ Running server without active database connection.');
  }

  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
};

startServer();

module.exports = app;
