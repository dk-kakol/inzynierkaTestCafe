const imaps = require('imap-simple')
const _ = require('lodash')

const getConnection = () => {
    return imaps.connect({
        imap: {
            user: process.env.IMAP_USER,
            password: process.env.IMAP_PASS,
            host: process.env.IMAP_HOST,
            port: process.env.IMAP_PORT,
            tls: process.env.IMAP_TLS,
            authTimeout: process.env.IMAP_AUTHTIME
        }
    }).then(c => { return c } )
}

/**
 *
 * @param {Array} searchCriteria Array containing searching criteria.
 * @returns {Promise.<Array>} Array with matched email contents when fulfilled.
 */
exports.fetch = (searchCriteria) => {
    return getConnection().then(connection => {
        return connection.openBox('INBOX').then(() => {
            return connection.search(searchCriteria, { bodies: ['HEADER', 'TEXT'] }).then((messages) => {
                let matchingContents = []
                messages.forEach(function (item) {
                    let header = _.find(item.parts, { "which": 'HEADER' })
                    let headerDate = (Buffer.from(header.body.date[0]).toString('ascii'))
                    let headerContentType = (Buffer.from(header.body['content-type'][0].toString('ascii')))
                    let headerSubject = (Buffer.from(header.body.subject[0]).toString('ascii'))
                    let all = _.find(item.parts, { "which": 'TEXT' })
                    let html = (Buffer.from(all.body).toString('ascii'))
                    let result ='Coding: ' + headerContentType + '\n'
                                + 'Date: ' + headerDate + '\n' 
                                + 'Subject: ' + headerSubject + '\n'  
                                + 'Text: ' + html
                    matchingContents.push(result)
                })

                return matchingContents
            })
        })
    })
}