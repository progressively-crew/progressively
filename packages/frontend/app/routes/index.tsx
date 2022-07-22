import { HeadersFunction, MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { Browser } from "~/components/Browser";
import { AddButton } from "~/components/Buttons/AddButton";
import { Container } from "~/components/Container";
import { ExternalLink } from "~/components/ExternalLink";
import { H1 } from "~/components/H1";
import { Metric } from "~/components/Metric";
import { Spacer } from "~/components/Spacer";
import { Stack } from "~/components/Stack";
import { Switch } from "~/components/Switch";
import { Typography } from "~/components/Typography";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { MarketingLayout } from "~/layouts/MarketingLayout";
import { styled } from "~/stitches.config";
import bundleSize from "../progressively-sdk-sizes.json";

const ExampleOldPage = styled("div", {
  padding: "$spacing$4",
  border: "1px solid $secondary",
});

const ExampleNewPage = styled("div", {
  padding: "$spacing$4",
  border: "1px solid $secondary",
  background: "$secondary",
  color: "$background",
});

const Centered = styled("div", {
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  flexDirection: "column",
});

const InvertedBackground = styled("div", {
  background: "$backgroundAccent",
  padding: "$spacing$16 0",
});

const Hero = styled("div", {
  display: "flex",
  gap: "$spacing$8",
  padding: "$spacing$16 0",
  alignItems: "center",

  "@mobile": {
    flexDirection: "column",
  },
});

const HeadingWrapper = styled("div", {
  maxWidth: "600px",
});

const H2 = styled("h2", {
  fontSize: "$saturn",
  color: "$textAccent",
  fontFamily: "$default",
  lineHeight: "$text",
});

const MetricWrapper = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "$spacing$4",

  "@tablet": {
    gridTemplateColumns: "1fr",
  },
});

export interface LoaderData {
  gzip: string;
  rawSize: string;
  progressivelyProps: any;
}

export const meta: MetaFunction = () => {
  return {
    title: "Progressively | Homepage",
  };
};

export const headers: HeadersFunction = () => {
  return {
    "Cache-Control": "max-age=300, s-maxage=300, stale-while-revalidate",
  };
};

export default function Index() {
  const [showNewHomepage, setShowNewHomepage] = useState(false);
  bundleSize.sort((a, b) => a.gzip - b.gzip);

  const packages = bundleSize.map((packageData) => {
    const gzip = (packageData.gzip / 1000).toFixed(2);
    const size = (packageData.size / 1000).toFixed(2);
    return { ...packageData, gzip, size };
  });

  return (
    <MarketingLayout>
      <Spacer size={16} />

      <Stack spacing={16}>
        <Container>
          <Hero>
            <HeadingWrapper>
              <H1>Feature flags service that does not kill performances</H1>
              <Typography>
                Progressively provides simple solutions for feature flagging and
                A/B testing with an accessible dashboard, lightweight browser
                SDKs — and it respects your privacy.
              </Typography>
            </HeadingWrapper>

            <section aria-labelledby="example" style={{ width: "100%" }}>
              <VisuallyHidden id="example">
                Example of how feature flags work
              </VisuallyHidden>

              <Browser>
                <div aria-live="polite">
                  {showNewHomepage ? (
                    <ExampleNewPage>
                      <p>This is the new home page!</p>
                    </ExampleNewPage>
                  ) : (
                    <ExampleOldPage>
                      <p>
                        This is an old page. {`Let's switch to the new page`}
                      </p>
                    </ExampleOldPage>
                  )}
                </div>

                <Spacer size={4} />

                <Switch
                  label="Switch to the new homepage"
                  type="button"
                  checked={showNewHomepage}
                  onClick={() => setShowNewHomepage((s) => !s)}
                />
              </Browser>
            </section>
          </Hero>
        </Container>

        <section aria-labelledby="bundle-size">
          <InvertedBackground>
            <Container>
              <Centered>
                <H2 id="bundle-size">Minimal bundle footprint</H2>
                <Typography>
                  {`Progressively's client side SDKs`} aims to be minimal to
                  avoid bloating your client applications and kill your
                  performances.
                </Typography>

                <Spacer size={8} />

                <MetricWrapper>
                  {packages.map((p, index) => (
                    <Metric
                      key={p.package}
                      label={p.package}
                      value={p.gzip}
                      unit="kB"
                      highlighted={index === 0}
                    />
                  ))}
                </MetricWrapper>

                <Spacer size={8} />

                <Typography>
                  And if you {`don't`} trust{" "}
                  <ExternalLink href="https://bundlephobia.com/">{`@bundlephobia's`}</ExternalLink>{" "}
                  numbers that much, check{" "}
                  <ExternalLink href="https://github.com/progressively-crew/progressively/tree/master/example/bundle-diffs">
                    this Nextjs project
                  </ExternalLink>{" "}
                  running bundle analyzer against the different tools.
                </Typography>
              </Centered>
            </Container>
          </InvertedBackground>
        </section>

        <section aria-labelledby="privacy">
          <Container>
            <Centered>
              <div>
                <H2 id="privacy">People is what matters</H2>
                <Typography>
                  We do not keep information about your users. Progressively
                  only records the flag and A/B variant resolution to give you
                  insights on what is going on. We do not track the user
                  journey, neither get analytics.
                </Typography>
                <Spacer size={8} />
                <Typography>
                  Also, if you find your experience to be inconsistent or not
                  accessible, please, let us know so that we can improve the
                  tool.
                </Typography>

                <Spacer size={8} />

                <AddButton
                  href="https://github.com/progressively-crew/progressively/issues"
                  target="_blank"
                >
                  Create a Github issue
                </AddButton>
              </div>
            </Centered>
          </Container>
        </section>

        <Spacer size={16} />
      </Stack>
    </MarketingLayout>
  );
}
