import { Table, Th, Tbody, Tr, Td } from "~/components/Table";
import { LocalCount } from "../types";

export interface CountTableProps {
  data: Array<LocalCount>;
  caption: string;
  cellName: string;
}

export const CountTable = ({ data, caption, cellName }: CountTableProps) => {
  return (
    <Table noBorder>
      <caption className="sr-only">{caption}</caption>
      <thead>
        <tr>
          <Th>{cellName}</Th>

          <Th>Count</Th>
        </tr>
      </thead>
      <Tbody>
        {data.map((d) => (
          <Tr key={d.name}>
            <Td style={{ width: 40 }}>{d.name}</Td>
            <Td>{d.count}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
