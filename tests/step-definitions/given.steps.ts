import { Given } from 'cucumber';
import { baseUrl, page } from '../support/setup';

///////////////////////////////////////////
// DON'T USE page.$eval or page.evaluate //
// or hell may break loose !!! No joke!  //
///////////////////////////////////////////

Given('I am on the homepage', async () => {
  await page.goto(baseUrl);
});

Given('I am at the list of {string}', async model => {
  await page.goto(baseUrl + '/' + model);
});
