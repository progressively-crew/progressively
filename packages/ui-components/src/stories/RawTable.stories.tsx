import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { RawTable } from "../RawTable";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/RawTable",
  component: RawTable,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof RawTable>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const DefaultTemplate: ComponentStory<typeof RawTable> = () => (
  <div style={{ padding: 40, background: "#efefef" }}>
    <RawTable>
      <thead>
        <tr>
          <th width="200px">Field 1</th>
          <th width="200px">Field 2</th>
          <th width="200px">Field 3</th>
          <th width="200px">Field 4</th>
          <th width="200px">Field 5</th>
        </tr>
      </thead>
      <tbody>
        {Array(20)
          .fill(null)
          .map((x, idx) => (
            <tr key={idx}>
              <td>Value 1</td>
              <td>Value 2</td>
              <td>Value 3</td>
              <td>Value 4</td>
              <td>Value 5</td>
            </tr>
          ))}
      </tbody>
    </RawTable>
  </div>
);
export const Default = DefaultTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  children: "Marvin Frachet",
};
