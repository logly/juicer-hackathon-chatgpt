import {launch} from "puppeteer";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const url = body.url;

  const browser = await launch()
  const page = await browser.newPage()
  await page.goto(url);

  const responseData = await page.evaluate(() => {
    return {
      'title': document.title,
      'body': document.querySelector("body")?.textContent,
      'description': document.querySelector('meta[name="description"]')?.textContent,
      'keywords': document.querySelector('meta[name="keywords"]')?.textContent,
    }
  })

  await browser.close();

  return {
    ...responseData
  }
})
