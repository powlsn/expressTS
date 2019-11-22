import puppeteer, { Browser, Page } from 'puppeteer';
import {
  setDefaultTimeout,
  BeforeAll,
  Before,
  After,
  AfterAll,
} from 'cucumber';
import { PgCleaner } from './pg-cleaner';

///////////////////////////////////////////
// DON'T USE page.$eval or page.evaluate //
// or hell may break loose !!! No joke!  //
///////////////////////////////////////////

// database
const dbCleaner = new PgCleaner();

// cucumber
const seconds = 1000;
setDefaultTimeout(555 * seconds);

// puppeteer
const host = 'http://localhost';
const port = '3000'; // dist/ compilation
// const port = '8080'; // hot reload
export const baseUrl = `${host}:${port}`;
let browser: Browser;
export let page: Page;

// Note to hooks of Cucumber and Jest:
// - Before() <- Cucumber hooks are capitel cased and must be imported
// - beforeEach() <- Jest hooks are camel cased and global

// Spreading All* hooks over multiple files makes it harder to understand.
// So please use only the following All* hooks in this file.
BeforeAll(async () => {
  const options = {
    headless: false, // maybe false
    slowMo: 50, // slow down by 300ms
  };
  await Promise.all([
    dbCleaner.init(),
    // browser = await puppeteer.launch(options);
    puppeteer.launch(options).then(newBrowser => (browser = newBrowser)),
  ]);
});

// Before each ...
Before(async () => {
  await Promise.all([
    dbCleaner.truncateTables(),
    // page = await browser.newPage();
    browser.newPage().then(newPage => (page = newPage)),
  ]);
});

// After each ...
After(async () => {
  // await browser.close(); // I think we are currently fine with one browser
  await page.close();
});

// Please use only the following `AfterAll` hook of this file.
AfterAll(async () => {
  await Promise.all([
    browser.close(),
    dbCleaner.truncateTables().then(() => dbCleaner.dispose()),
  ]);
});
