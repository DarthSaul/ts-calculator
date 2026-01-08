"use strict";
// data:
// - initial amount
// - annual contribution
// - expected return
// - duration
function calculateInvestment(data) {
    const { initialAmount, annualContribution, expectedReturn, duration } = data;
    if (initialAmount < 0) {
        return 'Whoops! Initial amount invested must be greater than $0.';
    }
    if (duration <= 0) {
        return 'Whoops! No valid amount of years provided.';
    }
    const result = [];
    result[0] = {
        year: 0,
        value: initialAmount * (1 + expectedReturn / 100),
        totalContributions: 10,
        totalInterestEarned: initialAmount * (1 + expectedReturn / 100) -
            initialAmount,
    };
    let contributions = annualContribution;
    let earned = initialAmount * (1 + expectedReturn / 100) - initialAmount;
    for (let i = 1; i <= duration; i++) {
        const { value } = result[i - 1];
        const rate = expectedReturn / 100;
        const withAnnual = value + annualContribution;
        const withReturn = withAnnual * (1 + rate);
        contributions += annualContribution;
        earned = withReturn - (contributions - 10) - initialAmount;
        const nextYearsReturn = {
            year: i,
            value: withReturn,
            totalContributions: contributions,
            totalInterestEarned: earned,
        };
        result.push(nextYearsReturn);
    }
    return result;
} // => result[]
let myData = {
    initialAmount: 100,
    annualContribution: 10,
    expectedReturn: 3,
    duration: 30,
};
const results = calculateInvestment(myData);
function printResults(results) {
    if (typeof results === 'string') {
        return console.log(results);
    }
    results.forEach((item) => console.log(item));
}
printResults(results);
