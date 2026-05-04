export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      {/* Spinning golden sun */}
      <div className="w-16 h-16 border-4 border-gold-600 border-t-transparent rounded-full animate-spin mb-6" />
      <h1 className="text-2xl font-cinzel-decorative gold-shimmer animate-pulse">
        Consulting the Oracle...
      </h1>
    </div>
  );
}