import { Stat, StatLabel, StatNumber } from "@chakra-ui/react";

export interface BigStateProps {
  value: string | number;
  name: string;
  color: string;
  dotted?: boolean;
}

export const BigState = ({ name, value, color, dotted }: BigStateProps) => {
  return (
    <Stat>
      <StatLabel fontSize="xl" textColor="textlight" fontWeight="normal">
        {name}
      </StatLabel>
      <StatNumber fontSize="3xl">{value}</StatNumber>
    </Stat>
  );
};
