import { styled } from "~/stitches.config";

const GithubLinkWrapper = styled("a", {
  display: "inline-flex",
  fontSize: "$content",
  color: "$content",
  fontFamily: "$default",
  height: "$cta",
  alignItems: "center",
});

export const GithubLink = () => {
  return (
    <GithubLinkWrapper
      href="https://github.com/progressively-crew/progressively"
      target="_blank"
    >
      Github
    </GithubLinkWrapper>
  );
};
