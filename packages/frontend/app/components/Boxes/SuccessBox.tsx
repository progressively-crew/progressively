import { useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { Toast } from "../Toast/Toast";

export interface SuccessBoxProps {
  children: React.ReactNode;
  id: string;
}

export const SuccessBox = ({ children, id }: SuccessBoxProps) => {
  const [visible, setVisible] = useState(true);

  return (
    <Toast
      id={id}
      title={"Successfully done!"}
      isShown={visible}
      onClose={() => {
        setVisible(false);
      }}
      icon={<AiOutlineCheckCircle />}
    >
      {children}
    </Toast>
  );
};
