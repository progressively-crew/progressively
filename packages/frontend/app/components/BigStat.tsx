import { Box, Stat, StatLabel, StatNumber } from "@chakra-ui/react";

export interface BigStateProps {
  value: string | number;
  name: string;
  color: string;
  dotted?: boolean;
}

export const BigState = ({ name, value, color, dotted }: BigStateProps) => {
  return (
    <Box
      borderLeftWidth={4}
      borderBottomWidth={4}
      borderLeftColor={color}
      borderBottomColor={color}
      borderLeftStyle={dotted ? "dotted" : "solid"}
      borderBottomStyle={dotted ? "dotted" : "solid"}
      pl={3}
      pb={3}
    >
      <Stat>
        <StatLabel fontSize="xl" textColor="textlight" fontWeight="normal">
          {name}
        </StatLabel>
        <StatNumber fontSize="3xl">{value}</StatNumber>
      </Stat>
    </Box>
  );
};
