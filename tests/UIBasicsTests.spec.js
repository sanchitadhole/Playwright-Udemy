const {test} = require('@playwright/test')

// test("My first testcase",async ({browser})=>{
//     const context = await browser.newContext();
//     const page = await context.newPage()
//     await page.goto("https://rahulshettyacademy.com/upload-download-test/")
   
// })


test("Browser context Playwright test ",async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/upload-download-test/")
   
})