const cors = require('cors');

module.exports = cors(
  {
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
);
