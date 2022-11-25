import { RawTable, Tr, Th, Td } from "~/components/RawTable";
import { Tag } from "~/components/Tag";
import { stringToColor } from "../misc/utils/stringToColor";

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
            <Td>
              <Tag
                style={{
                  background: stringToColor(hit.variant, 90),
                }}
              >
                {hit.variant}
              </Tag>
            </Td>
            <Td>
              <strong>{hit.count}</strong>
            </Td>
            <Td>
              <Tag variant="SUCCESS">
                {((hit.count / evalCount) * 100).toFixed(2)}%
              </Tag>
            </Td>
          </Tr>
        ))}
      </tbody>
    </RawTable>
  );
};
