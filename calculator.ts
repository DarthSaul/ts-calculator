// data:
// - initial amount
// - annual contribution
// - expected return
// - duration

type InvestmentData = {
	initialAmount: number;
	annualContribution: number;
	expectedReturn: number;
	duration: number; // years
};

interface Results {
	year: number;
	value: number;
	totalContributions: number;
	totalInterestEarned: number;
}

type CalculatedInvestments = Results[] | string;

function calculateInvestment(data: InvestmentData): CalculatedInvestments {
	const { initialAmount, annualContribution, expectedReturn, duration } =
		data;

	if (initialAmount < 0) {
		return 'Whoops! Initial amount invested must be greater than $0.';
	}

	if (duration <= 0) {
		return 'Whoops! No valid amount of years provided.';
	}

	let total = initialAmount;
	let totalContributions = 0;
	let totalInterestEarned = 0;

	const results: Results[] = [];

	const rate = expectedReturn / 100;

	for (let i = 0; i < duration; i++) {
		total = total * (1 + rate);
		totalInterestEarned =
			total - totalContributions - initialAmount;
		totalContributions = totalContributions + annualContribution;
		total = total + annualContribution;

		const nextYearsReturn: Results = {
			year: i,
			value: total,
			totalContributions,
			totalInterestEarned,
		};

		results.push(nextYearsReturn);
	}

	return results;
} // => result[]

function printResults(results: CalculatedInvestments): void {
	if (typeof results === 'string') {
		return console.log(results);
	}

	results.forEach((item) => console.log(item));
}

let myData: InvestmentData = {
	initialAmount: 100,
	annualContribution: 10,
	expectedReturn: 3,
	duration: 30,
};

const results = calculateInvestment(myData);

printResults(results);
