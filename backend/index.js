const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

require('./Models/db');

const PORT = process.env.PORT || 8080;

const allowedOrigins = [
  "http://localhost:3000",
  "https://task-flow-nine-tau.vercel.app"
];

// ✅ CORS (IMPORTANT)
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ IMPORTANT: handle preflight requests
app.options("*", cors());

// Middleware
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.get('/ping', (req, res) => {
  res.send('Hello, World!');
});

const AuthRouter = require('./Routes/AuthRouter');
app.use('/auth', AuthRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});