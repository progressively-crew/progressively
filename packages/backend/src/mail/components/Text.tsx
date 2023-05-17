import { Text as RawText, TextProps } from '@react-email/components';

export const Text = (props: TextProps) => {
  return (
    <RawText className="text-black text-[14px] leading-[24px]" {...props} />
  );
};
