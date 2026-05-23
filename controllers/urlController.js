const shortid = require('shortid');
const redis = require('../config/redis');
const Url = require('../models/urlModel');

exports.shortenUrl = async (req, res) => {
    try {
        const { originalUrl } = req.body;

        if (!originalUrl) {
            return res.status(400).json({ message: "OriginalUrl is Required." })
        }

        const baseUrl = req.protocol + '://' + req.get('host');
        const shortId = shortid.generate();

        const shortUrl = `${baseUrl}/${shortId}`;

        await Url.create({
            shortId,
            originalUrl
        });

        return res.status(200).json(shortUrl);
    } catch (error) {
        res.status(500).json({ message: "Some error occured.", error });
    }
};

exports.getUrlById = async (req, res) => {
    try {
        const id = req.params.id;
        const cacheUrl = await redis.get(id);

        if (cacheUrl) {
            const parsedUrl = JSON.parse(cacheUrl);
            return res.redirect(parsedUrl.originalUrl);
        }

        const url = await Url.findOne({ shortId: id });

        if (url) {
            await redis.set(id, JSON.stringify(url), "EX", 60);
            res.redirect(url.originalUrl);
        } else {
            res.status(404).json({ message: "No url found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Some error occured.", error });
    }
};