const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

require('./Models/db');
const PORT = process.env.PORT || 8080;
app.get('/ping', (req, res) => {
  res.send('Hello, World!');
});
app.use(cors());
app.use(bodyParser.json());

const AuthRouter = require('./Routes/AuthRouter');
app.use('/auth', AuthRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});