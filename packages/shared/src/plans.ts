export const FlagEvaluationLimitTrial = 1000;

// const One = "price_1N8LrcIIMJ2kplmT99wSIcVE";
// const Two = "price_1NIsh8IIMJ2kplmTWlsnq5lo";
// const Three = "price_1N8LrcIIMJ2kplmT99wSIcVE";
// const Four = "price_1N8LrcIIMJ2kplmT99wSIcVE";
// const Five = "price_1N8LrcIIMJ2kplmT99wSIcVE";
// const Six = "price_1N8LrcIIMJ2kplmT99wSIcVE";
// const Seven = "price_1N8LrcIIMJ2kplmT99wSIcVE";
// const Eight = "price_1N8LrcIIMJ2kplmT99wSIcVE";

const Small = "price_1Ng0FoIIMJ2kplmT1dIgsrsw";
const One = "price_1N9SEYIIMJ2kplmTeVqemn0k";
const Two = "price_1N9SFIIIMJ2kplmTjDubzE4F";
const Three = "price_1N9SFtIIMJ2kplmTIigIBKOB";
const Four = "price_1N9SGNIIMJ2kplmTUPk3tGIz";
const Five = "price_1N9SGrIIMJ2kplmTyfye70lT";
const Six = "price_1N9SHKIIMJ2kplmT8aPTKZbg";
const Seven = "price_1N9SHoIIMJ2kplmTgWLSHcue";
const Eight = "price_1N9SIDIIMJ2kplmTVKZyXbvu";

export const EvaluationToPriceId: Record<number, string> = {
  10000: Small,
  50000: One,
  100000: Two,
  200000: Three,
  300000: Four,
  400000: Five,
  500000: Six,
  600000: Seven,
  1000000: Eight,
};

export const PriceIdToEvaluation: Record<string, number> = {
  [Small]: 10000,
  [One]: 50000,
  [Two]: 100000,
  [Three]: 200000,
  [Four]: 300000,
  [Five]: 400000,
  [Six]: 500000,
  [Seven]: 600000,
  [Eight]: 1000000,
};

// Should always be 1-1 with Stripe
export const Prices = [
  {
    events: PriceIdToEvaluation[EvaluationToPriceId["10000"]],
    price: "€4.90",
  },
  {
    events: PriceIdToEvaluation[EvaluationToPriceId["50000"]],
    price: "€12.00",
  },
  {
    events: PriceIdToEvaluation[EvaluationToPriceId["100000"]],
    price: "€24.00",
  },
  {
    events: PriceIdToEvaluation[EvaluationToPriceId["200000"]],
    price: "€36.00",
  },
  {
    events: PriceIdToEvaluation[EvaluationToPriceId["300000"]],
    price: "€48.00",
  },
  {
    events: PriceIdToEvaluation[EvaluationToPriceId["400000"]],
    price: "€60.00",
  },
  {
    events: PriceIdToEvaluation[EvaluationToPriceId["500000"]],
    price: "€72.00",
  },
  {
    events: PriceIdToEvaluation[EvaluationToPriceId["600000"]],
    price: "€84.00",
  },
  {
    events: PriceIdToEvaluation[EvaluationToPriceId["1000000"]],
    price: "€96.00",
  },
];
