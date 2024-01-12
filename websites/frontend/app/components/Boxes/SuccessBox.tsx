import * as Toast from "@radix-ui/react-toast";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { IconButton } from "../Buttons/IconButton";
import { Background } from "../Background";

export interface SuccessBoxProps {
  children: React.ReactNode;
  id: string;
}

export const SuccessBox = ({ children, id }: SuccessBoxProps) => {
  const [show, setShow] = useState(true);

  return (
    <Toast.Root
      className="motion-safe:animate-fade-enter-bottom fixed right-8 bottom-8"
      open={show}
      onOpenChange={() => setShow((s) => !s)}
      id={id}
    >
      <div className="rounded-md shadow-lg overflow-hidden">
        <Background spacing="S">
          <div className="rounded bg-white dark:bg-slate-900 p-4 flex flex-row gap-4">
            <div>
              <Toast.Title className="font-bold text-sm dark:text-white">
                🚀 Operation succeeded!
              </Toast.Title>
              <Toast.Description asChild>
                <p className="success-box text-sm dark:text-white">
                  {children}
                </p>
              </Toast.Description>
            </div>

            <Toast.Close className="dark:text-white" asChild>
              <IconButton icon={<MdClose />} tooltip={"Close"} />
            </Toast.Close>
          </div>
        </Background>
      </div>
    </Toast.Root>
  );
};
