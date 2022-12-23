import { RawTable, Tr, Th, Td } from "~/components/RawTable";
import { Tag } from "~/components/Tag";
import { stringToColor } from "../misc/utils/stringToColor";
interface FlagEvaluation {
  valueResolved: string;
  _count: number;
}

export interface FlagEvalListProps {
  items: Array<FlagEvaluation>;
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
          <Tr key={hit.valueResolved}>
            <Td>
              <span className="flex flex-row gap-3 items-center">
                <span
                  aria-hidden
                  style={{ background: stringToColor(hit.valueResolved, 75) }}
                  className="h-4 w-4 block rounded"
                />
                {hit.valueResolved}
              </span>
            </Td>
            <Td>
              <strong>{hit._count}</strong>
            </Td>
            <Td>
              <Tag variant="SUCCESS">
                {((hit._count / evalCount) * 100).toFixed(2)}%
              </Tag>
            </Td>
          </Tr>
        ))}
      </tbody>
    </RawTable>
  );
};
