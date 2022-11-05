import {
  AiOutlineAppstore,
  AiOutlineBarChart,
  AiOutlineClockCircle,
  AiOutlineSetting,
} from "react-icons/ai";
import { FaToggleOff } from "react-icons/fa";
import { TbSend } from "react-icons/tb";
import { MdAppRegistration, MdBubbleChart } from "react-icons/md";
import { Nav, NavItem } from "~/components/Nav";
import { Spacer } from "./Spacer";
import React from "react";

const MenuItems = [
  {
    label: "Introduction",
    items: [
      {
        label: "Why Progressively?",
        link: "/docs/introduction/why",
      },
      {
        label: "Demo instance",
        link: "/docs/introduction/demo-instance",
      },
      {
        label: "Getting started",
        link: "/docs/introduction/getting-started",
      },
      {
        label: "Configuration",
        link: "/docs/introduction/configuration",
      },
    ],
  },

  {
    label: "Features",
    items: [
      {
        label: "Hierarchical structure",
        link: "/docs/features/hierarchical-structure",
      },
      {
        label: "Single and Multi variants",
        link: "/docs/features/single-multi-variants",
      },
      {
        label: "Schedules flag update",
        link: "/docs/features/scheduled-flag-update",
      },
      {
        label: "Feature flags strategies",
        link: "/docs/features/flag-strategies",
      },
      {
        label: "Simple insights",
        link: "/docs/features/simple-insights",
      },
    ],
  },

  {
    label: "SDKs",
    items: [
      {
        label: "JavaScript",
        link: "/docs/guides/javascript",
      },
      {
        label: "Node.js",
        link: "/docs/guides/node-js",
      },
      {
        label: "React",
        link: "/docs/guides/react",
      },
      {
        label: "PHP",
        link: "/docs/guides/php",
      },
      {
        label: "Add yours",
        link: "/docs/guides/add-your-sdk",
      },
    ],
  },
];

export const DocMenu = () => {
  return (
    <Nav label={`Flag related`}>
      {MenuItems.map((section, index) => (
        <React.Fragment key={section.label}>
          <li role="separator">
            {index > 0 && <Spacer size={4} />}
            <p className="uppercase text-black text-sm font-bold">
              {section.label}
            </p>
            <Spacer size={1} />
          </li>

          {section.items.map((navItem) => (
            <NavItem
              key={navItem.link}
              to={navItem.link}
              icon={<FaToggleOff />}
            >
              {navItem.label}
            </NavItem>
          ))}
        </React.Fragment>
      ))}
    </Nav>
  );
};
