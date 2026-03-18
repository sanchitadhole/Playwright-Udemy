import { test, expect } from "@playwright/test";
import { POManager } from "../PageObjects_ts/POManager";

import { customTest } from "../utils_ts/test-base";

const dataset = JSON.parse(
  JSON.stringify(require("../utils/placeorderTestData.json")),
);

// Json->string-<json object

for (const data of dataset) {
  test(`My first testcase ${data.productName}`, async ({ page }) => {
    const poManager = new POManager(page);

    const productName = "ZARA COAT 3";
    const userName = "SANCHITADHOLE27@GMAIL.COM";
    const passWord = "Cgain@123";
    const products = page.locator(".card-body");

    const loginpage = poManager.getLoginPage();
    await loginpage.goTo();
    await loginpage.validLogin(data.username, data.password);
    const dashboardPage = poManager.getDashboardPage();

    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();
    await page.locator("div li").first().waitFor();

    const bool = await page
      .locator(`h3:has-text("${data.productName}")`)
      .isVisible();
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
    expect(page.locator("label[type='text']")).toHaveText(data.username);
    await page.locator(".btnn.action__submit.ng-star-inserted").click();
    expect(page.locator(".hero-primary")).toHaveText(
      " Thankyou for the order. ",
    );

    const orderId = await page
      .locator("label[class='ng-star-inserted']")
      .textContent();
    console.log(orderId);

    // await page.pause();
  });
}

customTest("Client app login", async ({ page, testDataForOrder }) => {
  const poManager = new POManager(page);

  const productName = "ZARA COAT 3";
  const userName = "SANCHITADHOLE27@GMAIL.COM";
  const passWord = "Cgain@123";
  const products = page.locator(".card-body");

  const loginpage = poManager.getLoginPage();
  await loginpage.goTo();
  await loginpage.validLogin(
    testDataForOrder.username,
    testDataForOrder.password,
  );
  const dashboardPage = poManager.getDashboardPage();

  await dashboardPage.searchProductAddCart(testDataForOrder.productName);
  await dashboardPage.navigateToCart();
  await page.locator("div li").first().waitFor();

  const bool = await page
    .locator(`h3:has-text("${testDataForOrder.productName}")`)
    .isVisible();
  expect(bool).toBeTruthy();

  await page.locator("text=Checkout").click();
});
