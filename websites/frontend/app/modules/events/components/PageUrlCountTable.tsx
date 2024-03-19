import { Form } from "@remix-run/react";
import { LuInspect } from "react-icons/lu";
import { IconButton } from "~/components/Buttons/IconButton";
import { CountTable } from "~/modules/projects/components/CountTable";

export interface PageUrlCountTableProps {
  data: Array<{ [key: string]: string | number; pageViews: number }>;
}

export const PageUrlCountTable = ({ data }: PageUrlCountTableProps) => {
  return (
    <CountTable
      shouldLink
      data={data}
      caption="Page views / URL"
      cellName={"Page URL"}
      cellKey="url"
      renderLabel={(d) => String(d.url)}
      renderActions={(d) => (
        <Form method="post">
          <IconButton
            type="submit"
            icon={<LuInspect />}
            tooltip={"Open page details"}
            value={String(d.url)}
            name="url"
          />
        </Form>
      )}
    />
  );
};
