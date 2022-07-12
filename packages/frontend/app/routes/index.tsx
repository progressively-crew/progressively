import { H1 } from "~/components/H1";
import { Spacer } from "~/components/Spacer";
import { Typography } from "~/components/Typography";
import { MarketingLayout } from "~/layouts/MarketingLayout";
import { styled } from "~/stitches.config";

const HeadingWrapper = styled("div", {
  maxWidth: "600px",
});

export default function Index() {
  return (
    <MarketingLayout>
      <Spacer size={10} />
      <HeadingWrapper>
        <H1>Feature flags service that does not kill performances</H1>
        <Typography>
          Progressively provides simple solutions for Feature Flags and A/B
          testing with an accessible dashboard, lightweight browser SDKs — and
          it respects your privacy.
        </Typography>
      </HeadingWrapper>
    </MarketingLayout>
  );
}
