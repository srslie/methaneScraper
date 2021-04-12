/*
This is using puppeteer b/c I'm in javascript

https://www.npmjs.com/package/puppeteer
https://masteringjs.io/tutorials/fundamentals/puppeteer

pulling those out into an async function made it a bit wonky, not sure why.

But basically I think if you use a window.setTimeout() or .setInterval() and call that update function on a timer, you can get a log of whatever values you need (or push it into a file or something)

https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval
https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout
*/

const puppeteer = require('puppeteer');
const browser = await puppeteer.launch({
  headless: false,
});

const page = await browser.newPage();
await page.setRequestInterception(true);
await page.goto('http://timer-timer.com/');

// this will print out the whole html:
// console.log(await page.content());

//this is going to get the minutes and seconds and log them with a timestamp
async function getUpdate() {
  const minutes = await page.evaluate(() => {
    return document.querySelector('#Minutes').innerText;
  });

  const seconds = await page.evaluate(() => {
    return document.querySelector('#Seconds').innerText;
  });

  console.log(`Update:  timestamp:  ${Date.now()}, minutes, 
    ${minutes}, seconds  ${seconds}`)
}

getUpdate()

// this will go in and click your button for you/or change the power or whatever, maybe don't need to do this part yet but I'm trying to test for a dynamic change
await page.evaluate(() => {
  document.querySelector('#Go').click();
});

console.log('passed click')
getUpdate()

await browser.close();