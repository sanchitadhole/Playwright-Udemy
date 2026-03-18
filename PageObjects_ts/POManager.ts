
import { LoginPage } from "./LoginPage";
import {DashboardPage} from "./DashboardPage"
import {Page} from '@playwright/test';


export class POManager {
  loginPage :LoginPage
  DashboardPage :DashboardPage
  page :Page;





  constructor(page:Page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.DashboardPage = new DashboardPage(page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getDashboardPage() {
    return this.DashboardPage;
  }
}

module.exports = { POManager };
