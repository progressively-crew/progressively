import { FormEvent, useState } from "react";
import { Card, CardContent } from "~/components/Card";
import { SearchBar } from "~/components/SearchBar";
import { SectionHeader } from "~/components/Section";
import { CountTable } from "~/modules/projects/components/CountTable";

export interface SearchableCountTableProps {
  data: Array<{ [key: string]: string | number; pageViews: number }>;
  caption: string;
  cellName: string;
  cellKey: string;
  shouldLink?: boolean;
  renderLabel: (d: {
    [key: string]: string | number;
    pageViews: number;
  }) => string;
  title: string;
}

export const SearchableCountTable = ({
  data,
  caption,
  cellName,
  cellKey,
  shouldLink,
  renderLabel,
  title,
}: SearchableCountTableProps) => {
  const [criteria, setCriteria] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const search = formData.get("search")?.toString() || "";
    setCriteria(search);
  };

  const filtered = data.filter((d) => String(d[cellKey]).includes(criteria));

  return (
    <Card>
      <CardContent>
        <SectionHeader
          title={title}
          className="!text-xl"
          action={
            <SearchBar
              onSubmit={handleSubmit}
              placeholder={"Search"}
              label={"Search"}
              count={criteria ? filtered.length : undefined}
              invisibleCount
            />
          }
        />
      </CardContent>
      <CountTable
        data={filtered}
        caption={caption}
        cellName={cellName}
        cellKey={cellKey}
        renderLabel={renderLabel}
        shouldLink={shouldLink}
      />
    </Card>
  );
};
