import { PrimaryButton } from '../components/PrimaryButton';
import { Link } from '../components/Link';
import { Text } from '../components/Text';
import { Layout } from '../layouts/Layout';
import { render } from '@react-email/components';

interface ResetPasswordProps {
  fullname?: string;
  resetPasswordLink?: string;
}

export const ResetPassword = ({
  fullname = 'Marvin',
  resetPasswordLink = '/',
}: ResetPasswordProps) => {
  const previewTitle = `${fullname}, you have asked to reset your password.`;
  const title = 'Resetting your password';

  return (
    <Layout previewTitle={previewTitle} title={title}>
      <Text>
        Hello <strong>{fullname}</strong>,
      </Text>

      <Text>
        You've recently asked to reset your password in{' '}
        <Link href="https://progressively.app">Progressively.app</Link>. In
        order for you to use the service, you have to activate your account by
        clicking the following link.
      </Text>

      <PrimaryButton href={resetPasswordLink}>
        Reset your password
      </PrimaryButton>
    </Layout>
  );
};

export const ResetPasswordEmail = (props: ResetPasswordProps) =>
  render(<ResetPassword {...props} />);
