import { styled } from "~/stitches.config";
import { Heading } from "./Heading";
import { EmptyBoxIcon } from "./Icons/EmptyBoxIcon";
import { Spacer } from "./Spacer";

const Wrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "$spacing$6 0",
  textAlign: "center",

  "& .empty-box-icon": {
    height: "$emptyStateIconHeight",
    fill: "$nemesis",
  },

  "@mobile": {
    "& .empty-box-icon": {
      height: "$emptyStateIconHeightMobile",
    },
  },
});

export interface EmptyStateProps {
  title: string;
  description: React.ReactNode;
  titleAs?: string;
  id?: string;
  action?: React.ReactNode;
}

const DescriptionWrapper = styled("div", {
  "& p": {
    color: "$hadesLight",
  },
});

export const EmptyState = ({
  title,
  description,
  titleAs = "h3",
  id,
  action,
}: EmptyStateProps) => {
  return (
    <Wrapper>
      <EmptyBoxIcon />

      <Spacer size={6} />

      <Heading
        as={titleAs}
        fontSize={{ "@initial": "earth", "@tablet": "mars" }}
        id={id}
      >
        {title}
      </Heading>

      <Spacer size={2} />

      <DescriptionWrapper>{description}</DescriptionWrapper>

      <Spacer size={2} />

      <div>{action}</div>
    </Wrapper>
  );
};
