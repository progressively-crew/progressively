import { Typography } from "./Typography";
import { HStack } from "./HStack";

export interface TagLineProps {
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const TagLine = ({ icon, children }: TagLineProps) => {
  return (
    <div className="text-sm text-indigo-700">
      <HStack spacing={1}>
        {icon && <span aria-hidden>{icon}</span>}
        <Typography>{children}</Typography>
      </HStack>
    </div>
  );
};
