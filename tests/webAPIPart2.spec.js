// Login UI -> .json
// test, cart , orders, orders details, orderhistory

const { test, expect } = require("@playwright/test");
let webContext;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.locator("#userEmail").fill("SANCHITADHOLE27@GMAIL.COM");
  await page.locator("#userPassword").fill("Cgain@123");
  await page.locator("#login").click();
  await page.waitForLoadState("networkidle");
  await context.storageState({ path: "state.json" });
  webContext = await browser.newContext({ storageState: "state.json" });
});

test("My first testcase", async () => {
  const productName = "ZARA COAT 3";
  const email = "SANCHITADHOLE27@GMAIL.COM";
  const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  const products = page.locator(".card-body");

  await page.locator(".card-body b").first().waitFor();
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);

  const count = await products.count();
  console.log(count);

  for (let i = 0; i < count; i++) {
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }
  // await page.pause();

  await page.locator('button[routerlink*="cart"]').click();
  await page.locator("div li").first().waitFor();

  const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  expect(bool).toBeTruthy();

  await page.locator("text=Checkout").click();
  await page
    .getByPlaceholder("Select Country")
    .pressSequentially("Ind", { delay: 150 });

  const dropDown = page.locator(".ta-results");
  await dropDown.waitFor();
  let optionsCounts = await dropDown.locator("button").count();
  // console.log(optionsCounts);
  for (let i = 0; i < optionsCounts; ++i) {
    const text = await dropDown.locator("button").nth(i).textContent();
    if (text === " India") {
      await dropDown.locator("button").nth(i).click();
      break;
    }
  }
  await page.locator('input[class="input txt"]').first().fill("12334");
  await page.locator('input[class="input txt"]').last().fill("233sd");
  expect(page.locator("label[type='text']")).toHaveText(email);
  await page.locator(".btnn.action__submit.ng-star-inserted").click();
  expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

  const orderId = await page
    .locator("label[class='ng-star-inserted']")
    .textContent();
  console.log(orderId);

  await page.pause();
});




test("My first testcase 2", async () => {
  const productName = "ZARA COAT 3";
  const email = "SANCHITADHOLE27@GMAIL.COM";
  const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  const products = page.locator(".card-body");

  await page.locator(".card-body b").first().waitFor();
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);

 
});

