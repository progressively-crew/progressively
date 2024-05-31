"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { HiOutlineChevronDown } from "react-icons/hi";
import { AiOutlineCheck } from "react-icons/ai";

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={
      "w-full md:min-w-[220px] bg-white flex h-10 w-full items-center justify-between rounded-xl border border-slate-200 py-2 px-3 text-sm placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
    }
    {...props}
  >
    {children}
    <HiOutlineChevronDown className="h-4 w-4 opacity-50 ml-2" />
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ children, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={
        "relative z-50 min-w-[8rem] overflow-hidden rounded-xl border border-slate-100 bg-white text-slate-700 shadow-md animate-in fade-in-80"
      }
      {...props}
    >
      <SelectPrimitive.Viewport className="p-1">
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>((props, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={"py-1.5 pr-2 pl-8 text-sm font-semibold text-slate-900"}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={
      "relative flex cursor-default select-none items-center rounded-lg py-1.5 pr-2 pl-8 text-sm font-medium data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
    }
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <AiOutlineCheck className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>((props, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={"-mx-1 my-1 h-px bg-slate-100"}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
};
