import { BsFire } from "react-icons/bs";
import { Button } from "~/components/Buttons/Button";
import { Link } from "~/components/Link";
import { Table, Th, Tbody, Tr, Td } from "~/components/Table";

export interface HotSpotListProps {
  items: Array<{ selectorCount: number; url: string }>;
}

export const HotSpotList = ({ items }: HotSpotListProps) => {
  return (
    <Table>
      <caption className="sr-only">Feature flag list for the project</caption>
      <thead>
        <tr>
          <Th>Page URL</Th>
          <Th>Hot-spots event count</Th>
          <Th>Actions</Th>
        </tr>
      </thead>
      <Tbody>
        {items.map((entry) => (
          <Tr key={entry.url}>
            <Td>
              <Link to={entry.url} target="_blank" rel="noopener noreferrer">
                {entry.url}
              </Link>
            </Td>
            <Td>{entry.selectorCount}</Td>
            <Td>
              <Button
                icon={<BsFire />}
                variant="secondary"
                size="S"
                type="submit"
                form={entry.url}
              >
                See hot zones
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
