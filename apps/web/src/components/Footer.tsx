"use client";
import { useT } from "@/hooks/useTranslation";

export default function Footer() {
  const { t } = useT();

  return (
    <footer className="bg-obsidian border-t border-gold-600/30 pt-8 pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
          <div className="flex flex-col items-center sm:items-start">
            <span className="font-cinzel-decorative gold-shimmer text-lg">TTNG</span>
            <span className="text-gold-600 text-sm mt-1">
              © {new Date().getFullYear()} Davide Ferigato. {t("footer.allRightsReserved")}
            </span>
          </div>

          <div className="text-gold-600 text-sm">
            <p>{t("footer.privacyPolicy")} | {t("footer.cookiePolicy")} | {t("footer.termsConditions")}</p>
            <p className="mt-2">{t("footer.gdprCompliance")}</p>
          </div>

          <div className="flex flex-col items-center sm:items-end gap-2">
            <a
              href="https://github.com/davideFerigato/trumps-new-groove"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-400 hover:text-gold-300 transition-colors font-cinzel"
            >
              {t("footer.viewSource")}
            </a>
            <p className="text-gold-600 text-xs">{t("footer.craftedBy")}</p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gold-600/20">
          <div className="h-0.5 bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />
        </div>
      </div>
    </footer>
  );
}