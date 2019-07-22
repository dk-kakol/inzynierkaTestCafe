import { t } from 'testcafe';
import { AngularSelector } from 'testcafe-angular-selectors';

import constants from '../../constants/appLang';

export default class calculatePage {
    constructor() {
        this.csvInput = AngularSelector('input').withAttribute('type', 'file');
        this.importButton = AngularSelector('button').withText(constants.IMPORT_TEXT);
        this.records = AngularSelector('app-list-item');
        this.deleteRecord = AngularSelector('a').withText(constants.DELETE_ITEM_TEXT);
        this.periodInput = AngularSelector('input').withAttribute('id', 'period');
        this.periodSaveButton = AngularSelector('button').withText(constants.PERIOD_TEXT);
        this.calculateButton = AngularSelector('button').withText(constants.CALCULATE_TEXT);
    }

    async uploadFile(file) { 
        await t.setFilesToUpload(this.csvInput, file).click(this.importButton);
    }

    async verifyUploadFile(recordsNumber, firstName, lastName){
        await t.expect(this.records.count).eql(recordsNumber);
        await t.expect(this.records.nth(0).innerText).contains(firstName);
        await t.expect(this.records.nth(-1).innerText).contains(lastName);
    }

    async deleteItem(number){
        await t.click(this.deleteRecord.nth(number));
    }

    async typePeriod(data) {
        await t
            .typeText(this.periodInput, data)
            .click(this.periodSaveButton);
    }

    async calculate(){
        await t.click(this.calculateButton);
    }
}