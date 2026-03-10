import { test, expect } from "@playwright/test";

test("Playwright special locatirs", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  //getByLabel
  await page.getByLabel("Check me out if you Love IceCreams!").click();
  await page.getByLabel("Employed").click();
  await page.getByLabel("Gender").selectOption("Male");
  //getByPlaceholder
  await page.getByPlaceholder("Password").fill("abc123");
  //getByRole
  await page.getByRole("button", { name: "Submit" }).click();
  //getByText
  await page
    .getByText("Success! The Form has been submitted successfully!.")
    .isVisible();

  await page.getByRole("link", { name: "Shop" }).click();

  await page.locator("app-card").filter({ hasText: "Nokia Edge" }).getByRole("button").click()
});
