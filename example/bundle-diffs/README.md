This project aims to show the bundle impact of the different feature flags solutions on the market.

_:warning: It may be an apple to orange comparison since all of them does not provide the exact same functionalities. To take with caution._

It includes:

- [LaunchDarkly](https://launchdarkly.com/)
- [Unleash](https://www.getunleash.io/)
- [Flagship](http://flagship.io/)
- [GrowthBook](https://www.growthbook.io/)
- [Progressively](https://progressively.app)

On the 18th of July 2022, and according to the data provided by the analyzer, Progressively is:

- **14 times** smaller than LaunchDarkly
- **7 times** smaller than Unleash
- **24 times** smaller than Flagship
- **3 times** smaller than Growthbook

## Running the bundle analyzer

In your favorite terminal:

```sh
$ git clone https://github.com/progressively-crew/progressively
$ pnpm i && pnpm run build
$ cd example/bundle-diffs
$ pnpm i
$ pnpm run build:analyze
```
