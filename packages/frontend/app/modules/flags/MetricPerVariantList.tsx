import { SelectField } from "~/components/Fields/Select/SelectField";
import { useState } from "react";
import { Table, Th, Tbody, Tr, Td } from "~/components/Table";
import { VariantDot } from "../variants/components/VariantDot";

interface MetricHit {
  metric: string;
  variant: string;
  count: number;
  variantCount?: number;
}

interface VariantEntityProps {
  mHit: MetricHit;
  allMetrics: Array<MetricHit>;
}

const VariantRow = ({ mHit, allMetrics }: VariantEntityProps) => {
  const [selected, setSelected] = useState("variant");
  const compareWithOptions = [];

  if (mHit.variant) {
    compareWithOptions.push({
      value: "variant",
      label: "Associated variant",
    });
  }

  for (const m of allMetrics) {
    if (m.metric !== mHit.metric) {
      compareWithOptions.push({
        value: m.metric,
        label: m.metric,
      });
    }
  }

  let ratio = "N/A";

  if (selected === "variant") {
    ratio = mHit.variantCount
      ? `${((mHit.count / mHit.variantCount) * 100).toFixed(2)}%`
      : "N/A";
  } else if (selected) {
    const otherMetric = allMetrics.find((m) => m.metric === selected)!;
    ratio = `${((mHit.count / (otherMetric.count || 1)) * 100).toFixed(2)}%`;
  }

  return (
    <Tr>
      <Td>{mHit.metric}</Td>
      <Td>
        {mHit.variant && (
          <div className="flex flex-row gap-2 items-center">
            <VariantDot variant={mHit.variant} />

            {mHit.variant}
          </div>
        )}
      </Td>
      <Td>{mHit.count}</Td>
      <Td>
        <SelectField
          hiddenLabel
          name="compare-with"
          label="Compare with"
          defaultValue={"variant"}
          options={compareWithOptions}
          onValueChange={(x) => setSelected(x)}
        />
      </Td>
      <Td>
        <strong>{ratio}</strong>
      </Td>
    </Tr>
  );
};

export interface MetricPerVariantListProps {
  items: Array<MetricHit>;
}

export const MetricPerVariantList = ({ items }: MetricPerVariantListProps) => {
  return (
    <Table>
      <caption className="sr-only">Metric cout</caption>
      <thead>
        <tr>
          <Th>Name</Th>
          <Th>Variant (optional)</Th>
          <Th>Hits</Th>
          <Th>Compare with</Th>
          <Th>Ratio/Conversion</Th>
        </tr>
      </thead>

      <Tbody>
        {items.map((mHit) => (
          <VariantRow key={mHit.metric} mHit={mHit} allMetrics={items} />
        ))}
      </Tbody>
    </Table>
  );
};
