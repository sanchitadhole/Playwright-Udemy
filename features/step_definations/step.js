const { When, Then, Given } = require("@cucumber/cucumber");
const { POManager } = require("../../PageObjects/POManager");
const { expect } = require("@playwright/test");
const playwright = require("@playwright/test");

Given(
  "a login to Ecommerce application with {string} and {string}",
  { timeout: 100 * 1000 },
  async function (userName, passWord) {
    this.userName = userName;

    const loginpage = this.poManager.getLoginPage();
    await loginpage.goTo();
    await loginpage.validLogin(userName, passWord);
    this.dashboardPage = this.poManager.getDashboardPage();
  },
);

When(
  "Add {string} to Cart",
  { timeout: 100 * 1000 },
  async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    this.dashboardPage = this.poManager.getDashboardPage();

    await this.dashboardPage.searchProductAddCart(productName);

    await this.dashboardPage.navigateToCart();
  },
);

Then(
  "Verify {string} is displayed in the Cart",
  { timeout: 100 * 1000 },
  async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    await this.page.locator("div li").first().waitFor();

    const bool = await this.page
      .locator(`h3:has-text("${productName}")`)
      .isVisible();
    expect(bool).toBeTruthy();

    await this.page.locator("text=Checkout").click();
  },
);

When(
  "Enter valid details and place the order",
  { timeout: 100 * 1000 },
  async function () {
    // Write code here that turns the phrase above into concrete actions
    await this.page
      .getByPlaceholder("Select Country")
      .pressSequentially("Ind", { delay: 150 });

    const dropDown = this.page.locator(".ta-results");
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
  },
);

Then(
  "Verify order in present in the OrderHistory",
  { timeout: 100 * 1000 },
  async function () {
    // Write code here that turns the phrase above into concrete actions
    await this.page.locator('input[class="input txt"]').first().fill("12334");
    await this.page.locator('input[class="input txt"]').last().fill("233sd");
    expect(this.page.locator("label[type='text']")).toHaveText(this.userName);
    await this.page.locator(".btnn.action__submit.ng-star-inserted").click();
    expect(this.page.locator(".hero-primary")).toHaveText(
      " Thankyou for the order. ",
    );

    const orderId = await this.page
      .locator("label[class='ng-star-inserted']")
      .textContent();
    console.log(orderId);
  },
);

Given(
  "a login to Ecommerce2 application with {string} and {string}",
  async function (userName, passWord) {

     const username = this.page.locator("#username");
  const password = this.page.locator("#password");


    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(this.page.title());
    await username.fill(userName);
    await password.fill(passWord);
    await this.page.locator('input[type="submit"]').click();
  },
);

Then("Verify error message is displayed", async function () {
  // Write code here that turns the phrase above into concrete actions
  console.log(await this.page.locator("[style*='block']").textContent());
  await expect(this.page.locator("[style*='block']")).toContainText(
    "Incorrect",
  );
});
