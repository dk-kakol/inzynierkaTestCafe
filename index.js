import { AngularSelector, waitForAngular } from 'testcafe-angular-selectors';

fixture `Book Collection`
  .page('http://localhost:3000/signin')
  .beforeEach(async t => {
    await waitForAngular();
  });

test('Login', async t => {
  //const loginForm = AngularSelector('bc-login-form');

  await t
    // .typeText(loginForm.find('#md-input-1'), 'test')
    // .typeText(loginForm.find('#md-input-3'), 'test')
    // .click(loginForm.find('.mat-button'));
    await t.debug();
});