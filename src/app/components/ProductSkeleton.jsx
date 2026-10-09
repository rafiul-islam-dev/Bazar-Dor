export default function ProductSkeleton() {
  return (
    <div className="card animate-pulse p-4">
      <div className="flex items-start justify-between">
        <div className="h-14 w-14 rounded-xl bg-slate-200" />

        <div className="h-6 w-14 rounded-full bg-slate-200" />
      </div>

      <div className="mt-4 h-5 w-3/4 rounded bg-slate-200" />

      <div className="mt-2 h-3 w-1/3 rounded bg-slate-200" />

      <div className="mt-5 border-t border-slate-100 pt-4">
        <div className="h-3 w-20 rounded bg-slate-200" />

        <div className="mt-2 h-6 w-28 rounded bg-slate-200" />
      </div>
    </div>
  );
}