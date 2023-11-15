const { Given, When, Then } = require('cucumber');

let number1;
let number2;
let sum;

Given('I have numbers {int} and {int}', function (num1, num2) {
    number1 = num1;
    number2 = num2;
});

When('I add them', function () {
    sum = number1 + number2
});

Then('I should get {int}', function (expected) {
    if (sum !== expected) {
        throw new Error(`Expected ${expected}, but got ${sum}`);
    }
});
