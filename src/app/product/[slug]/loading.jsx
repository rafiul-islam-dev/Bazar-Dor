
export default function ProductLoading() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-6xl animate-pulse">
        {/* Breadcrumb Skeleton */}
        <div className="mb-6 h-4 w-48 rounded bg-gray-200" />

        <div className="grid gap-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:grid-cols-2 md:p-8">
          {/* Product Image Skeleton */}
          <div className="flex min-h-72 items-center justify-center rounded-xl bg-gray-100 md:min-h-96">
            <div className="h-40 w-40 rounded-xl bg-gray-200 md:h-56 md:w-56" />
          </div>

          {/* Product Information Skeleton */}
          <div className="flex flex-col justify-center">
            <div className="h-4 w-28 rounded bg-gray-200" />

            <div className="mt-4 h-8 w-4/5 rounded bg-gray-200" />

            <div className="mt-5 h-7 w-36 rounded bg-green-100" />

            <div className="mt-6 space-y-3">
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-11/12 rounded bg-gray-200" />
              <div className="h-4 w-3/4 rounded bg-gray-200" />
            </div>

            <div className="mt-6 h-12 w-full rounded-lg bg-gray-200 sm:w-48" />

            <div className="mt-8 border-t border-gray-100 pt-5">
              <div className="h-4 w-32 rounded bg-gray-200" />
              <div className="mt-3 h-4 w-48 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
