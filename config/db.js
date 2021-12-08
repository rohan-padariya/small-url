const mongoose = require('mongoose');
const AppConstant = require('../common/Appconstant')
const connectDB = async () => {
    try {
        await mongoose.connect(AppConstant.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database Connected');
    } catch (err) {
        console.error(err.message,);
        process.exit(1);
    }
};

module.exports = connectDB;