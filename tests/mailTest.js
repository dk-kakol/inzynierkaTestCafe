import fixture from '../src/fixtures/firstAppFixture';
import HandlingEmails from '../src/utilities/handlingEmails';

const mail = require('../src/utilities/mail');
const mailDate = require('../src/utilities/timestamp');

let config = fixture();

test('Send and receive email test', async t => {
    // Sending part
    let sendingMailTime = mailDate.mailFormatTimeStamp;
    mail.mail('testSuiteName', 'reportUrl', 'test.wiosny1@gmail.com'); //podmienić maila

    // Receiving part
    let query = [ 'ALL', 
        ['TEXT', 'Error on test testSuiteName'], 
        ['HEADER', 'TO', 'test.wiosny1@gmail.com'],  //podmienić maila
    ];
    let wait = 1;
    let regex = /reportUrl/g;
    let result = await HandlingEmails(query, regex, wait, sendingMailTime);
    console.log('Find matching mails:' + result.numMails);
    console.log('Find matching text: ' + result.text);
    await t.expect(result.numMails).eql(1, result.text);
});