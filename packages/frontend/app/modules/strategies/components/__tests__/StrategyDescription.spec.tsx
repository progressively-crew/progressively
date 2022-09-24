import { render } from "@testing-library/react";
import { expect } from "@jest/globals";
import { FlagEnv, FlagStatus } from "~/modules/flags/types";
import { StrategyDescription } from "../StrategyDescription";

describe("StrategyDescription", () => {
  let flagEnv: FlagEnv;

  const getText = () => document.querySelector("p")?.textContent;
  const getAllLi = () => document.querySelectorAll("li");

  beforeEach(() => {
    flagEnv = {
      environment: {
        clientKey: "valid-sdk-key",
        name: "First env",
        projectId: "1",
        uuid: "123",
        flagEnvironment: [],
      },
      environmentId: "1",
      flag: {
        createdAt: "in the past",
        description: "Flag description",
        key: "flag-key",
        name: "Flag name",
        uuid: "1",
      },
      flagId: "1",
      rolloutPercentage: 12,
      status: FlagStatus.ACTIVATED,
      variants: [],
    };
  });

  it("shows a generic message when the flag is not activated", () => {
    flagEnv.status = FlagStatus.NOT_ACTIVATED;
    render(<StrategyDescription flagEnv={flagEnv} hasStrategies={false} />);

    expect(getText()).toBe(`Nobody will receive the "true" variant of the flag: it'snot activated`);
  });

  describe("No variants", () => {
    beforeEach(() => {
      flagEnv.variants = [];
    });

    it("shows a specific message when the percentage is 12% with no strategies", () => {
      const hasStrategies = false;

      render(<StrategyDescription flagEnv={flagEnv} hasStrategies={hasStrategies} />);

      expect(getText()).toBe('12% of the audience will resolve the "true" variant of the flag.');
    });

    it("shows a specific message when the percentage is 12% with strategies", () => {
      const hasStrategies = true;

      render(<StrategyDescription flagEnv={flagEnv} hasStrategies={hasStrategies} />);

      expect(getText()).toBe(
        `12% of the audience AND the users matching at least one of the following strategies will resolve the "true" variant of the flag.`
      );
    });

    it("shows a specific message when the percentage is 100%", () => {
      flagEnv.rolloutPercentage = 100;

      render(<StrategyDescription flagEnv={flagEnv} hasStrategies={false} />);

      expect(getText()).toBe(`100% of the audience will resolve the "true" variant of the flag.`);
    });

    it("shows a specific message when the percentage is 0% and with no strategies", () => {
      flagEnv.rolloutPercentage = 0;
      const hasStrategies = false;

      render(<StrategyDescription flagEnv={flagEnv} hasStrategies={hasStrategies} />);

      expect(getText()).toBe(`0% of the audience will resolve the "true" variant of the flag.`);
    });

    it("shows a specific message when the percentage is 0% and with strategies", () => {
      flagEnv.rolloutPercentage = 0;
      const hasStrategies = true;

      render(<StrategyDescription flagEnv={flagEnv} hasStrategies={hasStrategies} />);

      expect(getText()).toBe(
        `Only the user matching at least one of the following strategies will resolve the "true" variant of the flag since the rollout percentage is 0%.`
      );
    });
  });

  describe("Multiple variants", () => {
    beforeEach(() => {
      flagEnv.variants = [
        {
          uuid: "1",
          isControl: true,
          rolloutPercentage: 12,
          value: "Control",
        },
        {
          uuid: "2",
          isControl: false,
          rolloutPercentage: 55,
          value: "Alternative",
        },
      ];
    });

    it("shows a generic message when the flag is not activated", () => {
      flagEnv.status = FlagStatus.NOT_ACTIVATED;
      render(<StrategyDescription flagEnv={flagEnv} hasStrategies={false} />);

      expect(getText()).toBe(
        `Nobody will receive the "true" variant of the flag: it'snot activated`
      );
    });

    it("shows messages about the flag variants and information about cumulative percent", () => {
      render(<StrategyDescription flagEnv={flagEnv} hasStrategies={false} />);

      const lis = getAllLi();

      expect(lis[0].textContent).toBe(`12% of the audience will receive the "Control" variation`);
      expect(lis[1].textContent).toBe(
        `55% of the audience will receive the "Alternative" variation`
      );

      expect(getText()).toBe(
        `The sum of the percentage is 67%. People that are not in these bounds will receive the "Control" (the control variant).`
      );
    });
  });
});
