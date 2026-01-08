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

	const result: Results[] = [];

	result[0] = {
		year: 0,
		value: initialAmount * (1 + expectedReturn / 100),
		totalContributions: 10,
		totalInterestEarned:
			initialAmount * (1 + expectedReturn / 100) -
			initialAmount,
	};

	let contributions: number = annualContribution;
	let earned: number =
		initialAmount * (1 + expectedReturn / 100) - initialAmount;

	for (let i = 1; i <= duration; i++) {
		const { value } = result[i - 1];

		const rate = expectedReturn / 100;

		const withAnnual = value + annualContribution;
		const withReturn = withAnnual * (1 + rate);

		contributions += annualContribution;
		earned = withReturn - (contributions - 10) - initialAmount;

		const nextYearsReturn: Results = {
			year: i,
			value: withReturn,
			totalContributions: contributions,
			totalInterestEarned: earned,
		};

		result.push(nextYearsReturn);
	}

	return result;
} // => result[]

let myData: InvestmentData = {
	initialAmount: 100,
	annualContribution: 10,
	expectedReturn: 3,
	duration: 30,
};

const results = calculateInvestment(myData);

function printResults(results: CalculatedInvestments[]): void {
	if (typeof results === 'string') {
		return console.log(results);
	}

	results.forEach((item) => console.log(item));
}

printResults(results);
