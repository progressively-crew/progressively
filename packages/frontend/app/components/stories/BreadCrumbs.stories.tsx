import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { BreadCrumbs } from "../Breadcrumbs";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/BreadCrumbs",
  component: BreadCrumbs,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof BreadCrumbs>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const DefaultTemplate: ComponentStory<typeof BreadCrumbs> = (args) => (
  <BreadCrumbs
    crumbs={[
      {
        link: "/dashboard",
        label: "Projects",
      },
      {
        link: "/etc",
        label: "Etc...",
      },
      {
        link: "/dashboard/projects/create",
        label: "Create a project",
      },
    ]}
  />
);
export const Default = DefaultTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
