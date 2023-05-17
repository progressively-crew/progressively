import { PrimaryButton } from '../components/PrimaryButton';
import { Link } from '../components/Link';
import { Text } from '../components/Text';
import { Layout } from '../layouts/Layout';
import { render } from '@react-email/components';

interface RegistrationProps {
  fullname?: string;
  activateAccountLink: string;
}

const Registration = ({
  fullname = 'Marvin',
  activateAccountLink = '/',
}: RegistrationProps) => {
  const previewTitle = `${fullname}, make sure to activate your account`;
  const title = 'Activating your account';

  return (
    <Layout previewTitle={previewTitle} title={title}>
      <Text>
        Hello <strong>{fullname}</strong>,
      </Text>

      <Text>
        You've recently created a new user on{' '}
        <Link href="https://progressively.app">Progressively.app</Link>. In
        order for you to use the service, you have to activate your account by
        clicking the following link.
      </Text>

      <PrimaryButton href={activateAccountLink}>
        Activate my account
      </PrimaryButton>
    </Layout>
  );
};

export const RegistrationEmail = (props: RegistrationProps) =>
  render(<Registration {...props} />);
