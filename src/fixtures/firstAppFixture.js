import { waitForAngular } from 'testcafe-angular-selectors';
import { ClientFunction } from 'testcafe';
import minimist from 'minimist';

import params from '../utilities/readConsoleParams';
import c from '../../src/utilities/readData';

const environment = params.env === undefined ? 'dev' : params.env;
const configData = c.data('config/firstAppConfig.json');
let config = configData[environment];

export default () => {
    fixture `First App`
        .page `${config.url}`
        .beforeEach( async t => {
            await waitForAngular();   
            //set new cookie
            const setCookie = ClientFunction((config) => {
                config.cookies.forEach((value) => {
                    document.cookie = value;
                })
            });
            //get current cookie
            const getCookie = ClientFunction(() => {
                return document.cookie;
            });
            await setCookie(config);
            console.log(await getCookie());

        });
    return config;
};