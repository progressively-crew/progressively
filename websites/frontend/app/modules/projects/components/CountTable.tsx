import { Table, Th, Tbody, Td } from "~/components/Table";
import { NumberValue } from "~/components/NumberValue";
import { Link } from "~/components/Link";
import { Tooltip } from "~/components/Tooltip/Tooltip";

export interface CountTableProps {
  data: Array<{ [key: string]: string | number; pageViews: number }>;
  caption: string;
  cellName: string;
  cellKey: string;
  shouldLink?: boolean;
  renderLabel: (d: {
    [key: string]: string | number;
    pageViews: number;
  }) => string;
}

export const CountTable = ({
  data,
  caption,
  cellName,
  shouldLink,
  renderLabel,
  cellKey,
}: CountTableProps) => {
  const max = data.reduce(
    (currMax, curr) => (currMax < curr.pageViews ? curr.pageViews : currMax),
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
            const width = `${(d.pageViews / max) * 100}%`;

            return (
              <tr key={`${cellName}-${cellKey}-${index}`}>
                <Td>
                  <div className="relative flex items-center">
                    <div className="truncate w-[200px] relative z-10 text-slate-900">
                      {shouldLink ? (
                        <Tooltip tooltip={d[cellKey]}>
                          <Link
                            to={d[cellKey]}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {renderLabel(d)}
                          </Link>
                        </Tooltip>
                      ) : (
                        renderLabel(d)
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
                    <NumberValue value={d.pageViews} />
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
