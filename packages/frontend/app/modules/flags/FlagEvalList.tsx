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
    <RawTable caption="Flag evaluation list">
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
              <span className="flex flex-row gap-3 items-center">
                <span
                  aria-hidden
                  style={{ background: stringToColor(hit.variant, 75) }}
                  className="h-4 w-4 block rounded"
                />
                {hit.variant}
              </span>
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
