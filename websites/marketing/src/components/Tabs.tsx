import React from "react";
import * as TabR from "@radix-ui/react-tabs";
import { CgUnavailable } from "react-icons/cg";

export interface TabsProps {
  children: React.ReactNode;
  defaultValue?: string;
}

export interface TabProps {
  children: React.ReactNode;
  value: string;
  disabled?: boolean;
}

export const Tabs = ({ children, defaultValue }: TabsProps) => {
  return <TabR.Root defaultValue={defaultValue}>{children}</TabR.Root>;
};

export const TabList = ({ children }: TabsProps) => {
  return (
    <TabR.List className="flex flex-row justify-center items-center border-b border-slate-200">
      {children}
    </TabR.List>
  );
};

export const Tab = ({ children, value, disabled }: TabProps) => {
  return (
    <TabR.Trigger
      disabled={disabled}
      value={value}
      className="flex flex-row gap-2 items-center py-2 px-6 data-[disabled]:text-slate-400 data-[state=active]:border-b-pink-500 border-b-transparent border-b-2 data-[state=active]:text-pink-500 font-semibold text-slate-600"
    >
      {disabled ? <CgUnavailable /> : null}
      {children}
    </TabR.Trigger>
  );
};

export const TabPanel = ({ children, value }: TabProps) => {
  return (
    <TabR.Content value={value} className="py-4">
      {children}
    </TabR.Content>
  );
};
