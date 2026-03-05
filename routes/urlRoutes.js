const express = require('express');
const { shortenUrl, getUrlById } = require('../controllers/urlController');

const router = express.Router();

router.post('/shorten', shortenUrl);

router.get('/:id', getUrlById);

module.exports = router;