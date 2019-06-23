var minimist = require('minimist');

const args = minimist(process.argv.slice(2));
const env = args.env;
const mail = args.mail;

exports.env = env;
exports.mail = mail;