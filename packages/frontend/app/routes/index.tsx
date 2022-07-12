import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { H1 } from "~/components/H1";
import { Spacer } from "~/components/Spacer";
import { Typography } from "~/components/Typography";
import { MarketingLayout } from "~/layouts/MarketingLayout";
import { styled } from "~/stitches.config";
import reactJson from "../../../react/package.json";

const HeadingWrapper = styled("div", {
  maxWidth: "600px",
});

const H2 = styled("h2", {
  fontSize: "$h2",
  color: "$title",
  fontFamily: "$default",
});

export interface LoaderData {
  gzip: string;
  rawSize: string;
}

export const loader: LoaderFunction = async () => {
  const response = await fetch(
    `https://bundlephobia.com/api/size?package=@progressively/react@${reactJson.version}&record=true`
  );

  const data = await response.json();
  const gzip = `${(data.gzip / 1000).toFixed(2)}kb`;
  const rawSize = `${(data.size / 1000).toFixed(2)}kb`;

  return { gzip, rawSize };
};

export default function Index() {
  const data = useLoaderData<LoaderData>();

  return (
    <MarketingLayout>
      <Spacer size={10} />
      <HeadingWrapper>
        <H1>Feature flags service that does not kill performances</H1>
        <Typography>
          Progressively provides simple solutions for feature flagging and A/B
          testing with an accessible dashboard, lightweight browser SDKs — and
          it respects your privacy.
        </Typography>
      </HeadingWrapper>

      <section aria-labelledby="bundle-size">
        <H2 id="bundle-size">This is it, really</H2>
        <Typography>{data.gzip}</Typography>
        <Typography>{data.rawSize}</Typography>
      </section>

      <section aria-labelledby="privacy">
        <H2 id="privacy">People is what matters</H2>
        <Typography>
          We do not keep information about your users. Progressively only
          records the flag and A/B variant resolution to give you insights on
          what is going on. We do not track the user journey, neither get
          analytics.
        </Typography>
      </section>
    </MarketingLayout>
  );
}
