import { AngularSelector, waitForAngular } from 'testcafe-angular-selectors';

import fixture from '../src/fixtures/firstAppFixture';
import LoginPage from '../src/pages/loginPage';
import CalculatePage from '../src/pages/calculatePage';
import ResultPage from '../src/pages/resultPage';
import NavPage from '../src/pages/navPage';
import testCases from '../src/utilities/readData';

let config = fixture()
const lp = new LoginPage();
const cp = new CalculatePage();
const rp = new ResultPage();
const np = new NavPage();

const item = testCases.data('data/calculationData.json');
const t1 = item['t1'];

test('Calculation test', async t => {
  await lp.login(process.env.ACCOUNT_EMAIL, process.env.ACCOUNT_PASSWORD);
  await cp.uploadFile(t1.filePath);
  await cp.verifyUploadFile(t1.recordsNumber, t1.firstName, t1.lastName);
  await cp.deleteItem(t1.idToDelete);
  await cp.typePeriod(t1.period);
  await cp.calculate();
  await rp.verifyNumResults(t1.recordsNumber-1);
  await rp.acceptResult(t1.acceptResult);
  await np.logout(); 
});