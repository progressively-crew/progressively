import { styled, keyframes } from "~/stitches.config";
import { Heading } from "./Heading";
import { EmptyBoxIcon } from "./Icons/EmptyBoxIcon";
import { Spacer } from "./Spacer";

const shake = keyframes({
  "10%, 90%": {
    transform: "translate3d(-1px, 0, 0)",
  },

  "20%, 80%": {
    transform: "translate3d(2px, 0, 0)",
  },

  "30%, 50%, 70%": {
    transform: "translate3d(-4px, 0, 0)",
  },

  "40%, 60%": {
    transform: "translate3d(4px, 0, 0)",
  },
});

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

  "& .action": {
    animation: `${shake} 0.82s cubic-bezier(.36,.07,.19,.97) both`,
    "@media (prefers-reduced-motion: reduce)": {
      animation: "unset",
    },
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

      {action && <div className="action">{action}</div>}
    </Wrapper>
  );
};
