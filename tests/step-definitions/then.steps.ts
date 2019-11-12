import { Then } from 'cucumber';
import { page } from '../support/setup';
import { expect } from 'chai';
import patiently from '../support/patience';

///////////////////////////////////////////
// DON'T USE page.$eval or page.evaluate //
// or hell may break loose !!! No joke!  //
///////////////////////////////////////////

Then('I take a screenshot', async () => {
  await page.screenshot({ path: 'screenshot.png' });
});

Then('debug', () => {
  // tslint:disable-next-line: no-debugger
  debugger;
});

Then('I should see {string}', async text => {
  await patiently(async () => {
    const content = await page.content();
    const matches = content.match(text);
    if (matches === null) {
      throw new Error(`Text not found: ${text}`);
    }
    // todo: check which alternative is executed faster
    // const elementHandles = await page.$x(`//*[text()[contains(., '${text}')]]`);
    // if (elementHandles.length === 0) { throw ... }
  }, 1000);
});

Then('I should not see {string}', async text => {
  await patiently(async () => {
    const content = await page.content();
    const matches = content.match(text);
    return expect(matches).to.be.null;
  });
});

Then('I should see a link labeled {string}', async label => {
  await patiently(async () => {
    const anchors = await page.$x(`//a[contains(text(), '${label}')]`);
    return expect(anchors.length).to.equal(1);
  });
});

Then('I should be on the {string} page', async pageName => {
  await patiently(async () => {
    const elementHandles = await page.$x(
      `//h1[contains(text(), '${pageName}')]`,
    );
    if (elementHandles.length < 1) {
      throw new Error(`Headline not found: ${pageName}`);
    }
  });
});
