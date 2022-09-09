import { HStack } from "./HStack";
import { Spacer } from "./Spacer";
import { Stack } from "./Stack";
import { Typography } from "./Typography";

export interface PageTitleProps {
  value: string;
  icon: React.ReactNode;
  action?: React.ReactNode;
  description?: React.ReactNode;
}

export const PageTitle = ({ value, icon, action, description }: PageTitleProps) => {
  return (
    <div>
      <HStack justifyContent="space-between">
        <Stack spacing={0}>
          <Typography
            size="mercury"
            font="title"
            color="hades"
            fontWeight="semiBold"
            lineHeight="title"
            as="h2"
          >
            <HStack spacing={3}>
              <span aria-hidden>{icon}</span>
              <span>{value}</span>
            </HStack>
          </Typography>
          {description}
        </Stack>

        <div>{action}</div>
      </HStack>

      <Spacer size={4} />
    </div>
  );
};
