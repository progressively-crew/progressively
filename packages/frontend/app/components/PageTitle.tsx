import { H1 } from "./H1";
import { HStack } from "./HStack";
import { Spacer } from "./Spacer";
import { Stack } from "./Stack";

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
          <H1 as="h2">
            <HStack spacing={3}>
              <span aria-hidden>{icon}</span>
              <span>{value}</span>
            </HStack>
          </H1>
          {description}
        </Stack>

        <div>{action}</div>
      </HStack>

      <Spacer size={4} />
    </div>
  );
};
