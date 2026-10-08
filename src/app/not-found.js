import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container grid min-h-[65vh] place-items-center py-16">
      <div className="max-w-md text-center">
        <div className="text-7xl">
          🧺
        </div>

        <h1 className="mt-5 text-3xl font-black text-slate-900 sm:text-4xl">
          পেজটি পাওয়া যায়নি
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          আপনি যে পেজটি খুঁজছেন সেটি নেই অথবা
          সরিয়ে ফেলা হয়েছে।
        </p>

        <Link
          href="/"
          className="btn btn-primary mt-6"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}