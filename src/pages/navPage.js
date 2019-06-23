import { t } from 'testcafe';
import { AngularSelector } from 'testcafe-angular-selectors';

export default class navPage {
    constructor() {
        this.logout = AngularSelector('a').withAttribute('href', '/logout');
    }

    async clickLogout() {
        await t.click(this.logout);
    }
}