require('dotenv').config();
const cors = require('cors');
const express = require('express');
const { connectDB } = require('./config/db');
const urlRoutes = require('./routes/urlRoutes');

const app = express();

connectDB();
let port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/api/url', urlRoutes);

app.listen(port, () => {
    console.log(`Server running on Port ${port}`);
});