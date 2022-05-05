import React, { useState } from "react";
import styles from "./styles.module.css";

const Browser = ({ children, isActivated, hasColoredDots }) => {
  let className = styles.content;

  if (isActivated) {
    className += " " + styles.activated;
  }

  const dotStyle = { background: "#ED594A" };

  return (
    <section className={styles.browser}>
      <div className={styles.topbar} aria-hidden>
        <span
          className={styles.dot}
          style={hasColoredDots ? { background: "#ED594A" } : undefined}
        ></span>
        <span
          className={styles.dot}
          style={hasColoredDots ? { background: "#FDD800" } : undefined}
        ></span>
        <span
          className={styles.dot}
          style={hasColoredDots ? { background: "#5AC05A" } : undefined}
        ></span>
      </div>
      <div className={className}>{children}</div>
    </section>
  );
};

export const ExampleFeatureFlag = () => {
  const [activated, setActivated] = useState(false);

  let switchClassName = styles.switch;

  if (activated) {
    switchClassName += " " + styles.activated;
  }

  return (
    <div className={styles.container}>
      <Browser>
        <h3>Progressively dashboard</h3>

        <div className={styles.flag}>
          <span id="homepage">The new homepage feature flag</span>
          <button
            role="switch"
            aria-labelledby="homepage"
            aria-checked={activated}
            borderRadius={32}
            onClick={() => setActivated((s) => !s)}
            className={styles.btn}
          >
            <div>Off</div>
            <div aria-hidden className={switchClassName}></div>
            <div>On</div>
          </button>
        </div>
      </Browser>

      <Browser isActivated={activated} hasColoredDots>
        <h3>Your application</h3>

        {activated ? (
          <p>
            This is the new homepage :D <span aria-hidden>🚀🚀🚀🚀</span>
          </p>
        ) : (
          <p>This is the old homepage :(</p>
        )}
      </Browser>
    </div>
  );
};
