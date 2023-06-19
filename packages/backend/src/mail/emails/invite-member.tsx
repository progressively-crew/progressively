import { PrimaryButton } from '../components/PrimaryButton';
import { Link } from '../components/Link';
import { Text } from '../components/Text';
import { Layout } from '../layouts/Layout';
import { render } from '@react-email/components';

interface InviteMemberProps {
  fullname?: string;
  resetPasswordLink?: string;
}

export const InviteMember = ({
  fullname = 'Marvin',
  resetPasswordLink = '/',
}: InviteMemberProps) => {
  const previewTitle = `${fullname}, you have been invited to a project in Progressively.`;
  const title = 'Invitation to a project in Progressively';

  return (
    <Layout previewTitle={previewTitle} title={title}>
      <Text>
        Hello <strong>{fullname}</strong>,
      </Text>

      <Text>
        You've recently been added to a project in{' '}
        <Link href="https://progressively.app">Progressively.app</Link> and you
        don't have an account yet. Please, follow the link below to create a
        password associated to this address email in order to connect to the
        service.
      </Text>

      <PrimaryButton href={resetPasswordLink}>
        Reset your password
      </PrimaryButton>
    </Layout>
  );
};

export const InviteMemberEmail = (props: InviteMemberProps) =>
  render(<InviteMember {...props} />);
