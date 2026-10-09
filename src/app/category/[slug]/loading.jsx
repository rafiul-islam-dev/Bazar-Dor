
export default function CategoryLoading() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-7xl animate-pulse">
        {/* Category Heading */}
        <div className="mb-2 h-8 w-56 rounded-lg bg-gray-200" />
        <div className="mb-8 h-4 w-72 max-w-full rounded bg-gray-200" />

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
            >
              {/* Product Image */}
              <div className="h-48 bg-gray-200" />

              {/* Product Information */}
              <div className="space-y-4 p-5">
                <div className="h-5 w-3/4 rounded bg-gray-200" />

                <div className="h-4 w-1/2 rounded bg-gray-200" />

                <div className="flex items-center justify-between gap-3">
                  <div className="h-6 w-24 rounded bg-green-100" />
                  <div className="h-9 w-20 rounded-lg bg-gray-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
