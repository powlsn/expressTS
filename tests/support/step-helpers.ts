import { page } from './setup';
import { ElementHandle } from 'puppeteer';
import patiently from './patience';

///////////////////////////////////////////
// DON'T USE page.$eval or page.evaluate //
// or hell may break loose !!! No joke!  //
///////////////////////////////////////////

export function inputSelector(field: string): string {
  return `input[name=${field}]`;
}

export async function input(field: string): Promise<ElementHandle> {
  return page.waitForSelector(inputSelector(field));
}

export async function clearInput(field: string): Promise<void> {
  await patiently(async () => {
    const elementHandle = await input(field);
    await elementHandle.click();
    await elementHandle.focus();
    // click three times to select all
    await elementHandle.click({ clickCount: 3 });
    await elementHandle.press('Backspace');
  });
}

export async function typeIn(field: string, text: string): Promise<void> {
  await patiently(async () => {
    await page.type(inputSelector(field), text);
  });
}
