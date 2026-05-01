import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Text,
} from "@react-email/components";

interface WelcomeProps {
  email: string;
}

export default function WelcomeEmail({ email }: WelcomeProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Trump&apos;s New Groove!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={heading}>🎉 You’re officially a True Believer!</Text>
          <Text>Your email <strong>{email}</strong> has been confirmed.</Text>
          <Text>You’ll now receive the <strong>Prophecy of the Week</strong> every Monday.</Text>
          <Text style={footer}>See you soon!</Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#ffffff",
  fontFamily: "sans-serif",
};

const container = {
  padding: "20px",
  maxWidth: "480px",
  margin: "0 auto",
  border: "1px solid #e0e0e0",
  borderRadius: "8px",
};

const heading = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#0033a0",
};

const footer = {
  color: "#888888",
  fontSize: "12px",
  marginTop: "20px",
};