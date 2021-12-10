const express = require('express');
const router = express.Router();
const Url = require('../model/Url');
const helper = require('../common/helper');
const AppConstant = require('../common/Appconstant')
const UrlService = require('../services/UrlService')


// Short URL Generator
router.post('/api/short', async (req, res) => {
    console.log(req.body)
    const { originalURL } = req.body;

    if (helper.validateUrl(originalURL)) {
        try {
            let data = await UrlService.saveURLDetails(originalURL);
            if (data) {
                // res.status(200).json(url);
                helper.responseStatus.success(res, data, 'Short url created successfully');
            } else {
                // res.status(200).json('Server Error');
                helper.responseStatus.error(res, originalURL, 'Unexpected error occured. Please try again.');
            }

        } catch (err) {
            console.log(err);
            // res.status(500).json('Server Error');
            helper.responseStatus.error(res, originalURL, 'Unexpected error occured. Please try again.');
        }
    } else {
        helper.responseStatus.error(res, originalURL, 'Entered URL is either Invalid or URL domain banned by admin. Please try again.');
    }
});

router.get('/:urlID', async (req, res) => {
    try {
        const url = await Url.findOne({ urlID: req.params.urlID });
        if (url) {
            url.clicks++;
            url.save();
            return res.redirect(url.originalURL);
        } else res.status(404).json('Not found');
    } catch (err) {
        console.log(err);
        res.status(500).json('Server Error');
    }
});

router.get('/api/list', async (req, res) => {
    try {
        let list = await Url.find().sort({ "date": -1 });;
        return helper.responseStatus.success(res, list, 'Url list fetched successfully');;
    } catch (err) {
        console.log(err);
        res.status(500).json('Server Error');
    }
});


module.exports = router;