import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "Lightweight",
    Svg: require("@site/static/img/rocket.svg").default,
    description: (
      <>
        Progressively provides lightweight SDKs so that your websites and
        applications don't suffer from performance issues. <br />
        <br />
        <div
          style={{
            display: "flex",
          }}
        >
          <span style={{ fontSize: "10px", textTransform: "uppercase" }}>
            React SDK:{" "}
            <img
              src="https://img.shields.io/bundlephobia/minzip/@progressively/react"
              alt="React SDK minified and gzipped size"
            />
          </span>
          <span style={{ fontSize: "10px", textTransform: "uppercase" }}>
            JavaScript SDK:{" "}
            <img
              src="https://img.shields.io/bundlephobia/minzip/@progressively/sdk-js"
              alt="JS SDK minified and gzipped size"
            />
          </span>
        </div>
      </>
    ),
  },
  {
    title: "Accessible",
    Svg: require("@site/static/img/a11y.svg").default,
    description: (
      <>
        Progressively's dashboard has been built with accessibility in mind and
        will always be. We won't make tradeoffs impacting negatively our users.
      </>
    ),
  },
  {
    title: "Zero tracking",
    Svg: require("@site/static/img/eye-crossed.svg").default,
    description: (
      <>
        Progressively does not track anything related to users activities. The
        only metric that we get are the flag hits so that we can provide
        insights and charts about the impact of a flag switch.
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" style={{ height: 88 }} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
