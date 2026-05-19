"use client";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-obsidian py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-surface-dark aztec-border rounded-xl p-8 sm:p-12">
        <h1 className="text-3xl sm:text-4xl font-cinzel-decorative gold-shimmer mb-8">
          Privacy Policy
        </h1>

        <div className="space-y-8 text-bone-white font-cinzel leading-relaxed">
          {/* Titolare del trattamento */}
          <section>
            <h2 className="text-xl font-cinzel-decorative text-gold-400 mb-3">
              1. Data Controller
            </h2>
            <p className="text-gold-200">
              The data controller responsible for this website is <strong>Davide Ferigato</strong>.
              For any inquiries regarding your personal data, you can contact him at:{" "}
              <a
                href="mailto:d.m.f.s@outlook.it"
                className="text-gold-400 hover:underline"
              >
                d.m.f.s@outlook.it
              </a>
              .
            </p>
          </section>

          {/* Dati raccolti */}
          <section>
            <h2 className="text-xl font-cinzel-decorative text-gold-400 mb-3">
              2. Personal Data Collected
            </h2>
            <p className="text-gold-200">
              This application collects the following categories of personal data:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2 text-gold-200">
              <li>
                <strong className="text-gold-400">Identity Data:</strong> name, email address,
                profile picture (provided by Clerk during authentication).
              </li>
              <li>
                <strong className="text-gold-400">Technical Data:</strong> IP address, browser
                type, operating system, and other technical identifiers collected automatically
                when you visit the site.
              </li>
              <li>
                <strong className="text-gold-400">Game Data:</strong> TrumpBucks balance, total
                clicks, bets placed, badges earned, and prophecies generated.
              </li>
              <li>
                <strong className="text-gold-400">Newsletter Data:</strong> email address
                provided voluntarily for the newsletter subscription.
              </li>
            </ul>
            <p className="mt-3 text-gold-200">
              We do not collect any sensitive personal data (e.g., health, political opinions,
              religious beliefs).
            </p>
          </section>

          {/* Finalità del trattamento */}
          <section>
            <h2 className="text-xl font-cinzel-decorative text-gold-400 mb-3">
              3. Purposes of Processing
            </h2>
            <p className="text-gold-200">
              Your personal data is processed for the following purposes:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2 text-gold-200">
              <li>To provide and maintain the core functionality of the site (authentication, user profile, game mechanics).</li>
              <li>To send the weekly newsletter, but only if you have explicitly subscribed.</li>
              <li>To ensure the security and proper functioning of the IT systems.</li>
              <li>To display aggregated, anonymous statistics (e.g., total prophecies invoked).</li>
            </ul>
          </section>

          {/* Base giuridica */}
          <section>
            <h2 className="text-xl font-cinzel-decorative text-gold-400 mb-3">
              4. Legal Basis
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gold-200">
              <li>
                <strong className="text-gold-400">Consent:</strong> for the newsletter
                subscription and the sending of related emails.
              </li>
              <li>
                <strong className="text-gold-400">Legitimate Interest:</strong> for the
                operation of the website (authentication, user profile, game data, technical
                security).
              </li>
            </ul>
          </section>

          {/* Conservazione */}
          <section>
            <h2 className="text-xl font-cinzel-decorative text-gold-400 mb-3">
              5. Data Retention
            </h2>
            <p className="text-gold-200">
              Your personal data is retained for as long as your account remains active. If you
              request the deletion of your account, all associated data will be permanently
              removed within 30 days. Newsletter data is kept until you unsubscribe.
            </p>
          </section>

          {/* Condivisione e trasferimento */}
          <section>
            <h2 className="text-xl font-cinzel-decorative text-gold-400 mb-3">
              6. Data Sharing and Transfers
            </h2>
            <p className="text-gold-200">
              Your data is stored and processed through the following third‑party services, which
              act as data processors:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2 text-gold-200">
              <li>
                <strong className="text-gold-400">Clerk</strong> – authentication provider (USA);
                standard contractual clauses are in place.
              </li>
              <li>
                <strong className="text-gold-400">Supabase</strong> – PostgreSQL database (EU region).
              </li>
              <li>
                <strong className="text-gold-400">Upstash</strong> – Redis cache (EU region).
              </li>
              <li>
                <strong className="text-gold-400">Resend</strong> – email delivery service (USA).
              </li>
              <li>
                <strong className="text-gold-400">Vercel</strong> – hosting platform (USA).
              </li>
            </ul>
            <p className="mt-3 text-gold-200">
              Some of these providers are based outside the European Union. In such cases, we
              ensure that adequate safeguards are in place, such as Standard Contractual Clauses
              or the provider&apos;s adherence to the EU‑US Data Privacy Framework.
            </p>
          </section>

          {/* Diritti dell'utente */}
          <section>
            <h2 className="text-xl font-cinzel-decorative text-gold-400 mb-3">
              7. Your Rights
            </h2>
            <p className="text-gold-200">
              Under the GDPR, you have the right to:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2 text-gold-200">
              <li>Access your personal data.</li>
              <li>Rectify inaccurate or incomplete data.</li>
              <li>Request the erasure of your data (&quot;right to be forgotten&quot;).</li>
              <li>Restrict or object to the processing of your data.</li>
              <li>Receive your data in a structured, commonly used format (data portability).</li>
              <li>Withdraw your consent at any time (for newsletter).</li>
              <li>Lodge a complaint with a supervisory authority.</li>
            </ul>
            <p className="mt-3 text-gold-200">
              To exercise any of these rights, please contact us at{" "}
              <a
                href="mailto:d.m.f.s@outlook.it"
                className="text-gold-400 hover:underline"
              >
                d.m.f.s@outlook.it
              </a>
              . We will respond within 30 days.
            </p>
          </section>

          {/* Cookie */}
          <section>
            <h2 className="text-xl font-cinzel-decorative text-gold-400 mb-3">
              8. Cookies
            </h2>
            <p className="text-gold-200">
              This site uses only technical cookies strictly necessary for authentication (Clerk)
              and for saving your language and theme preferences (via localStorage). No profiling
              or third‑party cookies are used. For more details, please read our{" "}
              <a href="/cookies" className="text-gold-400 hover:underline">
                Cookie Policy
              </a>
              .
            </p>
          </section>

          {/* Modifiche e contatti */}
          <section>
            <h2 className="text-xl font-cinzel-decorative text-gold-400 mb-3">
              9. Changes to this Policy
            </h2>
            <p className="text-gold-200">
              This privacy policy may be updated from time to time. We encourage you to review it
              periodically.
            </p>
          </section>

          <p className="text-sm text-gold-600 mt-12 text-center">
            Last updated: 2023-12-31
          </p>
        </div>
      </div>
    </div>
  );
}