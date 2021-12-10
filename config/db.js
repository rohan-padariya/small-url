const mongoose = require('mongoose');
const AppConstant = require('../common/Appconstant')
const connectDB = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            await mongoose.connect(AppConstant.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            resolve(true)
            console.log('Database Connected');
        } catch (err) {
            console.error(err.message,);
            reject(false)
            process.exit(1);
        }

    })
};

module.exports = connectDB;