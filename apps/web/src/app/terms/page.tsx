"use client";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-obsidian py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-surface-dark aztec-border rounded-xl p-8 sm:p-12">
        <h1 className="text-3xl sm:text-4xl font-cinzel-decorative gold-shimmer mb-8">
          Terms &amp; Conditions
        </h1>

        <div className="space-y-8 text-bone-white font-cinzel leading-relaxed">
          {/* Introduzione */}
          <section>
            <h2 className="text-xl font-cinzel-decorative text-gold-400 mb-3">
              1. Introduction
            </h2>
            <p className="text-gold-200">
              Welcome to <strong className="text-gold-400">The Trump&apos;s New Groove</strong>{" "}
              (&quot;the Site&quot;), a satirical web application created by{" "}
              <strong className="text-gold-400">Davide Ferigato</strong>.
              By accessing or using the Site, you agree to be bound by these Terms &amp;
              Conditions (&quot;Terms&quot;). If you do not agree to these Terms, please do not
              use the Site.
            </p>
          </section>

          {/* Descrizione del servizio */}
          <section>
            <h2 className="text-xl font-cinzel-decorative text-gold-400 mb-3">
              2. Description of the Service
            </h2>
            <p className="text-gold-200">
              The Site is a portfolio project that offers:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2 text-gold-200">
              <li>Generation of satirical fictional prophecies about Donald Trump.</li>
              <li>A virtual currency (&quot;TrumpBucks&quot;) used for entertainment purposes only.</li>
              <li>A betting system on generated prophecies (no real money involved).</li>
              <li>A newsletter service for weekly prophecies.</li>
            </ul>
            <p className="mt-3 text-gold-200">
              All content is purely satirical and fictional. No political endorsement or factual
              claims are intended.
            </p>
          </section>

          {/* Accettazione dei termini */}
          <section>
            <h2 className="text-xl font-cinzel-decorative text-gold-400 mb-3">
              3. Acceptance of Terms
            </h2>
            <p className="text-gold-200">
              By creating an account or using the Site, you confirm that you have read,
              understood, and accepted these Terms. If you do not agree, you must immediately
              stop using the Site.
            </p>
          </section>

          {/* Condotta degli utenti */}
          <section>
            <h2 className="text-xl font-cinzel-decorative text-gold-400 mb-3">
              4. User Conduct
            </h2>
            <p className="text-gold-200">
              You agree to use the Site only for lawful purposes and in a manner that does not
              infringe the rights of others. Specifically, you must not:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2 text-gold-200">
              <li>Use the Site to harass, abuse, or harm other users.</li>
              <li>Attempt to gain unauthorized access to any part of the Site.</li>
              <li>Use automated means (bots, scripts) to interact with the Site without permission.</li>
              <li>Upload or transmit any malicious code.</li>
            </ul>
          </section>

          {/* Proprietà intellettuale */}
          <section>
            <h2 className="text-xl font-cinzel-decorative text-gold-400 mb-3">
              5. Intellectual Property
            </h2>
            <p className="text-gold-200">
              The source code of the Site is publicly available on GitHub under an open‑source
              license. The visual design, graphics, and original content are the intellectual
              property of Davide Ferigato, unless otherwise stated. You may not reproduce or
              distribute them without prior written consent.
            </p>
          </section>

          {/* TrumpBucks e scommesse */}
          <section>
            <h2 className="text-xl font-cinzel-decorative text-gold-400 mb-3">
              6. Virtual Currency and Betting
            </h2>
            <p className="text-gold-200">
              TrumpBucks is a purely fictional virtual currency with{" "}
              <strong className="text-gold-400">no real‑world monetary value</strong>. It cannot
              be exchanged for real money, goods, or services. The betting system is entirely
              for entertainment; no actual gambling takes place.
            </p>
          </section>

          {/* Limitazione di responsabilità */}
          <section>
            <h2 className="text-xl font-cinzel-decorative text-gold-400 mb-3">
              7. Limitation of Liability
            </h2>
            <p className="text-gold-200">
              The Site is provided &quot;as is&quot; without any warranties, express or implied.
              Davide Ferigato shall not be held liable for any damages arising from the use or
              inability to use the Site, including but not limited to data loss, service
              interruptions, or technical issues.
            </p>
          </section>

          {/* Modifiche */}
          <section>
            <h2 className="text-xl font-cinzel-decorative text-gold-400 mb-3">
              8. Changes to these Terms
            </h2>
            <p className="text-gold-200">
              We reserve the right to modify these Terms at any time. Changes will be posted on
              this page. Your continued use of the Site after any changes constitutes your
              acceptance of the new Terms.
            </p>
          </section>

          {/* Contatti */}
          <section>
            <h2 className="text-xl font-cinzel-decorative text-gold-400 mb-3">
              9. Contact
            </h2>
            <p className="text-gold-200">
              For any questions regarding these Terms, please contact{" "}
              <a
                href="mailto:d.m.f.s@outlook.it"
                className="text-gold-400 hover:underline"
              >
                d.m.f.s@outlook.it
              </a>
              .
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