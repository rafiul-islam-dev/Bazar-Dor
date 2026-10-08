import Link from "next/link";

export default function AuthButtons() {
  return (
    <div className="flex items-center gap-2">
      <Link
        href="/signin"
        className="hidden rounded-md px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-green-50 hover:text-green-700 sm:block"
      >
        সাইন ইন
      </Link>

      <Link
        href="/signup"
        className="rounded-md bg-[#087f42] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#056b36]"
      >
        সাইন আপ
      </Link>
    </div>
  );
}