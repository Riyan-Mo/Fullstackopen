const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs');
const logger = require('./utils/logger');
const config = require('./utils/config');

mongoose.set('strictQuery', false);

logger.info('connecting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogsRouter);

module.exports = app;