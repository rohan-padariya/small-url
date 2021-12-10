const crypto = require('crypto');
const Appconstant = require('./Appconstant');

const uuid = () => {
    // http://www.ietf.org/rfc/rfc4122.txt
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

const getUniqueId = (counter) => {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const secret = counter ? counter.toString() : Appconstant.SECRET;

    const crypto = require("crypto");
    const md5Hasher = crypto.createHmac("md5", secret);
    const hash = md5Hasher.update(characters).digest("hex");
    // console.log(hash.substring(0,7));

    return hash.substring(0, 7);
}

const validateUrl = (value) => {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
        value
    );
    // return true;
}

const responseStatus = {
    success: (res, data, message) => {
        let json = {
            success: true,
            data: data,
            message: message
        }
        return res.status(200).send(json);
    },
    error: (res, data, message) => {
        let json = {
            success: false,
            data: data,
            message: message
        }
        return res.status(200).send(json);
    },
}

module.exports = {
    uuid,
    validateUrl,
    getUniqueId,
    responseStatus
}