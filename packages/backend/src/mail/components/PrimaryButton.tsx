import { Button, ButtonProps } from '@react-email/components';

export const PrimaryButton = (props: ButtonProps) => {
  return (
    <Button
      className="py-4 px-4 whitespace-nowrap inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 cursor-pointer bg-gray-800 text-white hover:bg-gray-500"
      {...props}
    />
  );
};
