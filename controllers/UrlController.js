const express = require('express');
const router = express.Router();
const Url = require('../model/Url');
const helper = require('../common/helper');
const AppConstant = require('../common/Appconstant')
const UrlService = require('../services/UrlService')


// Short URL Generator
router.post('/api/short', async (req, res) => {
    console.log(req.body)
    const { origUrl } = req.body;

    if (helper.validateUrl(origUrl)) {
        try {
            let url = await UrlService.saveURLDetails(origUrl);
            if (url) {
                res.status(200).json(url);
            } else {
                res.status(400).json('Server Error');
            }

        } catch (err) {
            console.log(err);
            res.status(500).json('Server Error');
        }
    } else {
        res.status(400).json('Invalid Original Url');
    }
});

router.get('/:urlId', async (req, res) => {
    try {
        const url = await Url.findOne({ urlId: req.params.urlId });
        if (url) {
            url.clicks++;
            url.save();
            return res.redirect(url.origUrl);
        } else res.status(404).json('Not found');
    } catch (err) {
        console.log(err);
        res.status(500).json('Server Error');
    }
});

router.get('/api/list', async (req, res) => {
    try {
        let list = await Url.find();
        return res.status(200).send(list);
    } catch (err) {
        console.log(err);
        res.status(500).json('Server Error');
    }
});


module.exports = router;