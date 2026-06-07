const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

require('./Models/db');

const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: [
      // "http://localhost:3000",
      "task-flow-nine-tau.vercel.app"
    ],
    credentials: true
  })
);

app.use(bodyParser.json());

app.get('/ping', (req, res) => {
  res.send('Hello, World!');
});

const AuthRouter = require('./Routes/AuthRouter');
app.use('/auth', AuthRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});