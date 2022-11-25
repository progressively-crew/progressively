import { RawTable, Tr, Th, Td } from "~/components/RawTable";

interface FlagHit {
  variant: string;
  count: number;
}

export interface FlagEvalListProps {
  items: Array<FlagHit>;
  evalCount: number;
}

export const FlagEvalList = ({ items, evalCount }: FlagEvalListProps) => {
  return (
    <RawTable>
      <thead>
        <Tr>
          <Th>Value</Th>
          <Th>Eval count</Th>
          <Th>Ratio</Th>
        </Tr>
      </thead>
      <tbody>
        {items.map((hit) => (
          <Tr key={hit.variant}>
            <Td>{hit.variant}</Td>
            <Td>{hit.count}</Td>
            <Td> {((hit.count / evalCount) * 100).toFixed(2)}%</Td>
          </Tr>
        ))}
      </tbody>
    </RawTable>
  );
};
