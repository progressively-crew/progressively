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
const DefaultTemplate: ComponentStory<typeof RawTable> = (args) => (
  <RawTable>
    <thead>
      <tr>
        <th>Name</th>
        <th>Client key</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Marvin</td>
        <td>Admin</td>
      </tr>
      <tr>
        <td>Marvin</td>
        <td>Admin</td>
      </tr>
      <tr>
        <td>Marvin</td>
        <td>Admin</td>
      </tr>
      <tr>
        <td>Marvin</td>
        <td>Admin</td>
      </tr>
      <tr>
        <td>Marvin</td>
        <td>Admin</td>
      </tr>
      <tr>
        <td>Marvin</td>
        <td>Admin</td>
      </tr>
      <tr>
        <td>Marvin</td>
        <td>Admin</td>
      </tr>
    </tbody>
  </RawTable>
);
export const Default = DefaultTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  children: "Marvin Frachet",
};
