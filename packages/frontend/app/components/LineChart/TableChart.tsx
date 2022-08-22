import { RawTable } from "../RawTable";

export interface TableChartProps {
  items: Array<{ date: string } & { [key: string]: number | string }>;
  dateFormatter: (date: string) => string;
  labelledBy: string;
  headers: Array<{ key: string; label?: string }>;
}
// This is useful for people that can't read a chart and want to access the data another way
export const TableChart = ({
  items,
  dateFormatter,
  labelledBy,
  headers,
}: TableChartProps) => {
  return (
    <RawTable aria-labelledby={labelledBy}>
      <thead>
        <tr>
          <th>Date</th>
          {headers.map((heading, index: number) => (
            <th key={`${heading.key}-${index}`}>
              {heading.label || heading.key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item, index: number) => (
          <tr key={`row-${index}`}>
            <td>{dateFormatter(item.date)}</td>

            {headers.map(({ key }, yndex: number) => {
              const itemValue = item[key];

              const formatedData =
                key === "date" ? dateFormatter(itemValue as string) : itemValue;

              return <td key={`col-${yndex}-${index}`}>{formatedData}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </RawTable>
  );
};
