/* eslint-disable no-constant-condition */
require('dotenv').config();

const { PORT } = process.env;
const MONGODB_URI = process.env.NODE_ENV === 'development' || 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI;

module.exports = { MONGODB_URI, PORT };
