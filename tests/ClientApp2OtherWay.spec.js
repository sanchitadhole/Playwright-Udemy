const { test, expect } = require("@playwright/test");

test("My first testcase", async ({ page }) => {
  const productName = "ZARA COAT 3";
  const email = "SANCHITADHOLE27@GMAIL.COM";
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.getByPlaceholder("email@example.com").fill(email);
  await page.getByPlaceholder("enter your passsword").fill("Cgain@123");
  await page.getByRole("button", { name: "Login" }).click();

  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();

  await page
    .locator(".card-body")
    .filter({ hasText: "ZARA COAT 3" })
    .getByRole("button", { name: " Add To Cart" })
    .click();

  await page
    .getByRole("listitem")
    .getByRole("button", { name: "Cart" })
    .click();

  await page.locator("div li").first().waitFor();
  await expect(page.getByText("ZARA COAT 3")).toBeVisible();

  await page.getByRole("button", { name: "Checkout" }).click();


  await page
    .getByPlaceholder("Select Country")
    .pressSequentially("Ind", { delay: 150 });



await page.getByRole("button",{name:"India"}).nth(1).click();




  // await page.locator('input[class="input txt"]').first().fill("12334");
  // await page.locator('input[class="input txt"]').last().fill("233sd");
  // expect(page.locator("label[type='text']")).toHaveText(email);



  await page.getByText("Place Order ").click();


    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();




  // await page.pause();
});
