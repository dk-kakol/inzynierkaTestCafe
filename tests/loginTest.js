import { AngularSelector, waitForAngular } from 'testcafe-angular-selectors';

import fixture from '../src/fixtures/firstAppFixture';
import LoginPage from '../src/pages/loginPage';
import NavPage from '../src/pages/navPage';
import testCases from '../src/utilities/readData';

let config = fixture()
const lp = new LoginPage();
const np = new NavPage();

const item = testCases.data('data/loginData.json');
const t1 = item['t1'];
test('Logging: ' + t1.testAccountKey, async t => {
  await lp.login(process.env.ACCOUNT_EMAIL, process.env.ACCOUNT_PASSWORD);
  await lp.verifyLoginSuccess();
  await np.logout(); 
});


const t2 = item['t2'];
t2.forEach((item, index) => {
  test('Logging: should fail no. ' + index + ' - ' + item.testAccountKey, async t => {
    await lp.login(item.email, item.password);
    await lp.verifyLoginFail();
  });
});
