const { test, expect, request } = require("@playwright/test");
const { APiUtils } = require("../utils/APiUtils.js")

const loginPayLoad = {
  userEmail: "SANCHITADHOLE27@GMAIL.COM",
  userPassword: "Cgain@123",
};
const orderPayLoad = {
  orders: [{ country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3" }],
};

let token;
let orderId;

// execute  once before all testcase
let response
test.beforeAll(async () => {
  // Login API

  const apiContext = await request.newContext();
  const apiUtils = new APiUtils(apiContext, loginPayLoad);
  response = await apiUtils.createOrder(orderPayLoad);

  //
});

test("validate orderId ", async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  const productName = "ZARA COAT 3";
  const email = "SANCHITADHOLE27@GMAIL.COM";
  const products = page.locator(".card-body");

  await page.goto("https://rahulshettyacademy.com/client/");

  // await page.locator(".card-body b").first().waitFor();

  await page.locator('button[routerlink="/dashboard/myorders"]').click();
  await page.locator("tbody").waitFor();

  const rows = await page.locator("tbody tr");

  for (let i = 0; i < (await rows.count()); i++) {
    const roworderId = await rows.nth(i).locator("th").textContent();
    if (response.orderId.includes(roworderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    await page.pause();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
  }
});
