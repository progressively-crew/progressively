import { RawTable } from "../RawTable";
import { TagLine } from "../Tagline";

export interface TableChartProps {
  items: Array<{ date: string } & { [key: string]: number | string }>;
  dateFormatter: (date: string) => string;
}
// This is useful for people that can't read a chart and want to access the data another way
export const TableChart = ({ items, dateFormatter }: TableChartProps) => {
  // Assuming there's always at least one item, handling the TableChart visibility takes
  // place in the parent
  const firstItem = items[0];
  const headings = Object.keys(firstItem);

  return (
    <RawTable>
      <thead>
        <tr>
          {headings.map((heading, index: number) => (
            <th key={`${heading}-${index}`}>
              <TagLine as="span">{heading}</TagLine>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item, index: number) => (
          <tr key={`row-${index}`}>
            {headings.map((key, yndex: number) => {
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
