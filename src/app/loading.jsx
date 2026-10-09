
export default function Loading() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center bg-gray-50 px-4">
      <div className="flex flex-col items-center">
        {/* Loading Spinner */}
        <div
          className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-green-700"
          role="status"
          aria-label="লোড হচ্ছে"
        />

        <h2 className="mt-5 text-xl font-bold text-gray-900">
          বাজার দর
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          একটু অপেক্ষা করুন, তথ্য লোড হচ্ছে...
        </p>
      </div>
    </main>
  );
}
