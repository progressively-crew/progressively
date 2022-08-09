import {
  HeadersFunction,
  json,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { useState } from "react";
import { ProgressivelyProvider } from "@progressively/react";
import { getSSRProps } from "@progressively/react/lib/ssr";
import { Browser } from "~/components/Browser";
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
import { useLoaderData } from "@remix-run/react";
import { CreateButton } from "~/components/Buttons/CreateButton";
import { Heading } from "~/components/Heading";
import { HStack } from "~/components/HStack";

const ExampleOldPage = styled("div", {
  padding: "$spacing$4",
  border: "1px solid $tyche",
});

const ExampleNewPage = styled("div", {
  padding: "$spacing$4",
  border: "1px solid $tyche",
  background: "$tyche",
  color: "$heracles",
});

const Centered = styled("div", {
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  flexDirection: "column",
});

const InvertedBackground = styled("div", {
  background: "$apollo",
  padding: "$spacing$16 0",
});

const Hero = styled("div", {
  background: "$nike",
  height: "600px",
  display: "flex",
  alignItems: "center",

  "@mobile": {
    flexDirection: "column",
  },
});

const HeroContent = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "$spacing$21",
});

const HeadingWrapper = styled("div", {
  maxWidth: "600px",
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

export const loader: LoaderFunction = async () => {
  const { ssrProps, cookies } = await getSSRProps(
    "37c15cf9-3625-4516-9080-74931ed639d4"
  );

  return json(
    { progressivelyProps: ssrProps },
    { headers: { "Set-Cookie": cookies || "" } }
  );
};

export default function Index() {
  const { progressivelyProps } = useLoaderData();
  const [showNewHomepage, setShowNewHomepage] = useState(false);
  bundleSize.sort((a, b) => a.gzip - b.gzip);

  const packages = bundleSize.map((packageData) => {
    const gzip = (packageData.gzip / 1000).toFixed(2);
    const size = (packageData.size / 1000).toFixed(2);
    return { ...packageData, gzip, size };
  });

  return (
    <ProgressivelyProvider {...progressivelyProps}>
      <MarketingLayout>
        <Hero>
          <Container>
            <HeroContent>
              <HeadingWrapper>
                <H1 color="heracles">
                  Rollout quickly, effectively, progressively
                </H1>
                <Typography color="heracles">
                  Progressively provides simple solutions for feature flagging
                  and A/B testing with an accessible dashboard, lightweight
                  browser SDKs — and it respects your privacy.
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
            </HeroContent>
          </Container>
        </Hero>
        <Stack spacing={16}>
          <section aria-labelledby="bundle-size">
            <InvertedBackground>
              <Container>
                <Centered>
                  <Heading id="bundle-size" fontSize="saturn">
                    Minimal bundle footprint
                  </Heading>
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
                  <Heading id="privacy" fontSize="saturn">
                    People is what matters
                  </Heading>
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

                  <CreateButton
                    href="https://github.com/progressively-crew/progressively/issues"
                    target="_blank"
                  >
                    Create a Github issue
                  </CreateButton>
                </div>
              </Centered>
            </Container>
          </section>

          <Spacer size={16} />
        </Stack>
      </MarketingLayout>
    </ProgressivelyProvider>
  );
}
