import { Provider } from "@radix-ui/react-toast";

export interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  return <Provider swipeDirection="right">{children}</Provider>;
};
