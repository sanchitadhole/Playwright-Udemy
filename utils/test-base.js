const base  = require("@playwright/test");

exports.customtest = base.test.extend({
  testDataForOrder: {
    username: "SANCHITADHOLE27@GMAIL.COM",
    password: "Cgain@123",
    productName: "ZARA COAT 3",
  },
  
});
