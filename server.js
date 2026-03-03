require('dotenv').config();
const cors = require('cors');
const express = require('express');
const shortid = require('shortid');

const app = express();
let port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get('/shorten', (req, res) => {
    try {
        const { longURL } = req.body;

        if (!longURL) {
            return res.status(400).json({ message: "LongURL is Required." })
        }

        let shortURL = `http://localhost:5000/${shortid.generate()}`;
        return res.status(200).json(shortURL);
    } catch (error) {
        res.status(500).json({ message: "Some error occured.", error })
    }
});

app.listen(port, () => {
    console.log(`Server running on Port ${port}`);
});