"use client";

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-obsidian py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-surface-dark aztec-border rounded-xl p-8 sm:p-12">
        <h1 className="text-3xl sm:text-4xl font-cinzel-decorative gold-shimmer mb-8">
          Cookie Policy
        </h1>

        <div className="space-y-8 text-bone-white font-cinzel leading-relaxed">
          {/* Introduzione */}
          <section>
            <h2 className="text-xl font-cinzel-decorative text-gold-400 mb-3">
              1. What Are Cookies?
            </h2>
            <p className="text-gold-200">
              Cookies are small text files that a website stores on your device (computer, tablet,
              smartphone) when you visit it. They are widely used to make sites work more
              efficiently and to provide information to the site owners.
            </p>
          </section>

          {/* Cookie utilizzati */}
          <section>
            <h2 className="text-xl font-cinzel-decorative text-gold-400 mb-3">
              2. How This Site Uses Cookies
            </h2>
            <p className="text-gold-200">
              This site uses <strong className="text-gold-400">only technical cookies</strong>{" "}
              that are strictly necessary for its operation. Specifically:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2 text-gold-200">
              <li>
                <strong className="text-gold-400">Authentication cookies (Clerk):</strong>{" "}
                used to recognize you after you log in and to keep your session active. Without
                these cookies, the login functionality would not work.
              </li>
              <li>
                <strong className="text-gold-400">Preference storage (localStorage):</strong>{" "}
                your language and theme (light/dark) choices are saved in your browser’s local
                storage. This is not a cookie, but it works in a similar way to remember your
                preferences between visits.
              </li>
            </ul>
            <p className="mt-3 text-gold-200">
              We do <strong className="text-gold-400">not</strong> use profiling cookies,
              advertising cookies, analytics cookies, or any other type of tracking technology.
            </p>
          </section>

          {/* Cookie di terze parti */}
          <section>
            <h2 className="text-xl font-cinzel-decorative text-gold-400 mb-3">
              3. Third‑Party Cookies
            </h2>
            <p className="text-gold-200">
              The authentication cookies mentioned above are set by{" "}
              <strong className="text-gold-400">Clerk</strong>, our authentication provider.
              Clerk uses only technical cookies necessary for the login process. No other
              third‑party services set cookies through this site.
            </p>
          </section>

          {/* Base giuridica e consenso */}
          <section>
            <h2 className="text-xl font-cinzel-decorative text-gold-400 mb-3">
              4. Legal Basis and Consent
            </h2>
            <p className="text-gold-200">
              Under the EU Cookie Law (ePrivacy Directive) and the GDPR, technical cookies that
              are strictly necessary for the operation of a website do{" "}
              <strong className="text-gold-400">not</strong> require your prior consent. Since
              this site uses only such cookies, you will not see a cookie banner asking for
              permission.
            </p>
            <p className="mt-2 text-gold-200">
              By continuing to use this site, you acknowledge that you have read this Cookie
              Policy and understand that only essential technical cookies are used.
            </p>
          </section>

          {/* Come disabilitare i cookie */}
          <section>
            <h2 className="text-xl font-cinzel-decorative text-gold-400 mb-3">
              5. How to Disable Cookies
            </h2>
            <p className="text-gold-200">
              You can configure your browser to block or alert you about cookies at any time.
              However, if you disable technical cookies, the login functionality of this site may
              not work correctly. Below are links to the instructions for the most common browsers:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2 text-gold-200">
              <li>
                <a
                  href="https://support.google.com/chrome/answer/95647"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-400 hover:underline"
                >
                  Google Chrome
                </a>
              </li>
              <li>
                <a
                  href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-400 hover:underline"
                >
                  Mozilla Firefox
                </a>
              </li>
              <li>
                <a
                  href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-400 hover:underline"
                >
                  Safari
                </a>
              </li>
              <li>
                <a
                  href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-400 hover:underline"
                >
                  Microsoft Edge
                </a>
              </li>
            </ul>
          </section>

          {/* Modifiche */}
          <section>
            <h2 className="text-xl font-cinzel-decorative text-gold-400 mb-3">
              6. Changes to this Policy
            </h2>
            <p className="text-gold-200">
              This Cookie Policy may be updated from time to time. We encourage you to review it
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