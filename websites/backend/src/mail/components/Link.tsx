import { LinkProps, Link as RawLink } from '@react-email/components';

export const Link = (props: LinkProps) => {
  return <RawLink className="text-black underline" {...props} />;
};
