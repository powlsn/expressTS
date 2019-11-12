import { When } from 'cucumber';
import { page } from '../support/setup';
import patiently from '../support/patience';
import { clearInput, typeIn } from '../support/step-helpers';

When(/I wait (a|\d) seconds?/, async second => {
  second = second === 'a' ? 1 : +second;
  const milliseconds: number = second * 1000;
  await page.waitFor(milliseconds);
});

When('I follow {string}', async link => {
  const elementHandles = await page.$x(`//a[contains(text(), '${link}')]`);
  if (elementHandles.length < 1) {
    throw new Error(`Link not found: ${link}`);
  }
  await elementHandles[0].click();
});

When('I click {string}', async text => {
  await patiently(async () => {
    const elementHandles = await page.$x(`//*[contains(text(), '${text}')]`);
    if (elementHandles.length === 0) {
      throw new Error(`Text not found: ${text}`);
    }
    await elementHandles[0].click();
  });
});

When('I click on the element {string}', async selector => {
  await patiently(async () => {
    const element = await page.waitForSelector(selector);
    element.click();
  });
});

When('I fill in {string} with {string}', async (field, myValue) => {
  await clearInput(field);
  await typeIn(field, myValue);
});

When('I type in {string} with {string}', async (field, myValue) => {
  await typeIn(field, myValue);
});

When('I clear the {string} field', async field => {
  await clearInput(field);
});
