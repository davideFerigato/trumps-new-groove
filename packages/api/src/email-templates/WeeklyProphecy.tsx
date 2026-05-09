import { Html, Head, Preview, Body, Container, Text, Link } from "@react-email/components";

interface WeeklyProphecyProps {
  prophecy: string;
  unsubscribeUrl: string;
}

export default function WeeklyProphecyEmail({ prophecy, unsubscribeUrl }: WeeklyProphecyProps) {
  return (
    <Html>
      <Head />
      <Preview>The prophecy of the week has arrived!</Preview>
      <Body style={{ background: "#f0f0f0", padding: "20px" }}>
        <Container style={{ background: "white", padding: "30px" }}>
          <Text style={{ fontSize: "24px", fontWeight: "bold" }}>📢 Trump's New Groove Weekly Prophecy</Text>
          <Text>“{prophecy}”</Text>
          <Text>Will it come true? Place your TrumpBucks bet now!</Text>
          <Link href={unsubscribeUrl}>Unsubscribe</Link>
        </Container>
      </Body>
    </Html>
  );
}