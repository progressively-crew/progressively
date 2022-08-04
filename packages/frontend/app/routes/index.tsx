import {
  HeadersFunction,
  json,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { ProgressivelyProvider } from "@progressively/react";
import { getSSRProps } from "@progressively/react/lib/ssr";
import { AddButton } from "~/components/Buttons/AddButton";
import { Container } from "~/components/Container";
import { ExternalLink } from "~/components/ExternalLink";
import { H1 } from "~/components/H1";
import { Metric } from "~/components/Metric";
import { Spacer } from "~/components/Spacer";
import { Stack } from "~/components/Stack";
import { Typography } from "~/components/Typography";
import { MarketingLayout } from "~/layouts/MarketingLayout";
import bundleSize from "../progressively-sdk-sizes.json";
import { useLoaderData } from "@remix-run/react";

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

  bundleSize.sort((a, b) => a.gzip - b.gzip);

  const packages = bundleSize.map((packageData) => {
    const gzip = (packageData.gzip / 1000).toFixed(2);
    const size = (packageData.size / 1000).toFixed(2);
    return { ...packageData, gzip, size };
  });

  return (
    <ProgressivelyProvider {...progressivelyProps}>
      <MarketingLayout>
        <Spacer size={16} />

        <Stack>
          <Container>
            <div>
              <div>
                <H1>Feature flags service that does not kill performances</H1>
                <Typography>
                  Progressively provides simple solutions for feature flagging
                  and A/B testing with an accessible dashboard, lightweight
                  browser SDKs — and it respects your privacy.
                </Typography>
              </div>
            </div>
          </Container>

          <section aria-labelledby="bundle-size">
            <div>
              <Container>
                <div>
                  <h2 id="bundle-size">Minimal bundle footprint</h2>
                  <Typography>
                    {`Progressively's client side SDKs`} aims to be minimal to
                    avoid bloating your client applications and kill your
                    performances.
                  </Typography>

                  <Spacer size={8} />

                  <div>
                    {packages.map((p) => (
                      <Metric
                        key={p.package}
                        label={p.package}
                        value={p.gzip}
                        unit="kB"
                      />
                    ))}
                  </div>

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
                </div>
              </Container>
            </div>
          </section>

          <section aria-labelledby="privacy">
            <Container>
              <div>
                <div>
                  <h2 id="privacy">People is what matters</h2>
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
              </div>
            </Container>
          </section>

          <Spacer size={16} />
        </Stack>
      </MarketingLayout>
    </ProgressivelyProvider>
  );
}
