import { styled } from "~/stitches.config";

export const Card = styled("div", {
  display: "flex",
  flexDirection: "column",
  background: "$apollo",
  borderRadius: "$borderRadius$regular",
  boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
  overflow: "hidden",
});

const GradientBorderedCardWrapper = styled("div", {
  borderRadius: "$borderRadius$regular",
  boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
  overflow: "hidden",
  background: "$nike",
  padding: "$spacing$1",
});

const GradientBorderedCardInner = styled("div", {
  background: "$apollo",
  display: "flex",
  justifyContent: "center",
  textAlign: "center",
});

export interface GradientBorderedCardProps {
  children: React.ReactNode;
}

export const GradientBorderedCard = ({
  children,
}: GradientBorderedCardProps) => {
  return (
    <GradientBorderedCardWrapper>
      <GradientBorderedCardInner>{children}</GradientBorderedCardInner>
    </GradientBorderedCardWrapper>
  );
};

export const CardContent = styled("div", {
  padding: "$spacing$12",
});
