const moment = require('moment-timezone');

exports.timestamp = moment().tz("Europe/Warsaw").format('YYYY_MM_DD_HH_mm_ss');
exports.mailFormatTimeStamp = moment().tz("Europe/Warsaw");