import { styled } from "~/stitches.config";

export interface FeatureProps {
  children: React.ReactNode;
  aside: React.ReactNode;
  title: React.ReactNode;
}

const Wrapper = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "$spacing$4",

  "@mobile": {
    flexDirection: "column",
  },
});

const AsideWrapper = styled("div", {
  flexShrink: "0",
});

export const Feature = ({ title, children, aside }: FeatureProps) => {
  return (
    <Wrapper>
      <div>
        {title}
        {children}
      </div>
      <AsideWrapper>{aside}</AsideWrapper>
    </Wrapper>
  );
};
