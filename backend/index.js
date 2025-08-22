const express = require('express');
const connectToDb = require('./db/db');
const dotenv = require('dotenv');
const app = express();
const cookieParser = require('cookie-parser');

dotenv.config();

const port = process.env.PORT;
connectToDb();

app.use(cookieParser());
app.use(express.json());

const authRoutes = require('./routes/auth.routes');

app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: http://localhost:${port}`);
});