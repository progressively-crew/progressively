import { Table, Th, Tbody, Tr, Td } from "~/components/Table";
import { LocalCount } from "../types";
import { NumberValue } from "~/components/NumberValue";
import { Link } from "~/components/Link";
import { Tooltip } from "~/components/Tooltip/Tooltip";

export interface CountTableProps {
  data: Array<LocalCount>;
  caption: string;
  cellName: string;
  shouldLink?: boolean;
}

export const CountTable = ({
  data,
  caption,
  cellName,
  shouldLink,
}: CountTableProps) => {
  return (
    <div className="h-[200px] overflow-y-auto">
      <Table noBorder>
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            <Th>{cellName}</Th>

            <Th>Count</Th>
          </tr>
        </thead>
        <Tbody>
          {data.map((d, index: number) => (
            <Tr key={`${cellName}-${d.name}-${index}`}>
              <Td>
                <div className="truncate w-[200px]">
                  {shouldLink ? (
                    <Tooltip tooltip={d.name}>
                      <Link to={d.name} target="_blank">
                        {d.name}
                      </Link>
                    </Tooltip>
                  ) : (
                    d.name
                  )}
                </div>
              </Td>
              <Td>
                <NumberValue value={d.count} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};
