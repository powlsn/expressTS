/* eslint-disable @typescript-eslint/explicit-function-return-type */
export class Patience {
  static sleep(milliseconds: number) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  static async retry(
    codeblock,
    leftTries: number,
    waitTime = 100, // milliseconds
  ) {
    try {
      --leftTries;
      await codeblock();
    } catch (error) {
      if (leftTries < 0) {
        throw new Error('Max retries reached: ' + error);
      }
      await Patience.sleep(waitTime);
      await Patience.retry(codeblock, leftTries);
    }
  }
}

export default async function patiently(codeblock, waitTime = 100) {
  const maxTries = 5;
  await Patience.retry(codeblock, maxTries, waitTime);
}
