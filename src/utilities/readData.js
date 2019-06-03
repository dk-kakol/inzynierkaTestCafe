const fs = require('fs');

exports.data = function(dataFile){
    const rawdata = fs.readFileSync(dataFile);
    const testCases = JSON.parse(rawdata);
    return testCases;
}