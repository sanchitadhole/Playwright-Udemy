const { test, expect } = require("@playwright/test");

test("security test request intercept", async ({ page }) => {
  // login and reach orderds page
  // Continue method is used to intercept request calls

  const productName = "ZARA COAT 3";
  const email = "SANCHITADHOLE27@GMAIL.COM";
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").fill("Cgain@123");
  await page.locator("#login").click();
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();

  await page.locator('button[routerlink="/dashboard/myorders"]').click();

  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    (route) =>
      route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=69b23d24f86ba51a65fbcf5g",
      }),
  );
  await page.locator("button:has-text('View')").first().click();

  await expect(page.locator("p").last()).toHaveText(
    "You are not authorize to view this order",
  );
});
