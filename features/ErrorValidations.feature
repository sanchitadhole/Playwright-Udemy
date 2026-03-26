Feature: Ecommerce validations

    @Validations
    Scenario Outline: Scenario Outline name: Placing the order
        Given a login to Ecommerce2 application with "<userName>" and "<passWord>"
        Then Verify error message is displayed

    Example:
            | userName                  | passWord  |
            | SANCHITADHOLE27@GMAIL.COM | Cgain@123 |




