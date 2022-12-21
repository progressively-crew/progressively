import { NavWrapper, NavItem } from "~/components/Nav/NavWrapper";
import { Spacer } from "../Spacer";
import React from "react";
import { useNavToggle } from "./hooks/useNavToggle";

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
        label: "Audience eligibility",
        link: "/docs/features/audience-eligibility",
      },
      {
        label: "Additional audience",
        link: "/docs/features/additional-audience",
      },
      {
        label: "Insights",
        link: "/docs/features/insights",
      },
    ],
  },

  {
    label: "Usage",
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
        label: "Go",
        link: "/docs/guides/go",
      },
      {
        label: "Add yours",
        link: "/docs/guides/add-your-sdk",
      },
    ],
  },
];

export const DocMenu = () => {
  const { toggleNav, isNavOpened } = useNavToggle();

  const handleClick = () => {
    if (isNavOpened) {
      toggleNav();
    }
  };

  return (
    <NavWrapper label={`Flag related`}>
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
            <NavItem key={navItem.link} to={navItem.link} onClick={handleClick}>
              {navItem.label}
            </NavItem>
          ))}
        </React.Fragment>
      ))}
    </NavWrapper>
  );
};
