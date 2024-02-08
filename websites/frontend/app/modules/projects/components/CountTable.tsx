import { Table, Th, Tbody, Td } from "~/components/Table";
import { LocalCount } from "../../environments/types";
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
  const max = data.reduce(
    (currMax, curr) => (currMax < curr.count ? curr.count : currMax),
    0
  );

  return (
    <div className="h-[200px] overflow-y-auto">
      <Table noBorder>
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            <Th>{cellName}</Th>

            <Th>
              <div className="text-right">Count</div>
            </Th>
          </tr>
        </thead>
        <Tbody>
          {data.map((d, index: number) => {
            const width = `${(d.count / max) * 100}%`;

            return (
              <tr key={`${cellName}-${d.name}-${index}`}>
                <Td>
                  <div className="relative flex items-center">
                    <div className="truncate w-[200px] relative z-10">
                      {shouldLink ? (
                        <Tooltip tooltip={d.name}>
                          <Link
                            to={d.name}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {d.name}
                          </Link>
                        </Tooltip>
                      ) : (
                        d.name
                      )}
                    </div>
                    <div
                      className="absolute h-8 bg-slate-100 rounded -ml-6"
                      style={{ width }}
                    />
                  </div>
                </Td>
                <Td>
                  <div className="text-right font-bold">
                    <NumberValue value={d.count} />
                  </div>
                </Td>
              </tr>
            );
          })}
        </Tbody>
      </Table>
    </div>
  );
};
