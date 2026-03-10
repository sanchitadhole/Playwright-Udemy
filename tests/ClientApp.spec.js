const { test, expect } = require("@playwright/test");

test("My first testcase", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.locator("#userEmail").fill("SANCHITADHOLE27@GMAIL.COM");
  await page.locator("#userPassword").fill("Cgain@123");
  await page.locator("#login").click();
  // await page.waitForLoadState('networkidle')
  await page.locator(".card-body b").first().waitFor();
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
});

test("UI controls", async ({ page }) => {
  const documentLink = page.locator(
    'a[href="https://rahulshettyacademy.com/documents-request"]',
  );
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const dropDown = await page.locator("select.form-control");
  await dropDown.selectOption("consult");
  await page.locator(".radiotextsty").last().click();
  await page.locator("#okayBtn").click();
  console.log(page.locator(".radiotextsty").last().isChecked());
  await expect(page.locator(".radiotextsty").last()).toBeChecked();
  await page.locator("#terms").click();
  await expect(page.locator("#terms")).toBeChecked();
  await page.locator("#terms").uncheck();
  expect(await page.locator("#terms").isChecked()).toBeFalsy();
  await expect(documentLink).toHaveAttribute('class',"blinkingText")
});
