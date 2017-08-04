const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const dbUri = process.env.MONGODB_URI;

// connect to the database
mongoose.connect(dbUri);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log(`Connected to the database`);
});
