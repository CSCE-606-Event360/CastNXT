const { Given, When, Then } = require('cucumber');

let number1;
let number2;
let sum;

Given('I have number {int}', function (int) {
    if (!number1) {
        number1 = int;
    } else {
        number2 = int;
    }
});

When('I add them', function () {
    sum = number1 + number2;
});

Then('I should get {int}', function (expected) {
    if (sum !== expected) {
        throw new Error(`Expected ${expected}, but got ${sum}`);
    }
});
