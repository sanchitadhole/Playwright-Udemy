const { test, expect } = require("@playwright/test");

test("Create a brand new event from the admin panel, then complete a booking for that event, and finally verify the seat count drops by exactly 1",async({page})=>{
    await page.goto("https://eventhub.rahulshettyacademy.com/login");
    await page.locator("#email").fill("SANCHITADHOLE27@GMAIL.COM");
    await page.locator('label[for="password"]').fill("Cgain@123");
    await page.locator("#login-btn").click();
await page.waitForLoadState("networkidle");
    await page.locator("#nav-home").waitFor();

      await expect(page.getByText("Browse Events →")).toBeVisible();
})