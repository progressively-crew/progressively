import * as React from "react";
import * as RToast from "@radix-ui/react-toast";
import { MdClose } from "react-icons/md";
import { IconButton } from "../Buttons/IconButton";

export interface ToastProps {
  id: string;
  children: React.ReactNode;
  title: string;
  isShown: boolean;
  onClose: () => void;
  icon?: React.ReactNode;
}

export const Toast = ({
  id,
  children,
  title,
  isShown,
  onClose,
  icon,
}: ToastProps) => {
  return (
    <>
      <RToast.Root
        className="ToastRoot success-box shadow-lg bg-white dark:bg-slate-700 rounded-lg px-4 py-2 border border-slate-200 dark:border-slate-800"
        open={isShown}
        onOpenChange={onClose}
      >
        <div className="flex flex-row justify-between gap-2 items-center">
          <RToast.Title
            className="items-center font-bold flex flex-row gap-2"
            id={id}
          >
            <span className="text-emerald-500">{icon}</span>
            {title}
          </RToast.Title>
          <IconButton onClick={onClose} icon={<MdClose />} tooltip={"Close"} />
        </div>
        <RToast.Description asChild className="text-sm">
          <div>{children}</div>
        </RToast.Description>
      </RToast.Root>
      <RToast.Viewport className="ToastViewport fixed bottom-4 right-4" />
    </>
  );
};
