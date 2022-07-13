import { HeadersFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { Browser } from "~/components/Browser";
import { AddButton } from "~/components/Buttons/AddButton";
import { Container } from "~/components/Container";
import { Feature } from "~/components/Feature";
import { H1 } from "~/components/H1";
import { Link } from "~/components/Link";
import { Metric } from "~/components/Metric";
import { Spacer } from "~/components/Spacer";
import { Stack } from "~/components/Stack";
import { Switch } from "~/components/Switch";
import { TagLine } from "~/components/Tagline";
import { Typography } from "~/components/Typography";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { MarketingLayout } from "~/layouts/MarketingLayout";
import { styled } from "~/stitches.config";

const ExampleOldPage = styled("div", {
  padding: "$spacing$4",
  border: "1px solid $hover",
});

const ExampleNewPage = styled("div", {
  padding: "$spacing$4",
  border: "1px solid $hover",
  background: "$hover",
  color: "$background",
});

const Centered = styled("div", {
  display: "flex",
  justifyContent: "center",
  textAlign: "center",
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
  fontSize: "$big",
  color: "$title",
  fontFamily: "$default",
  lineHeight: "$content",
});

const MetricWrapper = styled("div", {
  display: "flex",
  gap: "$spacing$4",
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
  const response = await fetch(
    `https://bundlephobia.com/api/size?package=@progressively/react@0.0.1-alpha.6&record=true`
  );

  const data = await response.json();
  const gzip = (data.gzip / 1000).toFixed(2);
  const rawSize = (data.size / 1000).toFixed(2);

  return {
    gzip,
    rawSize,
  };
};

export default function Index() {
  const [showNewHomepage, setShowNewHomepage] = useState(false);
  const { gzip, rawSize } = useLoaderData<LoaderData>();

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

        <InvertedBackground>
          <Container>
            <section aria-labelledby="bundle-size">
              <Feature
                title={<H2 id="bundle-size">Minimal bundle footprint</H2>}
                aside={
                  <div>
                    <MetricWrapper>
                      <Metric label="Minified" value={rawSize} unit="kB" />
                      <Metric
                        label="Minified + Gzipped"
                        value={gzip}
                        unit="kB"
                        highlighted
                      />
                    </MetricWrapper>

                    <Spacer size={3} />

                    <div style={{ textAlign: "center" }}>
                      <VisuallyHidden>{`Numbers for  @progressively/react`}</VisuallyHidden>
                      <TagLine aria-hidden>@progressively/react</TagLine>
                    </div>
                  </div>
                }
              >
                <div>
                  <Typography>
                    {`Progressively's client side SDKs`} aims to be minimal to
                    avoid bloating your client side applications and kill your
                    performances scores.
                  </Typography>

                  <Link href="https://bundlephobia.com/" target="_blank">
                    Numbers from @bundlephobia
                  </Link>
                </div>
              </Feature>
            </section>
          </Container>
        </InvertedBackground>

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
