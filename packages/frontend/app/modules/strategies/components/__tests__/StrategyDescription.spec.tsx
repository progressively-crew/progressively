import { render, screen } from "@testing-library/react";
import { expect } from "@jest/globals";
import { FlagEnv, FlagStatus } from "~/modules/flags/types";
import { StrategyDescription } from "../StrategyDescription";

describe("StrategyDescription", () => {
  let flagEnv: FlagEnv;

  const getText = () => document.querySelector("p")?.textContent;

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
    render(<StrategyDescription flagEnv={flagEnv} hasStrategies={false} />);

    expect(getText()).toBe('12% of the audience will resolve the "true" variant of the flag.');
  });
});
