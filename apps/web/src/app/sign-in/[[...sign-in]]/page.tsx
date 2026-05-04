import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4">
      <h1 className="text-3xl font-cinzel-decorative gold-shimmer mb-8 text-center">
        Enter the Imperial Palace
      </h1>
      <SignIn
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
        New to the Empire?{' '}
        <a href="/sign-up" className="text-gold-400 hover:underline font-cinzel">
          Join Us →
        </a>
      </p>
    </div>
  );
}