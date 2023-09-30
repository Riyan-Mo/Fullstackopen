/* eslint-disable no-empty */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const tokenExtractor = async (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '');
  } else {
    request.token = null;
  }
  next();
};

const userExtractor = async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'Unauthorized' });
    }
    request.user = await User.findById(decodedToken.id);
  } catch (error) {
  }
  next();
};

module.exports = { tokenExtractor, userExtractor };
