export const FlagEvaluationTenKCost = 12;
export const FlagEvaluationLimitTrial = 1000;

const TenKPlan = "price_1N8LrcIIMJ2kplmT99wSIcVE";
const TwentyKPlan = "price_1N8LrcIIMJ2kplmT99wSIcVE";
const ThirtyKPlan = "price_1N8LrcIIMJ2kplmT99wSIcVE";
const FourtyKPlan = "price_1N8LrcIIMJ2kplmT99wSIcVE";
const FiftyKPlan = "price_1N8LrcIIMJ2kplmT99wSIcVE";
const SixtyKPlan = "price_1N8LrcIIMJ2kplmT99wSIcVE";
const SeventyKPlan = "price_1N8LrcIIMJ2kplmT99wSIcVE";
const EightyKPlan = "price_1N8LrcIIMJ2kplmT99wSIcVE";

// const TenKPlan = "price_1N9SEYIIMJ2kplmTeVqemn0k";
// const TwentyKPlan = "price_1N9SFIIIMJ2kplmTjDubzE4F";
// const ThirtyKPlan = "price_1N9SFtIIMJ2kplmTIigIBKOB";
// const FourtyKPlan = "price_1N9SGNIIMJ2kplmTUPk3tGIz";
// const FiftyKPlan = "price_1N9SGrIIMJ2kplmTyfye70lT";
// const SixtyKPlan = "price_1N9SHKIIMJ2kplmT8aPTKZbg";
// const SeventyKPlan = "price_1N9SHoIIMJ2kplmTgWLSHcue";
// const EightyKPlan = "price_1N9SIDIIMJ2kplmTVKZyXbvu";

export const EvaluationToPriceId: Record<number, string> = {
  10000: TenKPlan,
  20000: TwentyKPlan,
  30000: ThirtyKPlan,
  40000: FourtyKPlan,
  50000: FiftyKPlan,
  60000: SixtyKPlan,
  70000: SeventyKPlan,
  80000: EightyKPlan,
};

export const PriceIdToEvaluation: Record<string, number> = {
  [TenKPlan]: 10000,
  [TwentyKPlan]: 20000,
  [ThirtyKPlan]: 30000,
  [FourtyKPlan]: 40000,
  [FiftyKPlan]: 50000,
  [SixtyKPlan]: 60000,
  [SeventyKPlan]: 70000,
  [EightyKPlan]: 80000,
};
