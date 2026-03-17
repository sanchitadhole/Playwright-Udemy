const { test, expect } = require("@playwright/test");

test("My first testcase", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  // console.log(page.title())
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
});

test("Browser context validation in Playwright test ", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await page.locator("#username").fill("rahulshettyacademy");
  await page.locator("#password").fill("Learning@830$3mK");
  await page.locator('input[type="submit"]').click();
  console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText("Incorrect");
});

test("@Web Browser validation to get all text ", async ({ page }) => {
  const userName = page.locator("#username");
  const passWord = page.locator("#password");
  const signIn = page.locator('input[type="submit"]');
  const cardTitles = page.locator(".card-body a");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await userName.fill("rahulshetty");
  await passWord.fill("Learning@830$3mK2");
  await page.locator('input[type="submit"]').click();
  console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText("Incorrect");
  await userName.fill("rahulshettyacademy");
  await signIn.click();
  console.log(await cardTitles.nth(0).textContent());
  const allTitles = await cardTitles.allTextContents();
  console.log(allTitles);
});

test("Child window validation ", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
const documentLink = page.locator(
    'a[href="https://rahulshettyacademy.com/documents-request"]',
  );
  const [newPage] = await Promise.all([
    context.waitForEvent("page"), // listen for any new page

    await documentLink.click(), //new page is open  // pending rejected fulllfieled
  ]);

  const text = await newPage.locator(".red").textContent();
  console.log(text);
  const arrayText = text.split('@');
  const domain = arrayText[1].split(" ")[0]
  console.log(domain)
  await page.locator("#username").fill(domain);
  await page.pause();
  console.log(await page.locator("#username").inputValue());
  

});
