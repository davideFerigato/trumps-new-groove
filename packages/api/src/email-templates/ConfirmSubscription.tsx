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
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&display=swap" rel="stylesheet" />
      </Head>
      <Preview>Confirm your subscription to Trump&apos;s New Groove</Preview>
      <Body style={main}>
        <Container style={container}>
          
          {/* Fascia superiore dorata stile gradini aztechi */}
          <div style={aztecBar} />
          
          {/* Intestazione con logo e titolo */}
          <table cellPadding="0" cellSpacing="0" style={headerTable}>
            <tr>
              <td style={{ width: "64px", verticalAlign: "middle" }}>
                <img
                  src="https://trumps-new-groove.vercel.app/images/logo.png"
                  alt="TTNG"
                  width="60"
                  height="60"
                  style={{ borderRadius: "4px" }}
                />
              </td>
              <td style={{ paddingLeft: "16px", verticalAlign: "middle" }}>
                <h1 style={appTitle}>TRUMP&apos;S NEW GROOVE</h1>
              </td>
            </tr>
          </table>

          {/* Fascia sottostante al logo */}
          <div style={aztecBar} />

          <Text style={heading}>Confirm Your Oath to the Empire</Text>
          <Text style={paragraph}>
            The Emperor requires your confirmation. Click the sacred seal below to receive the weekly prophecy and join the Imperial Court.
          </Text>

          {/* Pulsante d'oro imperiale */}
          <table cellPadding="0" cellSpacing="0" style={{ margin: "24px auto" }}>
            <tr>
              <td style={goldButtonOuter}>
                <Link href={confirmationUrl} style={goldButtonLink}>
                  PLEDGE LOYALTY
                </Link>
              </td>
            </tr>
          </table>

          <Text style={footer}>
            If you didn&apos;t request this decree, simply ignore this message.
          </Text>

          {/* Fascia inferiore dorata */}
          <div style={aztecBar} />
        </Container>
      </Body>
    </Html>
  );
}

// --- Stili ---

const main: React.CSSProperties = {
  backgroundColor: "#1a0a00",
  fontFamily: "'Cinzel', Georgia, serif",
  padding: "20px",
};

const container: React.CSSProperties = {
  maxWidth: "520px",
  margin: "0 auto",
  backgroundColor: "#2d1500",
  border: "2px solid #ca8a04",
  borderRadius: "12px",
  padding: "24px",
  boxShadow: "0 0 30px rgba(234, 179, 8, 0.3)",
};

const aztecBar: React.CSSProperties = {
  height: "6px",
  background: "repeating-linear-gradient(90deg, #eab308 0px, #eab308 8px, transparent 8px, transparent 12px), linear-gradient(180deg, #fde047, #b45309)",
  backgroundBlendMode: "overlay",
  borderRadius: "3px",
  margin: "8px 0 20px 0",
};

const headerTable: React.CSSProperties = {
  width: "100%",
  margin: "10px 0",
};

const appTitle: React.CSSProperties = {
  fontFamily: "'Cinzel Decorative', Georgia, serif",
  fontSize: "28px",
  fontWeight: 900,
  color: "#eab308",
  textShadow: "0 0 10px rgba(234,179,8,0.6)",
  margin: "0",
  letterSpacing: "2px",
  lineHeight: "1.2",
};

const heading: React.CSSProperties = {
  fontFamily: "'Cinzel Decorative', Georgia, serif",
  fontSize: "22px",
  fontWeight: 700,
  color: "#facc15",
  textAlign: "center",
  margin: "20px 0 12px 0",
};

const paragraph: React.CSSProperties = {
  color: "#fef9c3",
  fontSize: "16px",
  lineHeight: "1.6",
  textAlign: "center",
  margin: "10px 0",
};

const goldButtonOuter: React.CSSProperties = {
  background: "linear-gradient(135deg, #eab308, #b45309)",
  borderRadius: "8px",
  padding: "2px",
  boxShadow: "0 4px 15px rgba(234, 179, 8, 0.5)",
};

const goldButtonLink: React.CSSProperties = {
  display: "block",
  padding: "16px 32px",
  background: "linear-gradient(135deg, #fde047, #ca8a04)",
  color: "#1a0a00",
  fontWeight: 900,
  fontFamily: "'Cinzel Decorative', Georgia, serif",
  fontSize: "18px",
  textDecoration: "none",
  borderRadius: "6px",
  textAlign: "center",
  letterSpacing: "1px",
};

const footer: React.CSSProperties = {
  color: "#a16207",
  fontSize: "12px",
  textAlign: "center",
  marginTop: "24px",
};