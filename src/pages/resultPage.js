import { t } from 'testcafe';
import { AngularSelector } from 'testcafe-angular-selectors';

import constants from '../../constants/appLang';

export default class calculatePage {
    constructor() {
        this.results = AngularSelector('app-result-item');
        this.acceptResultButton = AngularSelector('button').withText(constants.ACCEPT_TEXT)
    }

    async verifyNumResults(recordsNumber) {
        await t.expect(this.results.count).eql(recordsNumber);
    };

    async acceptResult(acceptResult){
        await t.click(this.acceptResultButton.nth(acceptResult));
    };

}