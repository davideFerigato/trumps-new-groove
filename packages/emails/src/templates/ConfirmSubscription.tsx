import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Text,
  Link,
} from "@react-email/components";

interface ConfirmSubscriptionProps {
  confirmationUrl: string;
}

export default function ConfirmSubscriptionEmail({ confirmationUrl }: ConfirmSubscriptionProps) {
  return (
    <Html>
      <Head />
      <Preview>Confirm your subscription to Trump&apos;s New Groove</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={heading}>📬 Confirm Your Subscription</Text>
          <Text>Click the button below to confirm your email and start receiving the weekly prophecy.</Text>
          <Link href={confirmationUrl} style={button}>
            Confirm Subscription
          </Link>
          <Text style={footer}>If you didn’t request this, you can safely ignore this email.</Text>
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
  color: "#d52b1e",
};

const button = {
  display: "inline-block",
  padding: "12px 24px",
  backgroundColor: "#d52b1e",
  color: "#ffffff",
  fontWeight: "bold",
  textDecoration: "none",
  borderRadius: "4px",
  margin: "16px 0",
};

const footer = {
  color: "#888888",
  fontSize: "12px",
  marginTop: "20px",
};