import * as RTabs from "@radix-ui/react-tabs";

import { ReactNode } from "react";

export interface TabsProps {
  children: ReactNode;
}

export interface TabsValueProps {
  children: ReactNode;
  value: string;
}

export const Tabs = ({
  children,
  initialValue,
}: TabsProps & { initialValue?: string }) => {
  return <RTabs.Root defaultValue={initialValue}>{children}</RTabs.Root>;
};

export const TabList = ({ children }: TabsProps) => {
  return (
    <RTabs.List className="flex flex-row bg-gray-100">{children}</RTabs.List>
  );
};

export const TabContent = ({ children, value }: TabsValueProps) => (
  <RTabs.Content value={value}>{children}</RTabs.Content>
);

export const Tab = ({ children, value }: TabsValueProps) => (
  <RTabs.Trigger
    value={value}
    className="-outline-offset-2 px-3 py-1 text-sm hover:bg-gray-50 active:bg-white data-[state=active]:bg-white text-gray-800"
  >
    {children}
  </RTabs.Trigger>
);
