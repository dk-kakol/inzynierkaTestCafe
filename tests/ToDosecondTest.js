import { AngularSelector, waitForAngular } from 'testcafe-angular-selectors';

import fixture from '../src/fixtures/firstAppFixture';

let config = fixture()

test('Login', async t => {
  //const loginForm = AngularSelector('bc-login-form');
  await t.typeText(AngularSelector('input').withAttribute('id', 'email'), process.env.ACCOUNT_EMAIL, { replace: true });
  await t.typeText(AngularSelector('input').withAttribute('id', 'password'), process.env.ACCOUNT_PASSWORD, { replace: true });
  await t.click(AngularSelector('button').withAttribute('type', 'submit'));
  await t.setFilesToUpload(AngularSelector('input').withAttribute('type', 'file'), '../data/inzynierka-dane.csv').click(AngularSelector('button').withText('Importuj'));
    // .typeText(loginForm.find('#md-input-1'), 'test')
    // .typeText(loginForm.find('#md-input-3'), 'test')
    // .click(loginForm.find('.mat-button'));
  await t.debug();
});