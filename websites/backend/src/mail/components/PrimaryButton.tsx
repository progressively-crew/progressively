import { Button } from '@react-email/components';
import { ReactNode } from 'react';

export interface ButtonProps {
  href: string;
  children: ReactNode;
}

export const PrimaryButton = (props: ButtonProps) => {
  return (
    <Button
      className="py-4 px-4 whitespace-nowrap inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors cursor-pointer bg-gray-800 text-white hover:bg-gray-500"
      {...props}
    />
  );
};
