require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173', 'http://localhost'],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.json({
    message: 'Hello, World!',
  });
});

app.use('/api/v1', require('./routes/v1'));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
