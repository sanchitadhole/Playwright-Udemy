import {test as baseTest} from "@playwright/test"

interface testDataForOrder {
    username: string;
    password: string;
    productName: string;
}

export const customTest = exports.customtest = baseTest.extend<{testDataForOrder:testDataForOrder}>({
  testDataForOrder: {
    username: "SANCHITADHOLE27@GMAIL.COM",
    password: "Cgain@123",
    productName: "ZARA COAT 3",
  },
  
});
