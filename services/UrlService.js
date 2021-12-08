const AppConstant = require("../common/Appconstant");
const Url = require('../model/Url');
const helper = require('../common/helper');

module.exports = {
    saveURLDetails: saveURLDetails,
}


function saveURLDetails(origUrl) {
    return new Promise(async (resolve, reject) => {
        const urlId = helper.getUniqueId(4);
        const base = AppConstant.BASE;
        try {
            let url = await Url.findOne({ origUrl });
            if (url) {
                resolve(url)
            } else {
                const shortUrl = `${base}/${urlId}`;

                url = new Url({
                    origUrl,
                    shortUrl,
                    urlId,
                    date: new Date(),
                });

                let data = await url.save();
                resolve(data)
            }
        } catch (error) {
            console.log("ERROR ::", error)
            reject(null)
        }
    })
}
