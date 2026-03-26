Feature: Ecommerce validations
    @Regression
    Scenario: Placing the order
        Given a login to Ecommerce application with "SANCHITADHOLE27@GMAIL.COM" and "Cgain@123"
        When Add "ZARA COAT 4" to Cart
        Then Verify "ZARA COAT 3" is displayed in the Cart
        When Enter valid details and place the order
        Then Verify order in present in the OrderHistory



    @Validations
    Scenario Outline: Scenario Outline name: Placing the order
        Given a login to Ecommerce2 application with "<userName>" and "<passWord>"
        Then Verify error message is displayed

    Example:
            | userName                  | passWord  |
            | SANCHITADHOLE27@GMAIL.COM | Cgain@123 |



# npx cucumber-js features/Ecommerce.feature --parallel 2 --exit --format  html:cucumber-report.html


# npx cucumber-js features/Ecommerce.feature --parallel 2 --exit

# npx cucumber-js --tags "@Validations" --exit



