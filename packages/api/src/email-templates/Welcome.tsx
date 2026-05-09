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
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&display=swap" rel="stylesheet" />
      </Head>
      <Preview>Welcome to Trump&apos;s New Groove!</Preview>
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

          <Text style={heading}>Welcome, True Believer!</Text>
          <Text style={paragraph}>
            Your oath has been recorded in the Imperial Archives.
          </Text>
          <Text style={paragraph}>
            <strong style={{ color: "#eab308" }}>{email}</strong> is now a confirmed recipient of the <strong>Prophecy of the Week</strong>.
          </Text>
          <Text style={paragraph}>
            Every Monday, the Royal Oracle will send you the latest decree directly from the palace.
          </Text>
          
          <div style={{ textAlign: "center", marginTop: "30px" }}>
            <div style={goldSeal}>IMPERIAL SEAL</div>
          </div>

          <Text style={footer}>
            See you in the Imperial Court!
          </Text>

          {/* Fascia inferiore dorata */}
          <div style={aztecBar} />
        </Container>
      </Body>
    </Html>
  );
}

// --- Stili (identici alla mail di conferma) ---

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

const goldSeal: React.CSSProperties = {
  fontSize: "36px",
  fontWeight: 900,
  color: "#eab308",
  textShadow: "0 0 15px rgba(234,179,8,0.8)",
  fontFamily: "'Cinzel Decorative', Georgia, serif",
  letterSpacing: "3px",
};

const footer: React.CSSProperties = {
  color: "#a16207",
  fontSize: "12px",
  textAlign: "center",
  marginTop: "24px",
};