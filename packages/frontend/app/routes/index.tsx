import {
  HeadersFunction,
  json,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { ProgressivelyProvider } from "@progressively/react";
import { getSSRProps } from "@progressively/react/lib/ssr";
import { Container } from "~/components/Container";
import { H1 } from "~/components/H1";
import { Stack } from "~/components/Stack";
import { Typography } from "~/components/Typography";
import { MarketingLayout } from "~/layouts/MarketingLayout";
import { styled } from "~/stitches.config";
import { useLoaderData } from "@remix-run/react";
import { Heading } from "~/components/Heading";
import { Card } from "~/components/Card";
import { Spacer } from "~/components/Spacer";
import { RolloutExample } from "~/modules/marketing/components/HomeExample/RolloutExample";
import { ExternalLink } from "~/components/ExternalLink";

const TextCenter = styled("div", {
  textAlign: "center",
});

const Centered = styled("div", {
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  flexDirection: "column",
});

const CardGroup = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: "$spacing$8",
});

const CardContent = styled("div", {
  padding: "$spacing$8",
});

const InvertedBackground = styled("div", {
  background: "$apollo",
  padding: "$spacing$16 0",
});

const Background = styled("div", {
  background: "$heracles",
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
                  Deploy your next feature seamlessly to any of your users.
                </Typography>
              </HeadingWrapper>
            </HeroContent>
          </Container>
        </Hero>

        <section aria-labelledby="problems">
          <InvertedBackground>
            <Container>
              <Centered>
                <Stack spacing={4}>
                  <Heading id="problems" fontSize="saturn">
                    What problem does it solve?
                  </Heading>

                  <Typography>
                    Let us say that you have built a brand new login page, but
                    you are not 100% confident to show it to your millions of
                    users, <strong>all at once</strong>.
                  </Typography>

                  <Typography>
                    What if, instead, you could show this new login page to only{" "}
                    <strong>a subset of your users</strong>, and progressively
                    show it to more users?
                  </Typography>

                  <Typography>
                    Progressively is a feature flag solutions that solves
                    exactly this.
                  </Typography>
                </Stack>

                <Spacer size={8} />

                <RolloutExample />
              </Centered>
            </Container>
          </InvertedBackground>
        </section>

        <section aria-labelledby="difference">
          <Background>
            <Container>
              <Centered>
                <div>
                  <Heading id="difference" fontSize="saturn">
                    Why is it different?
                  </Heading>

                  <Spacer size={6} />

                  <CardGroup>
                    <Card>
                      <CardContent>
                        <Typography font="title" size="mars">
                          Lightweight SDKs
                        </Typography>
                        <Typography>
                          Progressively is smaller than its competitors (1kB for
                          the React SDK).
                        </Typography>

                        <Spacer size={3} />

                        <TextCenter>
                          <ExternalLink href="https://github.com/progressively-crew/progressively/tree/master/example/bundle-diffs">
                            See alternatives comparisons
                          </ExternalLink>
                        </TextCenter>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent>
                        <Typography font="title" size="mars">
                          Accessible
                        </Typography>

                        <Typography>
                          Progressively has an accessible dashboard. If you face
                          issues, please, tell us.
                        </Typography>

                        <Spacer size={3} />

                        <TextCenter>
                          <ExternalLink href="https://github.com/progressively-crew/progressively/issues">
                            Create an accessibility issue
                          </ExternalLink>
                        </TextCenter>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent>
                        <Typography font="title" size="mars">
                          SSR friendly
                        </Typography>

                        <Spacer size={3} />

                        <Typography>
                          Progressively comes with built-in SSR support so that
                          the page {"don't"} blink when resolving the flags
                        </Typography>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent>
                        <Typography font="title" size="mars">
                          Real-time
                        </Typography>

                        <Spacer size={3} />

                        <Typography>
                          Real-time propagation with Websockets
                        </Typography>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent>
                        <Typography font="title" size="mars">
                          No tracking
                        </Typography>

                        <Spacer size={3} />

                        <Typography>
                          No intrusive tracking, we only get data from flags
                          evaluations for insights purpose. We also use
                          Sentry.io for error tracking.
                        </Typography>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent>
                        <Typography font="title" size="mars">
                          Self hosted
                        </Typography>

                        <Spacer size={3} />

                        <Typography>
                          Self-hosted so that you own the data
                        </Typography>
                      </CardContent>
                    </Card>
                  </CardGroup>
                </div>
              </Centered>
            </Container>
          </Background>
        </section>
      </MarketingLayout>
    </ProgressivelyProvider>
  );
}
