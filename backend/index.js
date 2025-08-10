require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(morgan('tiny'));

app.use(
  cors({
    credentials: true,
    origin: [process.env.DOMAIN],
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
