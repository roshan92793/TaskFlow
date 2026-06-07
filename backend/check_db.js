const mongoose = require('mongoose');
const UserModel = require('./Models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGO_CONN)
  .then(async () => {
    console.log('Connected to DB:', process.env.MONGO_CONN);
    const users = await UserModel.find({});
    console.log('Users in DB:', users);
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
