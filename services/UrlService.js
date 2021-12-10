const AppConstant = require("../common/Appconstant");
const Url = require('../model/Url');
const Config = require('../model/Config');
const helper = require('../common/helper');

module.exports = {
    saveURLDetails: saveURLDetails,
}


function saveURLDetails(originalURL) {
    return new Promise(async (resolve, reject) => {
        const base = AppConstant.BASE;
        try {
            let url = await Url.findOne({ originalURL });
            if (url) {
                resolve(url)
            } else {
                // let counter = await getCounter();

                const urlID = helper.getUniqueId();

                // let isHashExists = await Url.findOne({ urlID });
                // console.log('hash --', isHashExists);

                const shortUrl = `${base}/${urlID}`;
                url = new Url({
                    originalURL,
                    shortUrl,
                    urlID,
                    date: new Date(),
                });

                let data = await url.save();
                // await updateCounter(++counter);
                resolve(data)
            }
        } catch (error) {
            console.log("ERROR ::", error)
            reject(null)
        }
    })
}

function getCounter() {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await Config.findOne({})
            let count = 1
            console.log(data)
            if (!data) {
                let updateData = await Config.updateOne({}, [
                    { $set: { status: "Read", counter: 1, lastRead: "$$NOW" } }
                ], { upsert: true })

                console.log(updateData)
                //     let config = new Config({
                //         counter: 2,
                //         date: new Date(),
                //     });
                //     config.save()
            } else {
                count = data.counter
            }
            resolve(count)
        } catch (error) {
            console.log(error)
            resolve(0)
        }
    })
}

function updateCounter(val) {
    return new Promise(async (resolve, reject) => {
        console.log(val)
        try {
            let data = await Config.updateMany({}, [
                { $set: { status: "Modified", counter: val, lastUpdate: "$$NOW" } }
            ])
            resolve(data)
        } catch (error) {
            resolve(0)
        }
    })
}
