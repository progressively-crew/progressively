import { Img } from '@react-email/components';

export const Logo = (props: any) => {
  return (
    <Img
      src="https://progressively.app/logo.png"
      alt="Cat"
      width="32"
      height="32"
      {...props}
    />
  );
};
