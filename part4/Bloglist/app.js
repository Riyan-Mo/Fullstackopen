const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const logger = require('./utils/logger');
const config = require('./utils/config');
const loginRouter = require('./controllers/login');
const { tokenExtractor, userExtractor } = require('./utils/middleware');

mongoose.set('strictQuery', false);

logger.info('connecting to', config.MONGODB_URI);

const connectDB = async () => {
  try {
    mongoose.connect(config.MONGODB_URI);
    logger.info('connected to MongoDB');
  } catch (error) {
    logger.error('error connecting to MongoDB:', error.message);
  }
};
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use(tokenExtractor);

app.use('/api/users', usersRouter);

app.use('/api/login', loginRouter);

app.use('/api/blogs', userExtractor, blogsRouter);

module.exports = app;
