import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Tailwind,
  Text,
} from '@react-email/components';

interface EmailTemplateProps {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  lastName,
  password,
  email,
}: EmailTemplateProps) => (
  <Html>
    <Tailwind>
      <Head />
      <Body className="font-sans text-black">
        <Container className="w-full md:w-1/2 mx-auto border-2 border-zinc-400 px-2 py-4">
          <Text className="mb-5">
            Hello, <span className="italic font-bold">{firstName} {lastName}</span>!
          </Text>

          <Text className="mb-2.5">
            Welcome to our portal! We are thrilled to have you on board. Get ready to explore our range of services designed to cater to your specific needs.
          </Text>

          <Container className="flex flex-col gap-1 border-1 px-1 py-4">
            <Heading>Login Details:</Heading>
            <Container className="flex flex-col">
              <Text className="font-bold">Email: <span className="font-normal italic">{email}</span></Text>
              <Text className="font-bold">Password: <span className="font-normal italic">{password}</span></Text>
            </Container>
            <Text>*Please keep this information secure and change your password upon your first login for security reasons.</Text>
          </Container>

          <Container className="flex flex-col gap-2.5">
            <Heading>What&apos;s next?</Heading>
            <Text>You&aposre all set to start! Log in to your new account and dive into the Livemode experience. Discover, connect, and enjoy the journey with us.</Text>
          </Container>

          <Container className="mb-5 flex justify-center items-center w-full">
            <Link href="http://localhost:3000/auth/sign-in" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
                Log In to Your Account
            </Link>
          </Container>

          <Text className="mb-5">
            If you have any questions or need assistance, our support team is just an email away and ready to help you.
          </Text>

          <Text>Sincerely,<br /><span className="font-bold">The Livemode Team</span></Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
