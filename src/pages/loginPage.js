import { t } from 'testcafe';
import { AngularSelector } from 'testcafe-angular-selectors';
import NavPage from './navPage';

export default class loginPage {
    constructor() {
        this.emailField = AngularSelector('input').withAttribute('id', 'email');
        this.passwordField = AngularSelector('input').withAttribute('id', 'password');
        this.submitButton = AngularSelector('button').withAttribute('type', 'submit');
        this.np = new NavPage();
    }
    async enterEmail(email) {
        await t.typeText(this.emailField, email, { replace: true });
    }

    async enterPassword(password) {
        await t.typeText(this.passwordField, password, { replace: true });
    }

    async clickSubmitButton() {
        await t.click(this.submitButton);
    }

    async login(email, password) {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickSubmitButton();
    }

    async verifyLoginSuccess() {
        await t.expect(this.np.logout.exists).ok();
    }

    async verifyLoginFail() {
        await t.expect(this.submitButton.exists).ok();
    }

}