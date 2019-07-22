import AplicationEmail from './aplicationsEmail';
import { Selector, t } from 'testcafe';
const moment = require('moment-timezone');


function narrowResult(messages, since) {
    let sinceYear = since.format('YYYY');
    let dateRegex = 'Date:.*' + sinceYear + ' \\d*:\\d*:\\d*.*';
    let indexToRemove = []
    messages.forEach((item, index) => {
        let cutMailDate = item.match(new RegExp(dateRegex));
        cutMailDate = cutMailDate[0].slice(5);
        cutMailDate = moment(cutMailDate);
        if (cutMailDate.isBefore(since)){
            indexToRemove.push(index)
        }
    });

    indexToRemove.reverse();
    indexToRemove.forEach((item) => {
        messages.splice(item, 1)
    });
    return messages
}

export default async (query, regex, wait, since) => {
    query.push(['SINCE', since.format('MMM DD, YYYY')]);
    let messages, messagesDecoded, searchText;
    let numMessages = 0;
    let time = 0;
    let waitForEmail = true;
    while (waitForEmail) {
        messages = await AplicationEmail
            .fetch(query)
        numMessages = await messages.length;
        console.log('Number of messages before filter: ' + numMessages)
        messages = narrowResult(messages, since);
        numMessages = await messages.length;
        console.log('Number of messages after filter: ' + numMessages)
        if ( time >= (wait*6) || numMessages >= 1 ) waitForEmail = false;
        await t.wait(10000);
        await time++;
        console.log('Time :' + time);
    }
    numMessages = messages.length;
    if (numMessages !== 1) {
        searchText = 'Not found or found too many mails';
    } else {
        searchText = messages[0].match(regex)[0];
    }

    let result = {
        numMails: numMessages,
        text: searchText
    }
    return result; 
}
