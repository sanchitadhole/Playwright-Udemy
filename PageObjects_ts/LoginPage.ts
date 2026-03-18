import { test, expect, Locator, Page } from "@playwright/test";

export class LoginPage {
  signInbutton: Locator;
  userName: Locator;
  passWord: Locator;
  page: Page;

  constructor(page: Page) {
    this.page = page;

    this.signInbutton = page.locator("#login");
    this.userName = page.locator("#userEmail");
    this.passWord = page.locator("#userPassword");
  }

  async goTo() {
    await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  }

  async validLogin(userName:string, passWord:string) {


    await this.userName.fill(userName);
    await this.passWord.fill(passWord);
    await this.signInbutton.click();

    await this.page.waitForLoadState("networkidle");
  }
}

module.exports = { LoginPage };
