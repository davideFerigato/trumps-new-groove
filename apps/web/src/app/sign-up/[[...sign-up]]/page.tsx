"use client";
import { SignUp } from "@clerk/nextjs";
import { useT } from "@/hooks/useTranslation";

export default function SignUpPage() {
  const { t } = useT();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4">
      <h1 className="text-3xl font-cinzel-decorative gold-shimmer mb-8 text-center">
        {t("signUp.title")}
      </h1>
      <SignUp
        appearance={{
          variables: {
            colorPrimary: '#eab308',
            colorBackground: '#2d1500',
            colorInputBackground: '#1a0a00',
            colorInputText: '#fef9c3',
            colorText: '#fef9c3',
            colorTextSecondary: '#ca8a04',
            borderRadius: '0.5rem',
            fontFamily: 'Cinzel, serif',
          },
          elements: {
            card: 'shadow-[0_0_40px_rgba(234,179,8,0.2)] border border-yellow-600/30',
            formButtonPrimary: 'bg-gradient-to-r from-yellow-600 to-yellow-400 font-cinzel',
          },
        }}
      />
      <p className="mt-6 text-gold-600">
        {t("signUp.alreadySubject")}{' '}
        <a href="/sign-in" className="text-gold-400 hover:underline font-cinzel">
          {t("signUp.signIn")}
        </a>
      </p>
    </div>
  );
}