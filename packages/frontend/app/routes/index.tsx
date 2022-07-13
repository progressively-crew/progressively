import { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { AddButton } from "~/components/Buttons/AddButton";
import { Container } from "~/components/Container";
import { Feature } from "~/components/Feature";
import { H1 } from "~/components/H1";
import { Link } from "~/components/Link";
import { Metric } from "~/components/Metric";
import { Spacer } from "~/components/Spacer";
import { Stack } from "~/components/Stack";
import { TagLine } from "~/components/Tagline";
import { Typography } from "~/components/Typography";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { MarketingLayout } from "~/layouts/MarketingLayout";
import { styled } from "~/stitches.config";
import reactJson from "../../../react/package.json";

const Centered = styled("div", {
  display: "flex",
  justifyContent: "center",
  textAlign: "center",
});

const InvertedBackground = styled("div", {
  background: "$backgroundAccent",
  padding: "$spacing$16 0",
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
  reactSdkVersion: string;
  packageName: string;
}

export const meta: MetaFunction = () => {
  return {
    title: "Progressively | Homepage",
  };
};

export const loader: LoaderFunction = async () => {
  const response = await fetch(
    `https://bundlephobia.com/api/size?package=@progressively/react@${reactJson.version}&record=true`
  );

  const data = await response.json();
  const gzip = (data.gzip / 1000).toFixed(2);
  const rawSize = (data.size / 1000).toFixed(2);

  return {
    gzip,
    rawSize,
    reactSdkVersion: reactJson.version,
    packageName: reactJson.name,
  };
};

export default function Index() {
  const { gzip, rawSize, packageName, reactSdkVersion } =
    useLoaderData<LoaderData>();

  return (
    <MarketingLayout>
      <Spacer size={16} />

      <Stack spacing={16}>
        <Container>
          <HeadingWrapper>
            <H1>Feature flags service that does not kill performances</H1>
            <Typography>
              Progressively provides simple solutions for feature flagging and
              A/B testing with an accessible dashboard, lightweight browser SDKs
              — and it respects your privacy.
            </Typography>
          </HeadingWrapper>
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
                      <VisuallyHidden>{`Numbers for ${packageName} v${reactSdkVersion}`}</VisuallyHidden>
                      <TagLine aria-hidden>
                        {packageName} v{reactSdkVersion}
                      </TagLine>
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
          <Centered>
            <div>
              <H2 id="privacy">People is what matters</H2>
              <Typography>
                We do not keep information about your users. Progressively only
                records the flag and A/B variant resolution to give you insights
                on what is going on. We do not track the user journey, neither
                get analytics.
              </Typography>
              <Spacer size={8} />
              <Typography>
                Also, if you find your experience to be inconsistent or not
                accessible, please, let us know so that we can improve the tool.
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
        </section>
      </Stack>
    </MarketingLayout>
  );
}
