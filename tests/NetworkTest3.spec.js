const { test, expect } = require("@playwright/test");

test("Browser Context - Validation login ", async ({ page }) => {

    page.route("**/*.{jpg,png,jpeg}",route=>{
        route.abort();
    })
  const userName = page.locator("#username");
  const passWord = page.locator("#password");
  const signIn = page.locator('input[type="submit"]');
  const cardTitles = page.locator(".card-body a");

  page.on('request',request=>{
    console.log(request.url())
  })

    page.on('response',response=>{
    console.log(response.url(),response.status())
  })


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