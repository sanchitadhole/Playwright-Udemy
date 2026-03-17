const { DashboardPage } = require("./DashboardPage");
const { LoginPage } = require("./LoginPage");

class POManager {
  constructor(page) {
    this.page = page
    this.loginPage = new LoginPage(page);
    this.DashboardPage = new DashboardPage(page);
  }

  getLoginPage(){
    return this.loginPage
  }

  getDashboardPage(){
    return this.DashboardPage
  }
}

module.exports = {POManager}