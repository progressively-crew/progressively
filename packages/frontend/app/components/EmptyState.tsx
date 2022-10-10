import { styled } from "~/stitches.config";
import { Heading } from "./Heading";
import { EmptyBoxIcon } from "./Icons/EmptyBoxIcon";
import { Spacer } from "./Spacer";
import { Stack } from "./Stack";

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

      <Stack spacing={2}>
        <Heading
          as={titleAs}
          fontSize={{ "@initial": "earth", "@tablet": "mars" }}
          id={id}
        >
          {title}
        </Heading>

        <DescriptionWrapper>{description}</DescriptionWrapper>

        <div>{action}</div>
      </Stack>
    </Wrapper>
  );
};
