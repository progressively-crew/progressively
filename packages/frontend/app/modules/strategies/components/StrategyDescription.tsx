import { Stack } from "~/components/Stack";
import { Tag } from "~/components/Tag";
import { Typography } from "~/components/Typography";
import { Li, Ul } from "~/components/Ul";
import { FlagEnv, FlagStatus } from "~/modules/flags/types";

export interface StrategyDescriptionProps {
  flagEnv: FlagEnv;
  hasStrategies: boolean;
}

const SimpleVariantDescription = ({
  flagEnv,
  hasStrategies,
}: StrategyDescriptionProps) => {
  if (flagEnv.rolloutPercentage === 100) {
    return (
      <Typography>
        <Tag size="S">{flagEnv.rolloutPercentage}%</Tag> of the audience will
        resolve the <strong>"true"</strong> variant of the flag.
      </Typography>
    );
  }

  if (hasStrategies) {
    if (flagEnv.rolloutPercentage === 0) {
      return (
        <Typography>
          Only the user matching at least one of the following strategies will
          resolve the <strong>"true"</strong> variant of the flag since the
          rollout percentage is <Tag size="S">{flagEnv.rolloutPercentage}%</Tag>
          .
        </Typography>
      );
    }

    return (
      <Typography>
        <Tag size="S">{flagEnv.rolloutPercentage}%</Tag> of the audience AND the
        users matching at least one of the following strategies will resolve the{" "}
        <strong>"true"</strong> variant of the flag.
      </Typography>
    );
  }

  return (
    <Typography>
      <Tag size="S">{flagEnv.rolloutPercentage}%</Tag> of the audience will
      resolve the <strong>"true"</strong> variant of the flag.
    </Typography>
  );
};

const MultiVariantDescription = ({ flagEnv }: StrategyDescriptionProps) => {
  let cumulative = 0;
  const controlVariant = flagEnv.variants.find((variant) => variant.isControl)!;

  const hasOnlyOneVariant = flagEnv.variants.length === 1;

  return (
    <Stack spacing={4}>
      <Ul>
        {flagEnv.variants.map((variant) => {
          cumulative += variant.rolloutPercentage;

          return (
            <Li key={`variant-detail-${variant.uuid}`}>
              <Typography as="span">
                <strong>{variant.rolloutPercentage}%</strong> of the audience
                will receive the <strong>"{variant.value}"</strong> variation
              </Typography>
            </Li>
          );
        })}
      </Ul>

      {cumulative < 100 && controlVariant && !hasOnlyOneVariant && (
        <Typography>
          The sum of the percentage is <strong>{cumulative}%</strong>. People
          that are not in these bounds will receive the{" "}
          <strong>"{controlVariant?.value}"</strong> (the control variant).
        </Typography>
      )}

      {cumulative < 100 && controlVariant && hasOnlyOneVariant && (
        <Typography>
          You only have one variant, which is also the control variant. Every
          user will receive the
          <strong>"{controlVariant?.value}"</strong> value.
        </Typography>
      )}

      {cumulative < 100 && !controlVariant && (
        <Typography>
          The sum of the percentage is <strong>{cumulative}%</strong>. You also
          don't have a "control variant". People that are not in these bounds
          will receive the <strong>"false"</strong> value.
        </Typography>
      )}
    </Stack>
  );
};

export const StrategyDescription = ({
  flagEnv,
  hasStrategies,
}: StrategyDescriptionProps) => {
  const isFlagActivated = flagEnv.status === FlagStatus.ACTIVATED;

  if (!isFlagActivated) {
    return (
      <Typography>
        Nobody will receive the <strong>"true"</strong> variant of the flag:
        it's <Tag size="S">not activated</Tag>
      </Typography>
    );
  }

  if (flagEnv.variants.length > 0) {
    return (
      <MultiVariantDescription
        flagEnv={flagEnv}
        hasStrategies={hasStrategies}
      />
    );
  }

  return (
    <SimpleVariantDescription flagEnv={flagEnv} hasStrategies={hasStrategies} />
  );
};
